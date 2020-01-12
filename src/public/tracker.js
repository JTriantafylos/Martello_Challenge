// person being followed
const tracking = 'Veronica'

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

// The index of the currently queued updated within the dataset
let queuedUpdateIndex = 0

// Object to store each Person object
const people = {}

// Object to store each door object
const doors = {}

// Object to store each receiver object
const receivers = {}

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
const receiverType = {

  PHONE: 'phone',
  M_SENSOR: 'motion sensor',
  D_SENSOR: 'door sensor',
  ACCESS_P: 'access point'
}

const receiverID = {
  // Phone IDs
  PHONE_FRONT_DESK: 'reception',
  PHONE_100: 'lobby',
  PHONE_110: '110',
  PHONE_130: '130',
  PHONE_151: '151',
  PHONE_152: '152',
  PHONE_154: '154',
  PHONE_155: '155',
  PHONE_210: '210',
  PHONE_220: '220',
  PHONE_231: '231',
  PHONE_232: '232',
  PHONE_233: '233',
  PHONE_235: '235',
  PHONE_236: '236',
  PHONE_241: '241',
  PHONE_244: '244',
  PHONE_247: '247',
  PHONE_248: '248',

  // Access Point IDs
  AP1_1: 'ap1-1',
  AP1_2: 'ap1-2',
  AP1_3: 'ap1-3',
  AP1_4: 'ap1-4',
  AP2_1: 'ap2-1',
  AP2_2: 'ap2-2',
  AP2_3: 'ap2-3',

  // Motion sensors IDs
  MS1: 'stairwell',
  MS2: 'elevator',
  MS3: 'ice machine'
}
class Receiver {
  constructor (name, region, position, colour, type, floor, active) {
    this.name = name
    this.height = 15
    this.width = 15
    this.region = region
    this.position = position
    this.colour = colour
    this.type = type
    this.floor = floor
    this.active = active
  }

  setColour (col) {
    this.colour = col
  }

  getColour () {
    return this.colour
  }
  toggle () {
    this.active = !(this.active)
  }
  getPosition () {
    return this.position
  }
  getSize () {
    return [this.width, this.height]
  }
  getActive(){
      return this.active;
  }
}

