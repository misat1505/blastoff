from typing import Any

import requests

from launch_data import LaunchDataList, InvalidAPIData


class APIError(Exception):
    """
    Custom exception for handling api errors

    """

    def __init__(self, text):
        self.text = text


class GetAPIData:
    """
    Class implemented to get data from some api (less specific - from any url)
    """

    def __init__(self, api_url: str):
        """
        Initialize GetAPIData object

        :param api_url: string containing url
        """
        self.api_url = api_url

    def _build_query(self) -> str:
        """
        Builds query - in principle, returns api_url,
        for more complicated requests, it can be overwritten to build proper url

        :return: query to be executed
        """
        return self.api_url

    def execute(self) -> dict[str, Any]:
        """
        Executes query

        :return: received data in json format
        """
        return requests.get(self._build_query()).json()


class GetLaunchesAPIData(GetAPIData):
    """
    Class specifically for launches api, implements additional method to get LaunchDataList object (with api data)
    """

    def __init__(self, api_url: str):
        """
        Initialize GetLaunchesAPIData object

        :param api_url: string containing url
        """
        super().__init__(api_url)
        self.results: dict[str, Any] = {}
        self.next: str = ""

    def get_structured_data(self) -> LaunchDataList:
        """
        Gets data from api, structures them into LaunchDataList object

        Additionally, sets next parameter to url (returned by api), which allows to get next launches data

        Method might raise APIError exception if no more requests are available or api sent wrong data

        :return: LaunchDataList object with api data
        """
        try:
            self.results = self.execute()
            self.next = self.results["next"]
            return LaunchDataList.from_api(self.results["results"])
        except (KeyError, InvalidAPIData) as e:
            raise APIError(f'API error occurred. Request results: {self.results}. Error details: {e}')