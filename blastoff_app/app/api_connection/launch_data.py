import collections
import datetime
from dataclasses import dataclass
from typing import Any, Generator


class InvalidAPIData(Exception):
    """
    Custom exception for handling invalid api data

    Attributes:
        text (str): error text 
    """
    def __init__(self, text: str):
        self.text = text


class InvalidDBData(Exception):
    """
    Custom exception for handling invalid db data

    Attributes:
        text (str): error text 
    """
    def __init__(self, text: str):
        self.text = text


@dataclass
class LaunchData:
    """
    Dataclass for basic information about launch

    Contains id, last_updated and url fields

    Attributes:
        id: id (from api)
        last_updated: date of last update (from api)
        url: url to get launch details (from api)
    """

    id: str
    last_updated: datetime.datetime
    url: str

    def __post_init__(self):
        if not self.id:
            raise ValueError("Launch id cannot be empty")

    def __eq__(self, other_id: str):
        return self.id == other_id


class LaunchDataList(collections.UserList):
    data: list[LaunchData]

    @classmethod
    def from_api(cls, data: list[dict[str, Any]]) -> "LaunchDataList":
        """
        Creates an LaunchDataList object from api data

        Method might raise InvalidAPIData exception if data is not structured properly

        Args:
            data: 'results' from default query (all launches), is a list of dicts containing launch data
        
        Returns:
            LaunchDataList object (containing LaunchData objects with id, last_updated, url fields)
        """
        if not data:
            raise InvalidAPIData("Empty list")
        ids = [launch["id"] for launch in data]
        if len(ids) != len(set(ids)):
            raise InvalidAPIData("Id fields must be unique!")
        try:
            return cls(
                [
                    LaunchData(
                        launch["id"],
                        datetime.datetime.fromisoformat(
                            launch["last_updated"]
                        ),
                        launch["url"],
                    )
                    for launch in data
                ]
            )
        except KeyError as e:
            raise InvalidAPIData("Missing key {}".format(e))
        except ValueError as e:
            raise InvalidAPIData("Invalid datetime field - {}".format(e))

    @classmethod
    def from_db(
        cls, data: list[tuple[str, datetime.datetime]]
    ) -> "LaunchDataList":
        """
        Creates an LaunchDataList object from db data

        Method might raise InvalidDBData exception if data is not structured properly

        Args:
            data: list of tuples containing launch data - tuple format (id, last_updated) - ex. [('some_id', '2024-01-01')]
        
        Returns:
            LaunchDataList object (containing LaunchData objects with id, last_updated, url fields)
        """
        return cls(
            [
                LaunchData(api_id, last_updated, "")
                for api_id, last_updated in data
            ]
        )

    def get_by_id(self, id: str) -> LaunchData:
        """
        Method created to get easier access to data field - by item id

        If item with given id does not exist, method raises KeyError
        
        Args:
            id: searched item id
        
        Returns:
            item (LaunchData object) with given id if exists
        """
        for item in self.data:
            if item.id == id:
                return item
        raise KeyError(id)

    def compare(
        self, other: "LaunchDataList", new: bool = True, changed: bool = True
    ) -> Generator[LaunchData, None, None]:
        """
        Method to compare two LaunchDataList objects, used for getting new / modified launches data (compared to current data in db)

        Args:
            self (LaunchDataList): 'incoming' data - LaunchDataList object with data from api (ex. created by from_api method)
            other: 'current' data - LaunchDataList object with data from db (ex. created by from_db method)
            new: boolean indicating if new data should be yielded
            changed: boolean indicating if changed data should be yielded
        
        Returns:
            yields every new and/or changed launch (yields LaunchData object)
        """
        for launch_data in self:
            if launch_data.id in other:
                if (
                    changed
                    and launch_data.last_updated
                    != other.get_by_id(launch_data.id).last_updated
                ):
                    yield launch_data
            elif new:
                yield launch_data
