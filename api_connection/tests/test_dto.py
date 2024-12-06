import pytest
from hypothesis import given, strategies as st
from api_connection.src.dto import LaunchDTO, InvalidAPIData


@given(
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
    st.dictionaries(st.text(), st.one_of(st.text(), st.integers(), st.booleans(), st.none())),
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
            "name": st.text(),
            "country": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "logo": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        }),
        "program": st.lists(st.fixed_dictionaries({
            "name": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "image": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        })),
        "rocket": st.fixed_dictionaries({
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
    assert ld.launch["api_id"] == api_details["id"]

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
            "name": st.text(),
            "country": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "logo": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        }),
        "program": st.lists(st.fixed_dictionaries({
            "name": st.text(),
            "description": st.text(),
            "info_url": st.text(),
            "image": st.fixed_dictionaries({
                "image_url": st.text(),
            }),
        })),
        "rocket": st.fixed_dictionaries({
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


def test_dto_from_file():
    # TODO
    pass


def test_dto_from_invalid_file():
    # TODO
    pass
