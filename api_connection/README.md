# Description
This module enables communication with external API. 

# Install
To install all dependencies, simply type:
```bash
poetry shell
poetry install
```

Use `poetry install --only main` to skip development dependencies

# Use case:
```python
from api_connector import APIDataConnector
from get_api_data import APIError

import datetime


def use_case():
    API_BASE = f'https://ll.thespacedevs.com/2.3.0/launches/?limit=2&ordering=net&net__gte={datetime.datetime.now().isoformat()}&format=json&mode=list'

    connector = APIDataConnector(API_BASE, [], max_loop_count=1)
    try:
        for launch_data in connector.get_difference():
            launch_data.save_to_file(f'{launch_data.launch["id"]}.json')
            print(f'Got data - {launch_data.launch["id"]}')
    except APIError as e:
        print(e.text)
        
        
if __name__ == "__main__":
    use_case()

```
