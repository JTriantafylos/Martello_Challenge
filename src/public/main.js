// Sync function to request the dataset from the backend
function requestDataSet(callback) {
  const request = new XMLHttpRequest()
  request.onload = (res) => {
    callback(res.target.response)
  }
  request.open('GET', 'http://localhost:3000/data')
  request.send()
}
