import json

# Load the dataset into memory
dataFile = open('../data/data.json', 'r')
dataSet = json.load(dataFile)

dataSetEvents = []

# Scrape event types from dataset
for data in dataSet:
    if dataSet[data]['event'] not in dataSetEvents:
        dataSetEvents.append(dataSet[data]['event'])
    pass

print(dataSetEvents)

