# Description
This module enables communication with external API. 

# Use case:
```python
def use_case():
    API_BASE = f'https://ll.thespacedevs.com/2.3.0/launches/?limit=2&ordering=net&net__gte={datetime.datetime.now().isoformat()}&format=json&mode=list'

    connector = APIDataConnector(API_BASE, [], max_loop_count=1)
    try:
        for launch_data in connector.get_difference():
            launch_data.save_to_file(f'launches/{launch_data.launch["api_id"]}.json')
            print(f'Got data - {launch_data.launch["api_id"]}')
    except APIError as e:
        print(e.text)
```
