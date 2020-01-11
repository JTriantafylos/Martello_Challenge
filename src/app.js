// Read the dataset into memory
const fs = require('fs')
const dataSet = JSON.parse(fs.readFileSync('../data/data.json'))

// Scrape each event type from the dataset
const eventTypes = []
for (const timestamp in dataSet) {
  if (!eventTypes.includes(dataSet[timestamp].event)) {
    eventTypes.push(dataSet[timestamp].event)
  }
}

// Replace epoch timestamps with a user-readable format in the dataset
for (const timestamp in dataSet) {
  dataSet[new Date(timestamp * 1000).toLocaleString()] = dataSet[timestamp]
  delete dataSet[timestamp]
}

// Visualizer web server setup
const express = require('express')
const app = express()
const port = 3000

// Visualizer web server routes
app.get('/', express.static('public'))
app.get('/data', (req, res) => {
  res.json(dataSet)
})

app.listen(port, () => console.log('Visualizer web server started!'))

