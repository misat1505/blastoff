import json
from dataclasses import dataclass
from typing import Any


class CouldNotReadFile(Exception):
    """
    Custom exception for handling exceptions related to files
    """

    def __init__(self, text):
        self.text = text


class CouldNotSaveToFile(Exception):
    """
    Custom exception for handling exceptions related to saving data to file
    """

    def __init__(self, text):
        self.text = text


@dataclass
class LaunchDTO:
    """
    Dataclass for specific information about launch

    - agency: agency details (from api), containing only necessary (from db perspective) fields
    - launch: launch details (from api), containing only necessary (from db perspective) fields
    - program: program details (from api), containing only necessary (from db perspective) fields
    - rocket: rocket details (from api), containing only necessary (from db perspective) fields
    - site: site details (from api), containing only necessary (from db perspective) fields
    - status: launch status details (from api), containing only necessary (from db perspective) fields
    """
    agency: dict[str, Any] | None
    launch: dict[str, Any] | None
    program: dict[str, Any] | None
    rocket: dict[str, Any] | None
    site: dict[str, Any] | None
    status: dict[str, Any] | None

    @classmethod
    def from_api(cls, details: dict[str, Any]) -> "LaunchDTO":
        """
        Creates a LaunchDTO object from api data

        :param details: result of api query for details of specific launch
        :return: LaunchDTO object
        """
        if details.get("launch_service_provider", {}):
            agency = {
                "name": details.get("launch_service_provider", {}).get("name"),
                "country": details.get("launch_service_provider", {}).get("country", [{}])[0].get("name"),
                "description": details.get("launch_service_provider", {}).get("description"),
                "website": details.get("launch_service_provider", {}).get("info_url"),
                "image_url": details.get("launch_service_provider", {}).get("logo", {}).get("image_url"),
            }
        else:
            agency = None

        launch = {
            "api_id": details.get("id"),
            "last_updated": details.get("last_updated"),
            "date": details.get("net"),
            "url": cls._get_launch_url(details.get("info_urls"), details.get("vid_urls")),
        }
        if details.get("mission", {}):
            launch["mission_name"] = details.get("mission", {}).get("name")
        else:
            launch["mission_name"] = None
        if details.get("status", {}):
            launch["status"] = details.get("status", {}).get("abbrev")
        else:
            launch["status"] = None
        if details.get("image", {}):
            launch["image_url"] = details.get("image", {}).get("image_url")
        else:
            launch["image_url"] = None
        if details.get("mission", {}):
            launch["description"] = details.get("mission", {}).get("description")
        else:
            launch["description"] = None

        if details.get("program", []):
            program = {
                "name": details.get("program", [{}])[0].get("name"),
                "description": details.get("program", [{}])[0].get("description"),
                "website": details.get("program", [{}])[0].get("info_url"),
            }
            if details.get("program", [{}])[0].get("image", {}) is not None:
                program["image_url"] = details.get("program", [{}])[0].get("image", {}).get("image_url")
            else:
                program["image_url"] = None
        else:
            program = None

        if details.get("rocket", {}):
            if details.get("rocket", {}).get("configuration", {}):
                rocket = {
                    "name": details.get("rocket", {}).get("configuration", {}).get("name"),
                    "no_stages": details.get("rocket", {}).get("configuration", {}).get("max_stage"),
                    "height": details.get("rocket", {}).get("configuration", {}).get("length"),
                    "mass": details.get("rocket", {}).get("configuration", {}).get("launch_mass"),
                    "diameter": details.get("rocket", {}).get("configuration", {}).get("diameter"),
                    "description": details.get("rocket", {}).get("configuration", {}).get("description"),
                    "launches_count": details.get("rocket", {}).get("configuration", {}).get("total_launch_count"),
                    "successful_launches_count": details.get("rocket", {}).get("configuration", {}).get("successful_launches"),
                    "failed_launches_count": details.get("rocket", {}).get("configuration", {}).get("failed_launches"),
                    "landings_count": details.get("rocket", {}).get("configuration", {}).get("attempted_landings"),
                    "successful_landings_count": details.get("rocket", {}).get("configuration", {}).get("successful_landings"),
                    "failed_landings_count": details.get("rocket", {}).get("configuration", {}).get("failed_landings"),
                    "leo_capacity": details.get("rocket", {}).get("configuration", {}).get("leo_capacity"),
                    "gto_capacity": details.get("rocket", {}).get("configuration", {}).get("gto_capacity"),
                    "geo_capacity": details.get("rocket", {}).get("configuration", {}).get("geo_capacity"),
                    "sso_capacity": details.get("rocket", {}).get("configuration", {}).get("sso_capacity"),
                }
                if details.get("rocket", {}).get("configuration", {}).get("image", {}):
                    rocket["image_url"] = details.get("rocket", {}).get("configuration", {}).get("image", {}).get("image_url")
                else:
                    rocket["image_url"] = None
            else:
                rocket = None
        else:
            rocket = None

        if details.get("pad", {}):
            site = {
                "name": details.get("pad", {}).get("name"),
                "latitude": details.get("pad", {}).get("latitude"),
                "longitude": details.get("pad", {}).get("longitude"),
                "description": details.get("pad", {}).get("description"),
            }
            if details.get("pad", {}).get("country"):
                site["country"] = details.get("pad", {}).get("country").get("name")
            else:
                site["country"] = None

            if details.get("pad", {}).get("image", {}):
                site["image_url"] = details.get("pad", {}).get("image", {}).get("image_url")
            else:
                site["image_url"] = None
        else:
            site = None

        if details.get("status", {}):
            status = {
                "name": details.get("status", {}).get("name"),
                "description": details.get("status", {}).get("description"),
            }
        else:
            status = None

        return cls(agency, launch, program, rocket, site, status)

    @classmethod
    def from_file(cls, filename: str) -> "LaunchDTO":
        """
        Creates a LaunchDTO object from filedata

        Method might raise CouldNotReadFile exception, if it encounters the problem

        :param filename: name of the file with stored data
        :return: LaunchDTO object
        """
        try:
            with open(filename, 'r') as file:
                data = json.load(file)
            return cls(data.get("agency"), data.get("launch"), data.get("program"), data.get("rocket"), data.get("site"), data.get("status"))
        except (FileNotFoundError, json.JSONDecodeError):
            raise CouldNotReadFile(f'Could not read file: {filename}')

    @staticmethod
    def _get_launch_url(info_urls: list[dict[str, Any]], vid_urls: list[dict[str, Any]]) -> str | None:
        """
        Help method to get media url with max priority

        :param info_urls: info_urls from api
        :param vid_urls: vid_urls from api
        :return: url with max priority
        """
        if not info_urls and not vid_urls:
            return None
        media = info_urls + vid_urls
        best = max(media, key=lambda x: x["priority"])
        return best["url"]

    def save_to_file(self, filename: str) -> None:
        """
        Method to save data to file

        :param filename: name of the file which data will be saved in
        :return: None
        """
        data = {
            "agency": self.agency,
            "launch": self.launch,
            "program": self.program,
            "rocket": self.rocket,
            "site": self.site,
            "status": self.status
        }
        try:
            with open(filename, 'w') as file:
                json.dump(data, file, indent=4)
        except FileNotFoundError:
            raise CouldNotSaveToFile(f'Could not save data to file: {filename}')
