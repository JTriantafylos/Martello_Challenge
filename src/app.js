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

// Add an time field to each object in the dataset using epoch time
for (const timestamp in dataSet) {
  dataSet[timestamp].time = timestamp
}

// Visualizer web server setup
const express = require('express')
const app = express()
const port = 3000

// Visualizer web server routes
app.get('/data', (req, res) => {
  res.json(dataSet)
})
app.use('/', express.static('public'))

app.listen(port, () => console.log('Visualizer web server started!'))
