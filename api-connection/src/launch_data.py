import collections
from dataclasses import dataclass
from typing import Generator, Any


@dataclass
class LaunchData:
    """
    Dataclass for basic information about launch

    Contains id, last_updated and url fields

    - id: id (from api)
    - last_updated: date of last update (from api)
    - url: url to get launch details (from api)
    """
    id: str
    last_updated: str
    url: str

    def __eq__(self, other_id: str):
        return self.id == other_id


class LaunchDataList(collections.UserList):
    data: list[LaunchData]

    @classmethod
    def from_api(cls, data: list[dict[str, Any]]):
        """
        Creates an LaunchDataList object from api data

        :param data: 'results' from default query (all launches), is a list of dicts containing launch data
        :return: LaunchDataList object (containing LaunchData objects with id, last_updated, url fields)
        """
        return cls([LaunchData(launch["id"], launch["last_updated"], launch["url"]) for launch in data])

    @classmethod
    def from_db(cls, data: list[tuple[str, str, str]]):
        """
        Creates an LaunchDataList object from db data

        :param data: list of tuples containing launch data - tuple format (id, last_updated, url) - ex. [('some_id', '2024-01-01', 'details_url')]
        :return: LaunchDataList object (containing LaunchData objects with id, last_updated, url fields)
        """
        return cls([LaunchData(api_id, last_updated, url) for api_id, last_updated, url in data])

    def get_by_id(self, id: str) -> LaunchData:
        """
        Method created to get easier access to data field - by item id

        If item with given id does not exist, method raises KeyError

        :param id: searched item id
        :return: item (LaunchData object) with given id if exists
        """
        for item in self.data:
            if item.id == id:
                return item
        raise KeyError(id)

    def compare(self, other: "LaunchDataList", new: bool = True, changed: bool = True) -> Generator[LaunchData]:
        """
        Method to compare two LaunchDataList objects, used for getting new / modified launches data (compared to current data in db)

        :param self: 'incoming' data - LaunchDataList object with data from api (ex. created by from_api method)
        :param other: 'current' data - LaunchDataList object with data from db (ex. created by from_db method)
        :param new: boolean indicating if new data should be yielded
        :param changed: boolean indicating if changed data should be yielded
        :return: yields every new and/or changed launch (yields LaunchData object)
        """
        for launch_data in self:
            if launch_data.id in other:
                if changed and launch_data.last_updated != other.get_by_id(launch_data.id).last_updated:
                    yield launch_data
            elif new:
                yield launch_data
