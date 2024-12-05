from typing import Generator

from dto import LaunchDTO
from get_api_data import GetLaunchesAPIData, GetAPIData, APIError
from launch_data import LaunchDataList


class APIDataConnector:
    """
    Class allows to get necessary API data
    """
    def __init__(self, first_url: str, database_data: list[tuple[str, str]], max_loop_count: int = 5):
        """
        Initialize APIDataConnector object

        :param first_url: url to get first portion of data
        :param database_data: list with tuples (api_id, last_updated) from current records in database
        :param max_loop_count: max number of loops in get_difference, used to avoid infinite execution
        """
        self.url = first_url
        self.database_data = LaunchDataList.from_db(database_data)
        self.max_loop_count = max_loop_count

    def get_difference(self, new: bool = True, changed: bool = True) -> Generator[LaunchDTO]:
        """
        Method to get new and/or changed launches

        Might raise APIRequestTimeout exception

        :param new: boolean indicating if new data should be yielded
        :param changed: boolean indicating if changed data should be yielded
        :return: yields every new and/or changed launches (yields LaunchDTO object)
        """
        while self.max_loop_count > 0:
            if not self.url:
                break
            interface = GetLaunchesAPIData(self.url)
            result = interface.get_structured_data()
            self.url = interface.next

            for launch in result.compare(self.database_data, new=new, changed=changed):
                details = GetAPIData(launch.url).execute()
                if details.get("id") is None:
                    raise APIError("No more requests are available at the moment. Try again later...")
                yield LaunchDTO.from_api(details)
            self.max_loop_count -= 1
