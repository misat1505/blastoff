from dataclasses import dataclass
import collections


@dataclass
class LaunchData:
    id: str
    last_updated: str
    url: str

    def __eq__(self, other_id):
        return self.id == other_id


class LaunchDataList(collections.UserList):
    def get_by_id(self, id: str):
        for item in self.data:
            if item.id == id:
                return item
        raise KeyError(id)
