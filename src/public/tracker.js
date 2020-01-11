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
const people = {}

// Object to store each door object
const doors = {}

//Object to store each receiver object
const receivers = {};

const Colours = {
  RED: '#ff2915',
  BLUE: '#2925ff',
  YELLOW: '#ffd000',
  GREEN: '#14ab03',
  VIOLET: '#7f25b0',
  ORANGE: '#e38f28',
  BLACK: '#000000',
  GRAY: '#707070',
  PINK: '#f280e3',
  BROWN: '#964B00',
  WHITE: '#FFFFFF'
}
const Receiver_Type ={

    PHONE = 'phone',
    M_SENSOR = "motion sensor",
    ACCESS_P = "wifi"
}

class Receiver{

    constructor(name, region, position, colour, type, floor){
        this.name = name;
        this.region = region;
        this.position = position;
        this.colour = colour;
        this.type = type;
        this.floor = floor;
    }

    setColour(col){
        this.colour = col;
    }

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

class Door {
  constructor (room, position, mode, colour) {
    this.height = 6
    this.width = 30
    this.room = room
    this.position = position
    this.mode = mode
    this.colour = colour
  }

  getRoom () {
    return this.room
  }

  getPosition () {
    return this.position
  }

  getMode () {
    return this.mode
  }

  updatePosition (newP) {
    this.position = newP
  }

  toggleMode () {
    this.mode = !(this.mode)
    this.rotate()
  }

  rotate () {
    var x = this.height
    this.height = this.width
    this.width = x
  }

  getColour () {
    return this.colour
  }

