import datetime
import random

import pytest
from hypothesis import given
from hypothesis import strategies as st

from app.api_connection.src.launch_data import (
    InvalidAPIData,
    InvalidDBData,
    LaunchData,
    LaunchDataList,
)


@given(
    st.text(min_size=1),
    st.datetimes().map(lambda dt: dt.isoformat()),
    st.text(),
)
def test_launch_data_init(launch_id, last_updated, url):
    ld = LaunchData(launch_id, last_updated, url)
    assert ld.id == launch_id
    assert ld.last_updated == last_updated
    assert ld.url == url


@given(
    st.text(max_size=0),
    st.datetimes().map(lambda dt: dt.isoformat()),
    st.text(),
)
def test_launch_data_init_empty_id(launch_id, last_updated, url):
    with pytest.raises(ValueError):
        LaunchData(launch_id, last_updated, url)


@given(
    st.text(min_size=1),
    st.datetimes().map(lambda dt: dt.isoformat()),
    st.text(),
)
def test_launch_data_eq(launch_id, last_updated, url):
    ld = LaunchData(launch_id, last_updated, url)
    assert launch_id == ld


@given(
    st.lists(
        st.tuples(
            st.text(min_size=1), st.datetimes().map(lambda dt: dt.isoformat())
        )
    )
)
def test_launch_data_list_init(example_list):
    ldl = LaunchDataList(example_list)
    assert ldl.data == example_list


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.text(min_size=1),
                "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
                "url": st.text(),
            }
        ),
        min_size=1,
        unique_by=lambda d: d["id"],
    )
)
def test_launch_data_list_from_api(api_list):
    ldl = LaunchDataList.from_api(api_list)
    for api_data, launch_data_list_data in zip(api_list, ldl):
        assert api_data["id"] == launch_data_list_data.id
        assert (
            datetime.datetime.fromisoformat(api_data["last_updated"])
            == launch_data_list_data.last_updated
        )
        assert api_data["url"] == launch_data_list_data.url


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.sampled_from(["id_1", "id_2"]),
                "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
                "url": st.text(),
            }
        ),
        min_size=3,
    )
)
def test_launch_data_list_from_api_not_unique_ids(api_list):
    with pytest.raises(InvalidAPIData):
        LaunchDataList.from_api(api_list)


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.text(min_size=1),
                "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
                "wrong_url": st.text(),
            }
        ),
        unique_by=lambda d: d["id"],
    )
)
def test_launch_data_list_from_invalid_api(api_list):
    with pytest.raises(InvalidAPIData):
        LaunchDataList.from_api(api_list)


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.text(min_size=1),
                "last_updated": st.text(),
                "wrong_url": st.text(),
            }
        )
    )
)
def test_launch_data_list_from_invalid_datetime_api(api_list):
    with pytest.raises(InvalidAPIData):
        LaunchDataList.from_api(api_list)


@given(st.lists(st.tuples(st.text(min_size=1), st.datetimes())))
def test_launch_data_list_from_db(db_list):
    ldl = LaunchDataList.from_db(db_list)
    for db_data, launch_data_list_data in zip(db_list, ldl):
        assert db_data[0] == launch_data_list_data.id
        assert db_data[1] == launch_data_list_data.last_updated


@given(st.lists(st.tuples(st.text(min_size=1), st.text()), max_size=0))
def test_launch_data_list_from_empty_db(db_list):
    LaunchDataList.from_db(db_list)


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.text(min_size=1),
                "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
                "url": st.text(),
            }
        ),
        min_size=1,
        unique_by=lambda d: d["id"],
    )
)
def test_launch_data_list_get_by_id(api_list):
    ldl = LaunchDataList.from_api(api_list)
    some_id = ldl[random.randint(0, len(ldl) - 1)].id
    if len(ldl) != 0:
        elem = ldl.get_by_id(some_id)
        assert elem is not None
        assert elem.id == some_id
    else:
        with pytest.raises(KeyError):
            ldl.get_by_id(some_id)


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.text(min_size=1),
                "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
                "url": st.text(),
            }
        ),
        min_size=1,
        unique_by=lambda d: d["id"],
    ),
    st.lists(
        st.tuples(
            st.text(min_size=1), st.datetimes().map(lambda dt: dt.isoformat())
        ),
        max_size=0,
    ),
)
def test_launch_data_list_compare_sth_to_empty(api_list, db_list):
    ldl_api = LaunchDataList.from_api(api_list)
    ldl_db = LaunchDataList.from_db(db_list)
    assert list(ldl_api.compare(ldl_db)) == ldl_api


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.text(min_size=1),
                "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
                "url": st.text(),
            }
        ),
        min_size=1,
        unique_by=lambda d: d["id"],
    ),
    st.lists(
        st.tuples(
            st.text(min_size=1), st.datetimes().map(lambda dt: dt.isoformat())
        )
    ),
)
def test_launch_data_list_compare_sth_to_diff(api_list, db_list):
    db_list = [
        element
        for element in db_list
        if element[0] not in [api_element["id"] for api_element in api_list]
    ]
    ldl_api = LaunchDataList.from_api(api_list)
    ldl_db = LaunchDataList.from_db(db_list)
    assert list(ldl_api.compare(ldl_db)) == ldl_api


@given(
    st.lists(
        st.fixed_dictionaries(
            {
                "id": st.text(min_size=1),
                "last_updated": st.datetimes().map(lambda dt: dt.isoformat()),
                "url": st.text(),
            }
        ),
        min_size=1,
        unique_by=lambda d: d["id"],
    )
)
def test_launch_data_list_compare_the_same_data(api_list):
    db_list = [
        (
            element["id"],
            datetime.datetime.fromisoformat(element["last_updated"]),
        )
        for element in api_list
    ]
    ldl_api = LaunchDataList.from_api(api_list)
    ldl_db = LaunchDataList.from_db(db_list)
    assert list(ldl_api.compare(ldl_db)) == []
