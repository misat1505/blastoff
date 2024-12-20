import json

import pytest
from hypothesis import given, strategies as st

from dto import LaunchDTO, InvalidAPIData


@given(
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.fixed_dictionaries({"id": st.text(min_size=1)}),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none()))
)
def test_dto_init(agency, launch, program, rocket, site):
    ld = LaunchDTO(agency, launch, program, rocket, site)
    assert ld.agency == agency
    assert ld.launch == launch
    assert ld.program == program
    assert ld.rocket == rocket
    assert ld.site == site


@given(
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.fixed_dictionaries({"id": st.text(max_size=0)}),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none()))
)
def test_dto_init_empty_id(agency, launch, program, rocket, site):
    with pytest.raises(ValueError):
        LaunchDTO(agency, launch, program, rocket, site)


@given(
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.fixed_dictionaries({"something": st.text()}),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none()))
)
def test_dto_init_empty_id(agency, launch, program, rocket, site):
    with pytest.raises(ValueError):
        LaunchDTO(agency, launch, program, rocket, site)


@given(
    st.lists(st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.lists(st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.lists(st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.lists(st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.lists(st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
)
def test_dto_init_invalid(agency, launch, program, rocket, site):
    with pytest.raises(ValueError):
        LaunchDTO(agency, launch, program, rocket, site)


@given(
    st.fixed_dictionaries({
        "id": st.text(min_size=1),
        "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
        "net": st.datetimes().map(lambda dt: dt.isoformat()),
        "info_urls": st.lists(st.fixed_dictionaries({
            "priority": st.integers(),
            "url": st.text()
        })),
        "vid_urls": st.lists(st.fixed_dictionaries({
            "priority": st.integers(),
            "url": st.text()
        })),
        "mission": st.fixed_dictionaries({
            "name": st.text(),
            "description": st.text(),
        }),
        "status": st.fixed_dictionaries({
            "name": st.text(),
            "description": st.text(),
        }),
        "image": st.fixed_dictionaries({
            "image_url": st.text(),
        }),
        "launch_service_provider": st.fixed_dictionaries({
            "id": st.integers(),
            "name": st.text(),
            "country": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "logo": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        }),
        "program": st.lists(st.fixed_dictionaries({
            "id": st.integers(),
            "name": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "image": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        })),
        "rocket": st.fixed_dictionaries({
            "id": st.integers(),
            "configuration": st.fixed_dictionaries({
                "name": st.text(),
                "max_stage": st.integers(min_value=1),
                "length": st.floats(min_value=1),
                "launch_mass": st.floats(min_value=1),
                "diameter": st.floats(min_value=1),
                "description": st.text(),
                "total_launch_count": st.integers(min_value=0),
                "successful_launches": st.integers(min_value=0),
                "failed_launches": st.integers(min_value=0),
                "attempted_landings": st.integers(min_value=0),
                "successful_landings": st.integers(min_value=0),
                "failed_landings": st.integers(min_value=0),
                "leo_capacity": st.floats(min_value=0),
                "gto_capacity": st.floats(min_value=0),
                "geo_capacity": st.floats(min_value=0),
                "sso_capacity": st.floats(min_value=0),
                "image": st.fixed_dictionaries({
                    "image_url": st.text(),
                }),
            }),
        }),
        "pad": st.fixed_dictionaries({
            "id": st.integers(),
            "name": st.text(),
            "latitude": st.floats(),
            "longitude": st.floats(),
            "description": st.text(),
            "map_image": st.text(),
            "country": st.text(),
            "image": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        })
    })
)
def test_dto_from_api(api_details):
    ld = LaunchDTO.from_api(api_details)
    assert ld.launch["id"] == api_details["id"]


@given(
    st.fixed_dictionaries({
        "id": st.one_of(st.text(max_size=0), st.none()),
        "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
        "net": st.datetimes().map(lambda dt: dt.isoformat()),
        "info_urls": st.lists(st.fixed_dictionaries({
            "priority": st.integers(),
            "url": st.text()
        })),
        "vid_urls": st.lists(st.fixed_dictionaries({
            "priority": st.integers(),
            "url": st.text()
        })),
        "mission": st.fixed_dictionaries({
            "name": st.text(),
            "description": st.text(),
        }),
        "status": st.fixed_dictionaries({
            "name": st.text(),
            "description": st.text(),
        }),
        "image": st.fixed_dictionaries({
            "image_url": st.text(),
        }),
        "launch_service_provider": st.fixed_dictionaries({
            "id": st.integers(),
            "name": st.text(),
            "country": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "logo": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        }),
        "program": st.lists(st.fixed_dictionaries({
            "id": st.integers(),
            "name": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "image": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        })),
        "rocket": st.fixed_dictionaries({
            "id": st.integers(),
            "configuration": st.fixed_dictionaries({
                "name": st.text(),
                "max_stage": st.integers(min_value=1),
                "length": st.floats(min_value=1),
                "launch_mass": st.floats(min_value=1),
                "diameter": st.floats(min_value=1),
                "description": st.text(),
                "total_launch_count": st.integers(min_value=0),
                "successful_launches": st.integers(min_value=0),
                "failed_launches": st.integers(min_value=0),
                "attempted_landings": st.integers(min_value=0),
                "successful_landings": st.integers(min_value=0),
                "failed_landings": st.integers(min_value=0),
                "leo_capacity": st.floats(min_value=0),
                "gto_capacity": st.floats(min_value=0),
                "geo_capacity": st.floats(min_value=0),
                "sso_capacity": st.floats(min_value=0),
                "image": st.fixed_dictionaries({
                    "image_url": st.text(),
                }),
            }),
        }),
        "pad": st.fixed_dictionaries({
            "id": st.integers(),
            "name": st.text(),
            "latitude": st.floats(),
            "longitude": st.floats(),
            "description": st.text(),
            "map_image": st.text(),
            "country": st.text(),
            "image": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        })
    })
)
def test_dto_from_invalid_api(api_details):
    with pytest.raises(InvalidAPIData):
        LaunchDTO.from_api(api_details)


api_data_strategy = st.fixed_dictionaries({
    "agency": st.fixed_dictionaries({
        "id": st.integers(),
        "name": st.text(min_size=1),
        "country": st.text(min_size=1),
        "description": st.text(),
        "website": st.text(),
        "image_url": st.text(),
    }),
    "launch": st.fixed_dictionaries({
        "id": st.text(min_size=1),
        "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
        "date": st.datetimes().map(lambda dt: dt.isoformat()),
        "url": st.none() | st.text(),
        "mission_name": st.text(),
        "status_name": st.text(),
        "status_description": st.text(),
        "image_url": st.text(),
        "description": st.text(),
    }),
    "program": st.none() | st.fixed_dictionaries({
        "id": st.integers(),
        "name": st.text(),
        "description": st.text(),
        "info_url": st.text(),
        "image_url": st.text(),
    }),
    "rocket": st.fixed_dictionaries({
        "id": st.integers(),
        "name": st.text(),
        "no_stages": st.integers(min_value=1),
        "height": st.floats(min_value=1.0),
        "mass": st.floats(min_value=1.0),
        "diameter": st.floats(min_value=1.0),
        "description": st.text(),
        "launches_count": st.integers(min_value=0),
        "successful_launches_count": st.integers(min_value=0),
        "failed_launches_count": st.integers(min_value=0),
        "landings_count": st.integers(min_value=0),
        "successful_landings_count": st.integers(min_value=0),
        "failed_landings_count": st.integers(min_value=0),
        "leo_capacity": st.none() | st.floats(min_value=0),
        "gto_capacity": st.none() | st.floats(min_value=0),
        "geo_capacity": st.none() | st.floats(min_value=0),
        "sso_capacity": st.floats(min_value=0),
        "image_url": st.text(),
    }),
    "site": st.fixed_dictionaries({
        "id": st.integers(),
        "name": st.text(),
        "latitude": st.floats(),
        "longitude": st.floats(),
        "description": st.text(),
        "map_image": st.text(),
        "country": st.text(),
        "image_url": st.text(),
    }),
})


@pytest.fixture(scope='module')
def create_temp_file(tmp_path_factory):
    def _create_temp_file(data):
        fn = tmp_path_factory.mktemp('data') / "launch_data.json"
        fn.write_text(json.dumps(data))
        return fn

    return _create_temp_file


@given(api_data=api_data_strategy)
def test_dto_from_file(api_data, create_temp_file):
    temp_file = create_temp_file(api_data)

    ld = LaunchDTO.from_file(str(temp_file))
    assert ld.launch["id"] == api_data["launch"]["id"]


wrong_api_data_strategy = st.fixed_dictionaries({
    "agency": st.lists(st.fixed_dictionaries({
        "name": st.text(min_size=1),
        "country": st.text(min_size=1),
        "description": st.text(),
        "website": st.text(),
        "image_url": st.text(),
    })),
    "launch": st.fixed_dictionaries({
        "id": st.text(min_size=1),
        "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
        "date": st.datetimes().map(lambda dt: dt.isoformat()),
        "url": st.none() | st.text(),
        "mission_name": st.text(),
        "status_name": st.text(),
        "status_description": st.text(),
        "image_url": st.text(),
        "description": st.text(),
    })
})


@given(api_data=wrong_api_data_strategy)
def test_dto_from_invalid_file(api_data, create_temp_file):
    temp_file = create_temp_file(api_data)
    with pytest.raises(ValueError):
        LaunchDTO.from_file(str(temp_file))