  getSize () {
    return [this.width, this.height]
  }
  setColour(col){
    this.colour = col;
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
  // initializing first floor doors
  doors.conference = new Door(110, [258, 160], false, Colours.BROWN)
  doors.conference.rotate()
  doors.kitchen = new Door(130, [258, 400], false, Colours.BROWN)
  doors.kitchen.rotate()
  doors.gym = new Door(151, [503, 246], false, Colours.BROWN)
  doors.reception = new Door(101, [463, 119], false, Colours.BROWN)
  doors.reception.rotate()
  doors.pool = new Door(155, [620, 246], false, Colours.BROWN)
  doors.laundry = new Door(156, [636, 326], false, Colours.BROWN)
  doors.storage = new Door(1566, [636, 388], false, Colours.BROWN)
  doors.stairwell_1 = new Door(150, [680, 259], false, Colours.BROWN)
  doors.stairwell_1.rotate()

  // initializing second floor doors
  doors.executive_1 = new Door(210, [218, 614], false, Colours.BROWN)
  doors.executive_1.rotate()
  doors.executive_2 = new Door(220, [218, 674], false, Colours.BROWN)
  doors.executive_2.rotate()
  doors.comfort_1 = new Door(231, [256, 591], false, Colours.BROWN)
  doors.comfort_2 = new Door(232, [256, 725], false, Colours.BROWN)
  doors.comfort_3 = new Door(233, [344, 591], false, Colours.BROWN)
  doors.comfort_4 = new Door(235, [439, 591], false, Colours.BROWN)
  doors.comfort_5 = new Door(236, [439, 725], false, Colours.BROWN)
  doors.comfort_6 = new Door(241, [534, 619], false, Colours.BROWN)
  doors.comfort_7 = new Door(244, [534, 697], false, Colours.BROWN)
  doors.comfort_8 = new Door(247, [622, 619], false, Colours.BROWN)
  doors.comfort_9 = new Door(248, [622, 697], false, Colours.BROWN)
  doors.stairwell_2 = new Door(250, [682, 670], false, Colours.BROWN)
  doors.stairwell_2.rotate()

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

  //initializing receivers
  receivers.conferenceAP = new Receiver('AP1-1', 'Conference Room', [192,165], Colours.WHITE, Receiver_Type.ACCESS_P, 1);
  receivers.conferenceAP = new Receiver('AP1-1', 'Conference Room', [192,165], Colours.WHITE, Receiver_Type.ACCESS_P, 1);
  receivers.conferenceAP = new Receiver('AP1-1', 'Conference Room', [192,165], Colours.WHITE, Receiver_Type.ACCESS_P, 1);
  receivers.conferenceAP = new Receiver('AP1-1', 'Conference Room', [192,165], Colours.WHITE, Receiver_Type.ACCESS_P, 1);
  receivers.conferenceAP = new Receiver('AP1-1', 'Conference Room', [192,165], Colours.WHITE, Receiver_Type.ACCESS_P, 1);
  receivers.conferenceAP = new Receiver('AP1-1', 'Conference Room', [192,165], Colours.WHITE, Receiver_Type.ACCESS_P, 1);
  receivers.conferenceAP = new Receiver('AP1-1', 'Conference Room', [192,165], Colours.WHITE, Receiver_Type.ACCESS_P, 1);

  // Floor 1 phone initializing
  receivers.frontDeskPhone = new Receiver('PHONE_FRONTDESK', 'Front Lobby', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  receivers.conferencePhone = new Receiver('PHONE_CONFERENCE', 'Conference Room', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  receivers.kitchenPhone = new Receiver('PHONE_KITCHEN', 'Kitchen', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  receivers.gymPhone = new Receiver('PHONE_GYM', 'Gym', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  receivers.poolPhone = new Receiver('PHONE_POOL', 'Pool', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  receivers.mensWashroomPhone = new Receiver('PHONE_MENS_WASHROOM', 'Mens Washroom', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  receivers.womensWashroomPhone = new Receiver('PHONE_WOMENS_WASHROOM', 'Womens Washroom', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  receivers.womensWashroomPhone = new Receiver('PHONE_WOMENS_WASHROOM', 'Womens Washroom', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 1)
  
  // Floor 2 phone initializing
  receivers.room210Phone = new Receiver('PHONE_210', 'Room 210', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room220Phone = new Receiver('PHONE_220', 'Room 220', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room231Phone = new Receiver('PHONE_231', 'Room 231', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room232Phone = new Receiver('PHONE_232', 'Room 232', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room233Phone = new Receiver('PHONE_233', 'Room 233', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room235Phone = new Receiver('PHONE_235', 'Room 235', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room236Phone = new Receiver('PHONE_236', 'Room 236', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room241Phone = new Receiver('PHONE_241', 'Room 241', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room244Phone = new Receiver('PHONE_244', 'Room 244', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room247Phone = new Receiver('PHONE_247', 'Room 247', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)
  receivers.room248Phone = new Receiver('PHONE_248', 'Room 248', [1, 2], Colours.WHITE, Receiver_Type.PHONE, 2)

  visualizationArea.start(dataSet)
}

// Visualization area object
const visualizationArea = {
  canvas: document.createElement('canvas'),

  // Function to start the visualization
  start: (dataSet) => {
    visualizationArea.canvas.width = 785
    visualizationArea.canvas.height = 857
    visualizationArea.canvas.context = visualizationArea.canvas.getContext('2d')
    document.body.insertBefore(visualizationArea.canvas, document.body.childNodes[0])
    visualizationArea.canvas.interval = setInterval(() => updateVisualization(dataSet), 1)
  },
  // Function to stop the visualization
  stop: () => {
    clearInterval(visualizationArea.canvas.interval)
  },
  // Function to clear the visualization area
  clear: () => {
    visualizationArea.canvas.context.clearRect(0, 0, visualizationArea.canvas.width, visualizationArea.canvas.height)
  }
}

function drawDoors () {
  const cont = visualizationArea.canvas.context
  
  // cont.fillRect(0,0,100,100);
  Object.keys(doors).forEach(element => {
    const pos = doors[element].getPosition()
    const size = doors[element].getSize()
    cont.fillStyle = doors[element].getColour();
    cont.fillRect(pos[0], pos[1], size[0], size[1])
  })
}

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
  drawDoors()

  // Check if the queued update occurred at the current point that the visualization
  // is through the timeline
  if (queuedUpdateTimeSeconds === dataTimeCurrentSeconds) {
    // Show the queued update
    if(queuedUpdate['guest-id'] == 'Veronica'){
        console.log(queuedUpdate);
    }
 

    // Populate the queued update with the next update from the dataset
    queuedUpdateIndex++
    queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]
    queuedUpdateTimeSeconds = parseInt(Object.keys(dataSet)[queuedUpdateIndex])
  }

  // Increase the elapsed seconds counter by 1
  dataTimeElapsedSeconds++
}