class Person {
  constructor (name, role, room, position, colour) {
    this.name = name
    this.role = role
    this.room = room
    this.position = position
    this.colour = colour
    this.connection = 'n/a';
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
  getConnection(){
      return this.connection;
  }
  setConnection(con){
      this.connection = con;
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
    if (!this.mode) {
      this.colour = Colours.BROWN
    }
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

  setColour (col) {
    this.colour = col
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
  doors.conference = new Door('110', [258, 160], false, Colours.BROWN)
  doors.conference.rotate()
  // doors.dining = new Door('105', [270, 320], false, Colours.BROWN)
  doors.kitchen = new Door('130', [258, 400], false, Colours.BROWN)
  doors.kitchen.rotate()
  doors.gym = new Door('151', [503, 246], false, Colours.BROWN)
  // doors.mens_washroom = new Door('152', [484, 324], false, Colours.BROWN)
  // doors.womens_washroom = new Door('154', [562, 324], false, Colours.BROWN)
  doors.reception = new Door('101', [463, 119], false, Colours.BROWN)
  doors.reception.rotate()
  doors.pool = new Door('155', [620, 246], false, Colours.BROWN)
  doors.laundry = new Door('156', [636, 326], false, Colours.BROWN)
  doors.storage = new Door('156b', [636, 388], false, Colours.BROWN)
  doors.stairwell_1 = new Door('150', [680, 259], false, Colours.BROWN)
  doors.stairwell_1.rotate()

  // initializing second floor doors
  doors.executive_1 = new Door('210', [218, 614], false, Colours.BROWN)
  doors.executive_1.rotate()
  doors.executive_2 = new Door('220', [218, 674], false, Colours.BROWN)
  doors.executive_2.rotate()
  doors.comfort_1 = new Door('231', [256, 591], false, Colours.BROWN)
  doors.comfort_2 = new Door('232', [256, 725], false, Colours.BROWN)
  doors.comfort_3 = new Door('233', [344, 591], false, Colours.BROWN)
  doors.comfort_4 = new Door('235', [439, 591], false, Colours.BROWN)
  doors.comfort_5 = new Door('236', [439, 725], false, Colours.BROWN)
  doors.comfort_6 = new Door('241', [534, 619], false, Colours.BROWN)
  doors.comfort_7 = new Door('244', [534, 697], false, Colours.BROWN)
  doors.comfort_8 = new Door('247', [622, 619], false, Colours.BROWN)
  doors.comfort_9 = new Door('248', [622, 697], false, Colours.BROWN)
  doors.stairwell_2 = new Door('250', [682, 670], false, Colours.BROWN)
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

  // Floor 1 phone initializing
  receivers.frontDeskPhone = new Receiver(receiverID.PHONE_FRONT_DESK, 'Reception Desk', [1, 2], Colours.WHITE, receiverType.PHONE, 1)
  receivers.room100Phone = new Receiver(receiverID.PHONE_100, 'Front Lobby', [1, 2], Colours.WHITE, receiverType.PHONE, 1)
  receivers.room110Phone = new Receiver(receiverID.PHONE_110, 'Conference Room', [1, 2], Colours.WHITE, receiverType.PHONE, 1)
  receivers.room130Phone = new Receiver(receiverID.PHONE_130, 'Kitchen', [1, 2], Colours.WHITE, receiverType.PHONE, 1)
  receivers.room151Phone = new Receiver(receiverID.PHONE_151, 'Gym', [1, 2], Colours.WHITE, receiverType.PHONE, 1)
  receivers.room155Phone = new Receiver(receiverID.PHONE_155, 'Pool', [1, 2], Colours.WHITE, receiverType.PHONE, 1)
  receivers.room152Phone = new Receiver(receiverID.PHONE_152, 'Mens Washroom', [1, 2], Colours.WHITE, receiverType.PHONE, 1)
  receivers.room154Phone = new Receiver(receiverID.PHONE_154, 'Womens Washroom', [1, 2], Colours.WHITE, receiverType.PHONE, 1)

  // Floor 2 phone initializing
  receivers.room200Phone = new Receiver(receiverID.PHONE_200, 'Floor 2 Hallway', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room210Phone = new Receiver(receiverID.PHONE_210, 'Room 210', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room220Phone = new Receiver(receiverID.PHONE_220, 'Room 220', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room231Phone = new Receiver(receiverID.PHONE_231, 'Room 231', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room232Phone = new Receiver(receiverID.PHONE_232, 'Room 232', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room233Phone = new Receiver(receiverID.PHONE_233, 'Room 233', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room235Phone = new Receiver(receiverID.PHONE_235, 'Room 235', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room236Phone = new Receiver(receiverID.PHONE_236, 'Room 236', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room241Phone = new Receiver(receiverID.PHONE_241, 'Room 241', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room244Phone = new Receiver(receiverID.PHONE_244, 'Room 244', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room247Phone = new Receiver(receiverID.PHONE_247, 'Room 247', [1, 2], Colours.WHITE, receiverType.PHONE, 2)
  receivers.room248Phone = new Receiver(receiverID.PHONE_248, 'Room 248', [1, 2], Colours.WHITE, receiverType.PHONE, 2)

  // initializing access points, first floor
  receivers.room110AP = new Receiver(receiverID.AP1_1, 'Conference Room', [192, 165], Colours.WHITE, receiverType.ACCESS_P, 1)
  receivers.room105AP = new Receiver(receiverID.AP1_3, 'Dining Hall', [365, 408], Colours.WHITE, receiverType.ACCESS_P, 1)
  receivers.room100AP = new Receiver(receiverID.AP1_4, 'Front Lobby', [361, 175], Colours.WHITE, receiverType.ACCESS_P, 1)
  receivers.hallEastAP_1 = new Receiver(receiverID.AP1_2, 'First Floor East Hall', [582, 284], Colours.WHITE, receiverType.ACCESS_P, 1)

  // initializing access points, second floor
  receivers.hallWestAP = new Receiver(receiverID.AP2_1, 'Second Floor West Hall', [268, 655], Colours.WHITE, receiverType.ACCESS_P, 2)
  receivers.hallEastAP_2 = new Receiver(receiverID.AP2_2, 'Second Floor East Hall', [588, 655], Colours.WHITE, receiverType.ACCESS_P, 2)
  receivers.hallCenterAP = new Receiver(receiverID.AP2_3, 'Second Floor Center Hall', [459, 655], Colours.WHITE, receiverType.ACCESS_P, 2)

  // initializing motion sensors
  receivers.stairMS = new Receiver(receiverID.MS1, 'Stairwell Sensor', [715, 291, 715, 662], Colours.WHITE, receiverType.M_SENSOR, 1)
  receivers.elevatorMS = new Receiver(receiverID.MS2, 'Elevator', [363, 291, 363, 662], Colours.WHITE, receiverType.M_SENSOR, 1)
  receivers.room234MS = new Receiver(receiverID.MS3, 'Ice/Vending Machines', [363, 799], Colours.WHITE, receiverType.M_SENSOR, 2)

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
    visualizationArea.canvas.interval = setInterval(() => checkUpdate(dataSet), 1)
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
    cont.fillStyle = doors[element].getColour()
    cont.fillRect(pos[0], pos[1], size[0], size[1])
  })
}

function drawReceivers () {
    const cont = visualizationArea.canvas.context
  
    // cont.fillRect(0,0,100,100);
    const trackedPerson = Object.values(people).filter(person => {
        return person.name === tracking;
        })[0]
    Object.keys(receivers).forEach(element => {
      if(receivers[element] === trackedPerson.getConnection()){
        const pos = receivers[element].getPosition()
        const size = receivers[element].getSize()
        cont.fillStyle = trackedPerson.getColour()
        cont.fillRect(pos[0], pos[1], size[0], size[1])
      }
      
    })
  }

// Function to check if a visualization update is required
function checkUpdate (dataSet) {
  // Calculate the amount of seconds the visualization is through the dataset timeline
  const dataTimeCurrentSeconds = startTimeSeconds + dataTimeElapsedSeconds

  // Check if the last update has visualized
  if (dataTimeCurrentSeconds > endTimeSeconds) {
    visualizationArea.stop()
  }

  // Check if it is time for the queued update to be taken
  if (queuedUpdateTimeSeconds === dataTimeCurrentSeconds) {
    updateVisualization()
    // Populate the queued update with the next update from the dataset
    queuedUpdateIndex++
    queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]
    queuedUpdateTimeSeconds = parseInt(Object.keys(dataSet)[queuedUpdateIndex])
  }

  // Increase the elapsed seconds counter by 1
  dataTimeElapsedSeconds++
}

// Function to update the visualization area
function updateVisualization () {
  // Clear the visualization area
  visualizationArea.clear()

  // Draw the doors to the canvas
  drawDoors()
  // Draw receivers to the canvas
  drawReceivers();

  // Check if the queued update is a door sensor update
  if (queuedUpdate.device === receiverType.D_SENSOR) {
    // Update the door state
    const queuedUpdateDoor = Object.values(doors).filter(door => {
      return door.room === queuedUpdate['device-id']
    })[0]
    const queuedUpdatePerson = Object.values(people).filter(person => {
      return person.name === queuedUpdate['guest-id']
    })[0]

    if (queuedUpdateDoor !== undefined) {
      if (queuedUpdatePerson !== undefined && queuedUpdatePerson.getName() === tracking) {
        console.log(queuedUpdate)
        queuedUpdateDoor.setColour(queuedUpdatePerson.getColour())
        queuedUpdateDoor.toggleMode()
      } else {
        queuedUpdateDoor.setColour(Colours.BROWN)
        queuedUpdateDoor.toggleMode()
      }
    }
  } else {
    if(queuedUpdate['event'] !== 'user disconnected'){
        // Update the receiver state
        const queuedUpdateReceiver = Object.values(receivers).filter(receiver => {
            return receiver.name === queuedUpdate['device-id']
        })[0]
        
        const queuedUpdatePerson = Object.values(people).filter(person => {
            return person.name === queuedUpdate['guest-id']
            })[0]
            
        if (queuedUpdateReceiver !== undefined) {
            if (queuedUpdatePerson !== undefined && queuedUpdatePerson.getName() === tracking) {
                queuedUpdatePerson.setConnection(queuedUpdateReceiver);
            }
        }
    }
    
  }
}
