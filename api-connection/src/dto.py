import json


class LaunchDTO:
    def __init__(self, agency, launch, program, rocket, site, status):
        self.agency = agency
        self.launch = launch
        self.program = program
        self.rocket = rocket
        self.site = site
        self.status = status

    @classmethod
    def from_api(cls, details):
        agency = {
            "name": details.get("launch_service_provider", {}).get("name"),
            "country": details.get("launch_service_provider", {}).get("country", [{}])[0].get("name"),
            "description": details.get("launch_service_provider", {}).get("description"),
            "website": details.get("launch_service_provider", {}).get("info_url"),
            "image_url": details.get("launch_service_provider", {}).get("logo", {}).get("image_url"),
        }

        launch = {
            "api_id": details.get("id"),
            "last_updated": details.get("last_updated"),
            "mission_name": details.get("mission", {}).get("name"),
            "status": details.get("status", {}).get("abbrev"),
            "date": details.get("net"),
            "description": details.get("mission", {}).get("description"),
            "url": cls._get_launch_url(details.get("info_urls"), details.get("vid_urls")),
            "image_url": details.get("image", {}).get("image_url"),
        }

        program = {
            "name": details.get("program", [{}])[0].get("name"),
            "description": details.get("program", [{}])[0].get("description"),
            "website": details.get("program", [{}])[0].get("info_url"),
            "image_url": details.get("program", [{}])[0].get("image", {}).get("image_url"),
        }

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
            "image_url": details.get("rocket", {}).get("configuration", {}).get("image", {}).get("image_url"),
        }

        site = {
            "name": details.get("pad", {}).get("name"),
            "country": details.get("pad", {}).get("country", {}).get("name"),
            "latitude": details.get("pad", {}).get("latitude"),
            "longitude": details.get("pad", {}).get("longitude"),
            "description": details.get("pad", {}).get("description"),
            "image_url": details.get("pad", {}).get("image", {}).get("image_url"),
        }

        status = {
            "name": details.get("status", {}).get("name"),
            "description": details.get("status", {}).get("description"),
        }
        return cls(agency, launch, program, rocket, site, status)

    @classmethod
    def from_file(cls, filename):
        try:
            with open(filename, 'r') as file:
                data = json.load(file)
            return cls(data.get("agency"), data.get("launch"), data.get("program"), data.get("rocket"), data.get("site"), data.get("status"))
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error loading from file: {e}")

    @classmethod
    def from_db(cls, data):
        # TODO
        pass

    @staticmethod
    def _get_launch_url(info_urls: list[dict[str,]], vid_urls: list[dict[str,]]) -> str | None:
        if not info_urls and not vid_urls:
            return None
        media = info_urls + vid_urls
        best = max(media, key=lambda x: x["priority"])
        return best["url"]

    def save_to_file(self, filename):
        data = {
            "agency": self.agency,
            "launch": self.launch,
            "program": self.program,
            "rocket": self.rocket,
            "site": self.site,
            "status": self.status
        }
        with open(filename, 'w') as file:
            json.dump(data, file, indent=4)
