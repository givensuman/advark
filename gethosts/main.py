import requests
import yaml

import re

from datetime import datetime

def write_js_array(name, src):
    hosts = requests.get(src)
    hosts = hosts.text.split('\n')

    identifier = '0.0.0.0 '

    hosts = [entry.removeprefix(identifier) for entry in hosts if entry.startswith(identifier)]        
    hosts = [f'*://{entry}/*' for entry in hosts]

    file = open(f'../hosts/{name}.js', 'w')

    currDate = datetime.today().strftime('%Y-%m-%d')
    file.write(f'/**Last updated {currDate}*/export default {hosts}')

    print(f'Wrote hosts/{name}.js!')

    file.close()

with open('hosts.yaml', 'r') as file:
    hosts = yaml.safe_load(file)

for (name, value) in hosts.items():
    write_js_array(name, value['src'])