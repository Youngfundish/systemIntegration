import yaml
import json
import csv

# Remember:
# pip i pyyaml
# python pyReadParser.py

def read_and_parse_file(file_path):
    extension = file_path.split('.')[-1].lower()

    if extension == 'txt':
        with open(file_path, 'r') as file:
            print('Text File Content:')
            print(file.read())
    elif extension == 'xml':
        with open(file_path, 'r') as file:
            print('XML File Content:')
            print(file.read())
    elif extension == 'yaml':
        with open(file_path, 'r') as file:
            yaml_data = yaml.safe_load(file)
            print('YAML File Content:')
            print(yaml_data)
    elif extension == 'json':
        with open(file_path, 'r') as file:
            json_data = json.load(file)
            print('JSON File Content:')
            print(json_data)
    elif extension == 'csv':
        csv_data = []
        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                csv_data.append(row)
        print('CSV File Content:')
        print(csv_data)
    else:
        print('Unsupported file format.')

# Get file path from user input
file_path = input('Enter file path: ')
read_and_parse_file(file_path)
