import requests
from launch_data import LaunchData, LaunchDataList


class GetAPIData:
    def __init__(self, api_url: str):
        self.api_url = api_url

    def _build_query(self) -> str:
        return self.api_url

    def execute(self) -> dict:
        return requests.get(self._build_query()).json()


class GetLaunchesAPIData(GetAPIData):
    def __init__(self, api_url: str):
        super().__init__(api_url)
        self.results = None
        self.next = None

    def get_structured_data(self) -> None | LaunchDataList:
        self.results = self.execute()
        try:
            self.next = self.results["next"]
            return LaunchDataList.from_api(self.results["results"])
        except KeyError:
            return None
