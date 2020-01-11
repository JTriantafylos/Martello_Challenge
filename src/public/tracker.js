// Start timestamp of the dataset
let startTimeSeconds = 1578151801

// End timestamp of the dataset
const endTimeSeconds = 1578236760

// Number of seconds into the dataset since startTime
let dataTimeElapsedSeconds = 0

// The next updated queued to be visualized
let queuedUpdate

// Number of seconds since epoch until the timestamp of the next queued update
let queuedUpdateTimeSeconds

let queuedUpdateIndex = 0

// Object to store each Person object
let people = {}

const Colours = {
  RED: '#ff2915',
  BLUE: '#2925ff',
  YELLOW: '#ffd000',
  GREEN: '#14ab03',
  VIOLET: '#7f25b0',
  ORANGE: '#e38f28',
  BLACK: '#000000',
  GRAY: '#707070',
  PINK: '#f280e3'
}

class Person {
  constructor (name, role, room, position, colour) {
    this.name = name
    this.role = role
    this.room = room
    this.position = position
    this.colour = colour
  }

  getName () {
    return this.name
  }

  getRole () {
    return this.role
  }

  getRoom () {
    return this.room
  }

  getPosition () {
    return this.position
  }

  getColour () {
    return this.colour
  }

  updatePosition (newP) {
    this.position = newP
  }
}

requestDataSet((dataSet) => {
  dataSet = JSON.parse(dataSet)
  queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]
  queuedUpdateTimeSeconds = parseInt(Object.keys(dataSet)[queuedUpdateIndex])
  startTimeSeconds = parseInt(Object.keys(dataSet)[queuedUpdateIndex])
  startVisualizer(dataSet)
})

function startVisualizer (dataSet) {
  /*
  // initializing guests
  const veronica = new Person('Veronica', 'guest', 210, [0, 0], Colours.RED)
  const jason = new Person('Jason', 'guest', 241, [0, 0], Colours.BLUE)
  const thomas = new Person('Thomas', 'guest', 248, [0, 0], Colours.ORANGE)
  const rob = new Person('Rob', 'guest', 231, [0, 0], Colours.YELLOW)
  const kristina = new Person('Kristina', 'guest', 235, [0, 0], Colours.BLACK)

  // initializing staff
  const marc = new Person('Marc-Andre', 'cleaning', 0, [0, 0], Colours.VIOLET)
  const dave = new Person('Dave', 'cooking', 0, [0, 0], Colours.PINK)
  const salina = new Person('Salina', 'reception', 0, [0, 0], Colours.GRAY)
  const harrison = new Person('Harrison', 'reception late-night', 0, [0, 0], Colours.GREEN)

  people = [veronica, jason, thomas, rob, kristina, marc, dave, salina, harrison]
  */

  // initializing guests
  people.veronica = new Person('Veronica', 'guest', 210, [0, 0], Colours.RED)
  people.jason = new Person('Jason', 'guest', 241, [0, 0], Colours.BLUE)
  people.thomas = new Person('Thomas', 'guest', 248, [0, 0], Colours.ORANGE)
  people.rob = new Person('Rob', 'guest', 231, [0, 0], Colours.YELLOW)
  people.kristina = new Person('Kristina', 'guest', 235, [0, 0], Colours.BLACK)

  // initializing staff
  people.marc = new Person('Marc-Andre', 'cleaning', 0, [0, 0], Colours.VIOLET)
  people.dave = new Person('Dave', 'cooking', 0, [0, 0], Colours.PINK)
  people.salina = new Person('Salina', 'reception', 0, [0, 0], Colours.GRAY)
  people.harrison = new Person('Harrison', 'reception late-night', 0, [0, 0], Colours.GREEN)

  visualizationArea.start(dataSet)
}

// Visualization area object
const visualizationArea = {
  // Function to start the visualization
  start: (dataSet) => {
    const canvas = document.createElement('canvas')
    canvas.id = 'visualizationCanvas'
    canvas.width = 785
    canvas.height = 857
    canvas.context = canvas.getContext('2d')
    document.body.insertBefore(canvas, document.body.childNodes[0])
    canvas.interval = setInterval(() => updateVisualization(dataSet), 1)
  },
  // Function to stop the visualization
  stop: () => {
    const canvas = document.getElementById('visualizationCanvas')
    clearInterval(canvas.interval)
  },
  // Function to clear the visualization area
  clear: () => {
    const canvas = document.getElementById('visualizationCanvas')
    canvas.context.clearRect(0, 0, canvas.width, canvas.height)
  }
}

// function component(width, height, color, x, y, type) {
//     this.type = type;
//     this.score = 0;
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.x = x;
//     this.y = y;
//     this.gravity = 0;
//     this.gravitySpeed = 0;
//     this.update = function() {
//         ctx = simulationArea.context;
//         if (this.type == "text") {
//             ctx.font = this.width + " " + this.height;
//             ctx.fillStyle = color;
//             ctx.fillText(this.text, this.x, this.y);
//         } else {
//             ctx.fillStyle = color;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }

// }

// Function to update the visualization area
function updateVisualization (dataSet) {
  // Calculate the amount of seconds the visualization is through the dataset timeline
  const dataTimeCurrentSeconds = startTimeSeconds + dataTimeElapsedSeconds

  // Check if the last update has visualized
  if (dataTimeCurrentSeconds > endTimeSeconds) {
    visualizationArea.stop()
  }

  // Clear the visualization area
  visualizationArea.clear()

  // Check if the queued update occurred at the current point that the visualization
  // is through the timeline
  if (queuedUpdateTimeSeconds === dataTimeCurrentSeconds) {
    // Show the queued update
    // console.log(queuedUpdate)

    // Populate the queued update with the next update from the dataset
    queuedUpdateIndex++
    queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]
    queuedUpdateTimeSeconds = parseInt(Object.keys(dataSet)[queuedUpdateIndex])
  }

  // Increase the elapsed seconds counter by 1
  dataTimeElapsedSeconds++
}
