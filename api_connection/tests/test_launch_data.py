from hypothesis import given, strategies as st

from api_connection.src.launch_data import LaunchData

@given(st.text(), st.text(), st.text())
def test_launch_data_class(id, last_updated, url):
    pass
