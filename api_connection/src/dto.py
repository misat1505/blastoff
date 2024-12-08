import json
from dataclasses import dataclass
from typing import Any

from api_connection.src.launch_data import InvalidAPIData


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
    """
    agency: dict[str, Any] | None
    launch: dict[str, Any] | None
    program: dict[str, Any] | None
    rocket: dict[str, Any] | None
    site: dict[str, Any] | None

    def __post_init__(self):
        for field in ["agency", "launch", "program", "rocket", "site"]:
            value = getattr(self, field)
            if value is not None and not isinstance(value, dict):
                raise ValueError(f"{field} must be a dictionary or None, got {type(value)}")
        if not self.launch or not self.launch.get("api_id"):
            raise ValueError("Launch data must be provided")

    @classmethod
    def from_api(cls, details: dict[str, Any]) -> "LaunchDTO":
        """
        Creates a LaunchDTO object from api data

        :param details: result of api query for details of specific launch
        :return: LaunchDTO object
        """
        if not details.get("id"):
            raise InvalidAPIData("Launch id must be provided")
        launch = cls._create_launch(details)
        agency = cls._create_agency(details.get("launch_service_provider", {}))
        program = cls._create_program(extract_nested(details, "program", 0))
        rocket = cls._create_rocket(extract_nested(details, "rocket", "configuration"))
        site = cls._create_site(details.get("pad", {}))
        return cls(agency, launch, program, rocket, site)

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
            return cls(data.get("agency"), data.get("launch"), data.get("program"), data.get("rocket"), data.get("site"))
        except (FileNotFoundError, json.JSONDecodeError):
            raise CouldNotReadFile(f'Could not read file: {filename}')

    @staticmethod
    def _get_launch_url(info_urls: list[dict[str, Any]], vid_urls: list[dict[str, Any]]) -> str | None:
        """
        Supporting method to get media url with max priority

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
            "site": self.site
        }
        try:
            with open(filename, 'w') as file:
                json.dump(data, file, indent=4)
        except FileNotFoundError:
            raise CouldNotSaveToFile(f'Could not save data to file: {filename}')

    @staticmethod
    def _create_launch(details: dict[str, Any]) -> dict[str, Any]:
        """
        Gets necessary data about launch from api details

        :param details: result of api query for details of specific launch
        :return: dict with necessary launch data
        """
        return {
            "api_id": details.get("id"),
            "last_updated": details.get("last_updated"),
            "date": details.get("net"),
            "url": LaunchDTO._get_launch_url(details.get("info_urls"), details.get("vid_urls")),
            "mission_name": extract_nested(details, "mission", "name"),
            "status_name": extract_nested(details, "status", "name"),
            "status_description": extract_nested(details, "status", "description"),
            "image_url": extract_nested(details, "image", "image_url"),
            "description": extract_nested(details, "mission", "description"),
        }

    @staticmethod
    def _create_agency(agency_details: dict[str, Any]) -> dict[str, Any] | None:
        """
        Gets necessary data about agency from api details

        :param agency_details: agency section of api query for details of specific launch
        :return: dict with necessary agency data
        """
        if not agency_details:
            return None
        return {
            "name": agency_details.get("name"),
            "country": extract_nested(agency_details, "country", 0, "name"),
            "description": agency_details.get("description"),
            "website": agency_details.get("info_url"),
            "image_url": extract_nested(agency_details, "logo", "image_url"),
        }

    @staticmethod
    def _create_program(program_details: dict[str, Any]) -> dict[str, Any] | None:
        """
        Gets necessary data about program from api details

        :param program_details: program section of api query for details of specific launch
        :return: dict with necessary program data
        """
        if not program_details:
            return None
        return {
            "name": program_details.get("name"),
            "description": program_details.get("description"),
            "website": program_details.get("info_url"),
            "image_url": extract_nested(program_details, "image", "image_url"),
        }

    @staticmethod
    def _create_rocket(rocket_configuration_details: dict[str, Any]) -> dict[str, Any] | None:
        """
        Gets necessary data about rocket from api details

        :param rocket_configuration_details: rocket section of api query for details of specific launch
        :return: dict with necessary rocket data
        """
        if not rocket_configuration_details:
            return None
        return {
            "name": rocket_configuration_details.get("name"),
            "no_stages": rocket_configuration_details.get("max_stage"),
            "height": rocket_configuration_details.get("length"),
            "mass": rocket_configuration_details.get("launch_mass"),
            "diameter": rocket_configuration_details.get("diameter"),
            "description": rocket_configuration_details.get("description"),
            "launches_count": rocket_configuration_details.get("total_launch_count"),
            "successful_launches_count": rocket_configuration_details.get("successful_launches"),
            "failed_launches_count": rocket_configuration_details.get("failed_launches"),
            "landings_count": rocket_configuration_details.get("attempted_landings"),
            "successful_landings_count": rocket_configuration_details.get("successful_landings"),
            "failed_landings_count": rocket_configuration_details.get("failed_landings"),
            "leo_capacity": rocket_configuration_details.get("leo_capacity"),
            "gto_capacity": rocket_configuration_details.get("gto_capacity"),
            "geo_capacity": rocket_configuration_details.get("geo_capacity"),
            "sso_capacity": rocket_configuration_details.get("sso_capacity"),
            "image_url": extract_nested(rocket_configuration_details, "image", "image_url"),
        }

    @staticmethod
    def _create_site(pad_details: dict[str, Any]) -> dict[str, Any] | None:
        """
        Gets necessary data about site from api details

        :param pad_details: pad section of api query for details of specific launch
        :return: dict with necessary site data
        """
        if not pad_details:
            return None
        return {
            "name": pad_details.get("name"),
            "latitude": pad_details.get("latitude"),
            "longitude": pad_details.get("longitude"),
            "description": pad_details.get("description"),
            "map_image": pad_details.get("map_image"),
            "country": extract_nested(pad_details, "country", "name"),
            "image_url": extract_nested(pad_details, "image", "image_url"),
        }


def extract_nested(data, *keys, default=None):
    """
    Safely extracts values, supporting function for LaunchDTO class

    :param data: data to extract
    :param keys: keys to extract from data
    :param default: default value to return if key is wrong or data is null
    """
    for key in keys:
        if isinstance(data, list):
            if isinstance(key, int) and 0 <= key < len(data):
                data = data[key]
            else:
                return default
        elif isinstance(data, dict):
            data = data.get(key, {})
        else:
            return default
    return data or default
