from typing import Generator

from app.api_connection.dto import LaunchDTO
from app.api_connection.get_api_data import (
    APIError,
    GetAPIData,
    GetLaunchesAPIData,
)
from app.api_connection.launch_data import LaunchDataList


class APIDataConnector:
    """
    Class allows to get new and/or modified data from API

    Attributes:
        url (str): url to get first portion of data
        database_data (list[tuple[str, str]]): list with tuples (api_id, last_updated) from current records in database
        max_loop_count (int): max number of loops in get_difference, used to avoid infinite execution
    """

    def __init__(
        self,
        first_url: str,
        database_data: list[tuple[str, str]],
        max_loop_count: int = 5,
    ):
        """
        Initialize APIDataConnector object

        """
        self.url = first_url
        self.database_data = LaunchDataList.from_db(database_data)
        self.max_loop_count = max_loop_count

    def get_difference(
        self, new: bool = True, changed: bool = True
    ) -> Generator[LaunchDTO, None, None]:
        """
        Method to get new and/or changed launches

        Might raise APIRequestTimeout exception

        Args:
            new: boolean indicating if new data should be yielded
            changed: boolean indicating if changed data should be yielded

        Returns:
            yields every new and/or changed launch (yields LaunchDTO object)
        """
        while self.max_loop_count > 0:
            if not self.url:
                break
            interface = GetLaunchesAPIData(self.url)
            result = interface.get_structured_data()
            self.url = interface.next

            for launch in result.compare(
                self.database_data, new=new, changed=changed
            ):
                details = GetAPIData(launch.url).execute()
                if details.get("id") is None:
                    raise APIError(
                        "No more requests are available at the moment. Try again later..."
                    )
                yield LaunchDTO.from_api(details)
            self.max_loop_count -= 1
