from typing import Generator

from dto import LaunchDTO
from get_api_data import GetLaunchesAPIData, GetAPIData, APIRequestTimeout
from launch_data import LaunchDataList


class APIDataConnector:
    def __init__(self, first_url, database_data, max_loop_count: int = 5):
        self.url = first_url
        self.database_data = LaunchDataList.from_db(database_data)
        self.max_loop_count = max_loop_count

    def get_difference(self, new: bool = True, changed: bool = True) -> Generator[LaunchDTO]:
        """
        Method to get new and/or changed launches

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
                    raise APIRequestTimeout("No more requests are available at the moment. Try again later...")
                yield LaunchDTO.from_api(details)
            self.max_loop_count -= 1
