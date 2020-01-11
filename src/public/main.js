// Sync function to request the dataset from the backend
function requestDataSet() {
  const request = new XMLHttpRequest()
  request.onload = (response) => {
    return response
  }
  request.open('GET', 'http://localhost:3000/data')
  request.send()
}
