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
    @classmethod
    def from_api(cls, data):
        return cls([LaunchData(launch["id"], launch["last_updated"], launch["url"]) for launch in data])

    @classmethod
    def from_db(cls, data):
        # TODO
        pass

    def get_by_id(self, id: str) -> LaunchData:
        for item in self.data:
            if item.id == id:
                return item
        raise KeyError(id)

    def compare(self, other: "LaunchDataList") -> LaunchData:
        for launch_data in self:
            if launch_data.id in other:
                if launch_data.last_updated != other.get_by_id(launch_data.id).last_updated:
                    yield launch_data
            else:
                yield launch_data
