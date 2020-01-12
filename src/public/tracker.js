// TODO speed
// TODO graph activity
// TODO Average distance from room

// The people selected to be followed
const checkboxesArray = Array.prototype.slice.call(document.getElementsByName('personSelect'))
let selectedPeople = checkboxesArray.filter((checkbox) => {
  return checkbox.checked === true
}).map((element) => {
  return element.value
})

// Time of first update
const startTime = 1578151801

// Time of last update
const endTime = 1578236760

// Time of current update
let currentTime = startTime

// The next updated queued to be visualized
let queuedUpdate

// The index of the currently queued updated within the dataset
let queuedUpdateIndex = -1

// Object to store each Person object
let people = {}

// Object to store each door object
let doors = {}

// Object to store each receiver object
let receivers = {}

const Colours = {
  RED: '#ff2915',
  BLUE: '#2925ff',
  YELLOW: '#fff537',
  GREEN: '#14ab03',
  TURQUOISE: '#40E0D0',
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

class Entity {
  constructor (name, colour, position) {
    this.name = name
    this.colour = colour
    this.position = position
  }

  getName () {
    return this.name
  }

  getColour () {
    return this.colour
  }

  getPosition () {
    return this.position
  }

  setColour (col) {
    this.colour = col
  }

  setPosition (pos) {
    this.position = pos
  }
}

class Receiver extends Entity {
  constructor (name, colour, position, region, type, level) {
    super(name, colour, position)
    this.radius = 32
    this.region = region
    this.type = type
    this.level = level
    this.active = false
  }

  getRadius () {
    return this.radius
  }

  getRegion () {
    return this.region
  }

  getType () {
    return this.type
  }

  getLevel () {
    return this.level
  }

  toggle () {
    this.active = !(this.active)
  }

  isActive () {
    return this.active
  }
}

class Person extends Entity {
  constructor (name, colour, position, role, room) {
    super(name, colour, position)
    this.role = role
    this.room = room
    this.connection = ['none', '0']
  }

  getRole () {
    return this.role
  }

  getRoom () {
    return this.room
  }

  getConnection () {
    return this.connection
  }

  setConnection (con) {
    this.connection = con
  }
}

class Door extends Entity {
  constructor (name, colour, position, mode) {
    super(name, colour, position)
    this.height = 6
    this.width = 30
    this.mode = mode
  }

  getMode () {
    return this.mode
  }

  toggle () {
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

  getSize () {
    return [this.width, this.height]
  }
}

function startVisualizer (dataSet) {
  // resetting global arrays
  doors = {}
  people = {}
  receivers = {}

  // initializing first floor doors

  doors.conference = new Door('110', Colours.BROWN, [258, 160], false)
  doors.conference.rotate()
  // doors.dining = new Door('105', [270, 320], false, Colours.BROWN)
  doors.kitchen = new Door('130', Colours.BROWN, [258, 400], false)
  doors.kitchen.rotate()
  doors.gym = new Door('151', Colours.BROWN, [503, 246], false)
  // doors.mens_washroom = new Door('152', [484, 324], false, Colours.BROWN)
  // doors.womens_washroom = new Door('154', [562, 324], false, Colours.BROWN)
  doors.reception = new Door('101', Colours.BROWN, [463, 119], false)
  doors.reception.rotate()
  doors.pool = new Door('155', Colours.BROWN, [620, 246], false)
  doors.laundry = new Door('156', Colours.BROWN, [636, 326], false)
  doors.storage = new Door('156b', Colours.BROWN, [636, 388], false)
  doors.stairwell_1 = new Door('150', Colours.BROWN, [680, 259], false)
  doors.stairwell_1.rotate()

  // initializing second floor doors
  doors.executive_1 = new Door('210', Colours.BROWN, [218, 614], false)
  doors.executive_1.rotate()
  doors.executive_2 = new Door('220', Colours.BROWN, [218, 674], false)
  doors.executive_2.rotate()
  doors.comfort_1 = new Door('231', Colours.BROWN, [256, 591], false)
  doors.comfort_2 = new Door('232', Colours.BROWN, [256, 725], false)
  doors.comfort_3 = new Door('233', Colours.BROWN, [344, 591], false)
  doors.comfort_4 = new Door('235', Colours.BROWN, [439, 591], false)
  doors.comfort_5 = new Door('236', Colours.BROWN, [439, 725], false)
  doors.comfort_6 = new Door('241', Colours.BROWN, [534, 619], false)
  doors.comfort_7 = new Door('244', Colours.BROWN, [534, 697], false)
  doors.comfort_8 = new Door('247', Colours.BROWN, [622, 619], false)
  doors.comfort_9 = new Door('248', Colours.BROWN, [622, 697], false)
  doors.stairwell_2 = new Door('250', Colours.BROWN, [682, 670], false)
  doors.stairwell_2.rotate()

  // initializing guests
  people.veronica = new Person('Veronica', Colours.RED, [0, 0], 'guest', 210)
  people.jason = new Person('Jason', Colours.BLUE, [0, 0], 'guest', 241)
  people.thomas = new Person('Thomas', Colours.ORANGE, [0, 0], 'guest', 248)
  people.rob = new Person('Rob', Colours.TURQUOISE, [0, 0], 'guest', 231)
  people.kristina = new Person('Kristina', Colours.BLACK, [0, 0], 'guest', 235)

  // initializing staff
  people.marc = new Person('Marc-Andre', Colours.VIOLET, [0, 0], 'cleaning', 0)
  people.dave = new Person('Dave', Colours.PINK, [0, 0], 'cooking', 0)
  people.salina = new Person('Salina', Colours.GRAY, [0, 0], 'reception', 0)
  people.harrison = new Person('Harrison', Colours.GREEN, [0, 0], 'reception late-night', 0)

  // Floor 1 phone initializing
  receivers.frontDeskPhone = new Receiver(receiverID.PHONE_FRONT_DESK, Colours.YELLOW, [426, 180], 'Reception Desk', receiverType.PHONE, 1)
  receivers.room100Phone = new Receiver(receiverID.PHONE_100, Colours.YELLOW, [304, 125], 'Front Lobby', receiverType.PHONE, 1)
  receivers.room110Phone = new Receiver(receiverID.PHONE_110, Colours.YELLOW, [146, 138], 'Conference Room', receiverType.PHONE, 1)
  receivers.room130Phone = new Receiver(receiverID.PHONE_130, Colours.YELLOW, [146, 348], 'Kitchen', receiverType.PHONE, 1)
  receivers.room151Phone = new Receiver(receiverID.PHONE_151, Colours.YELLOW, [551, 169], 'Gym', receiverType.PHONE, 1)
  receivers.room155Phone = new Receiver(receiverID.PHONE_155, Colours.YELLOW, [653, 145], 'Pool', receiverType.PHONE, 1)
  receivers.room152Phone = new Receiver(receiverID.PHONE_152, Colours.YELLOW, [475, 437], 'Mens Washroom', receiverType.PHONE, 1)
  receivers.room154Phone = new Receiver(receiverID.PHONE_154, Colours.YELLOW, [573, 437], 'Womens Washroom', receiverType.PHONE, 1)

  // Floor 2 phone initializing
  receivers.room200Phone = new Receiver(receiverID.PHONE_200, Colours.YELLOW, [526, 658], 'Floor 2 Hallway', receiverType.PHONE, 2)
  receivers.room210Phone = new Receiver(receiverID.PHONE_210, Colours.YELLOW, [146, 508], 'Room 210', receiverType.PHONE, 2)
  receivers.room220Phone = new Receiver(receiverID.PHONE_220, Colours.YELLOW, [146, 807], 'Room 220', receiverType.PHONE, 2)
  receivers.room231Phone = new Receiver(receiverID.PHONE_231, Colours.YELLOW, [243, 508], 'Room 231', receiverType.PHONE, 2)
  receivers.room232Phone = new Receiver(receiverID.PHONE_232, Colours.YELLOW, [243, 807], 'Room 232', receiverType.PHONE, 2)
  receivers.room233Phone = new Receiver(receiverID.PHONE_233, Colours.YELLOW, [336, 508], 'Room 233', receiverType.PHONE, 2)
  receivers.room235Phone = new Receiver(receiverID.PHONE_235, Colours.YELLOW, [429, 508], 'Room 235', receiverType.PHONE, 2)
  receivers.room236Phone = new Receiver(receiverID.PHONE_236, Colours.YELLOW, [429, 807], 'Room 236', receiverType.PHONE, 2)
  receivers.room241Phone = new Receiver(receiverID.PHONE_241, Colours.YELLOW, [520, 508], 'Room 241', receiverType.PHONE, 2)
  receivers.room244Phone = new Receiver(receiverID.PHONE_244, Colours.YELLOW, [520, 807], 'Room 244', receiverType.PHONE, 2)
  receivers.room247Phone = new Receiver(receiverID.PHONE_247, Colours.YELLOW, [615, 508], 'Room 247', receiverType.PHONE, 2)
  receivers.room248Phone = new Receiver(receiverID.PHONE_248, Colours.YELLOW, [615, 807], 'Room 248', receiverType.PHONE, 2)

  // initializing access points, first floor
  receivers.room110AP = new Receiver(receiverID.AP1_1, Colours.WHITE, [192, 165], 'Conference Room', receiverType.ACCESS_P, 1)
  receivers.room105AP = new Receiver(receiverID.AP1_3, Colours.WHITE, [365, 408], 'Dining Hall', receiverType.ACCESS_P, 1)
  receivers.room100AP = new Receiver(receiverID.AP1_4, Colours.WHITE, [361, 175], 'Front Lobby', receiverType.ACCESS_P, 1)
  receivers.hallEastAP_1 = new Receiver(receiverID.AP1_2, Colours.WHITE, [582, 284], 'First Floor East Hall', receiverType.ACCESS_P, 1)

  // initializing access points, second floor
  receivers.hallWestAP = new Receiver(receiverID.AP2_1, Colours.WHITE, [268, 655], 'Second Floor West Hall', receiverType.ACCESS_P, 2)
  receivers.hallEastAP_2 = new Receiver(receiverID.AP2_2, Colours.WHITE, [588, 655], 'Second Floor East Hall', receiverType.ACCESS_P, 2)
  receivers.hallCenterAP = new Receiver(receiverID.AP2_3, Colours.WHITE, [459, 655], 'Second Floor Center Hall', receiverType.ACCESS_P, 2)

  // initializing motion sensors
  receivers.stairMS = new Receiver(receiverID.MS1, Colours.YELLOW, [715, 291, 715, 662], 'Stairwell Sensor', receiverType.M_SENSOR, 1)
  receivers.elevatorMS = new Receiver(receiverID.MS2, Colours.YELLOW, [363, 291, 363, 662], 'Elevator', receiverType.M_SENSOR, 1)
  receivers.room234MS = new Receiver(receiverID.MS3, Colours.YELLOW, [363, 799], 'Ice/Vending Machines', receiverType.M_SENSOR, 2)

  visualizationArea.dataSet = dataSet
  visualizationArea.setup()
}

// Visualization area object
const visualizationArea = {
  canvas: document.getElementById('visualizationArea'),
  dataset: {},
  paused: true,

  // Function to start the visualization
  setup: () => {
    visualizationArea.canvas.innerHTML = ''
    visualizationArea.canvas.width = 785
    visualizationArea.canvas.height = 857
    visualizationArea.canvas.context = visualizationArea.canvas.getContext('2d')
    drawDoors()
  },
  // Function to pause the visualization
  play: () => {
    if (visualizationArea.paused) {
      visualizationArea.paused = false
      visualizationArea.canvas.interval = setInterval(() => nextAction(), 500)
    }
  },
  // Function to pause the visualization
  pause: () => {
    if (!visualizationArea.paused) {
      visualizationArea.paused = true
      clearInterval(visualizationArea.canvas.interval)
    }
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
    cont.globalAlpha = 1
    cont.fillStyle = doors[element].getColour()
    cont.fillRect(pos[0], pos[1], size[0], size[1])
  })
}

function drawReceivers () {
  const cont = visualizationArea.canvas.context
  selectedPeople.forEach(selectedPerson => {
    const trackedPerson = Object.values(people).filter(person => {
      return person.getName() === selectedPerson
    })[0]

    Object.keys(receivers).forEach(element => {
      // access points
      const pos = receivers[element].getPosition()
      const rad = receivers[element].getRadius()
      if (receivers[element] === trackedPerson.getConnection()[0]) {
        cont.globalAlpha = 0.5
        cont.fillStyle = trackedPerson.getColour()
        cont.beginPath()
        cont.arc(pos[0], pos[1], rad, 0, 2 * Math.PI, false)
        cont.fill()
      } else if (receivers[element].isActive()) {
        // motion sensors or phone

        if (receivers[element].getName() !== receiverID.MS3) {
          cont.globalAlpha = 0.5
          cont.fillStyle = receivers[element].getColour()
          cont.beginPath()
          cont.arc(pos[0], pos[1], rad, 0, 2 * Math.PI, false)
          cont.fill()
          cont.arc(pos[2], pos[3], rad, 0, 2 * Math.PI, false)
          cont.fill()
        } else {
          cont.globalAlpha = 0.5
          cont.fillStyle = receivers[element].getColour()
          cont.beginPath()
          cont.arc(pos[0], pos[1], rad, 0, 2 * Math.PI, false)
          cont.fill()
        }
        if (receivers[element].getType() !== receiverType.PHONE) {
          receivers[element].toggle()
        }
      }
    })
  })
}

// Function to update the visualization area
function updateVisualization () {
  // Clear the visualization area
  visualizationArea.clear()

  // Check if the queued update is a door sensor update
  if (queuedUpdate.device === receiverType.D_SENSOR) {
    // Update the door state
    const queuedUpdateDoor = Object.values(doors).filter(door => {
      return door.getName() === queuedUpdate['device-id']
    })[0]
    const queuedUpdatePerson = Object.values(people).filter(person => {
      return person.getName() === queuedUpdate['guest-id']
    })[0]

    if (queuedUpdateDoor !== undefined) {
      var itt = 0
      selectedPeople.forEach(selectedPerson => {
        if (queuedUpdatePerson !== undefined && queuedUpdatePerson.getName() === selectedPerson) {
          queuedUpdateDoor.setColour(queuedUpdatePerson.getColour())
          queuedUpdateDoor.toggle()
          itt++
        }
      })
      if (itt === 0) {
        queuedUpdateDoor.setColour(Colours.BROWN)
        queuedUpdateDoor.toggle()
      }
    }
  } else if (queuedUpdate.device === receiverType.ACCESS_P) {
    if (queuedUpdate.event !== 'user disconnected') {
      // Update the receiver state
      const queuedUpdateReceiver = Object.values(receivers).filter(receiver => {
        return receiver.getName() === queuedUpdate['device-id']
      })[0]

      const queuedUpdatePerson = Object.values(people).filter(person => {
        return person.getName() === queuedUpdate['guest-id']
      })[0]

      if (queuedUpdateReceiver !== undefined && queuedUpdatePerson !== undefined) {
        queuedUpdatePerson.setConnection([queuedUpdateReceiver, queuedUpdate.time])
      }
    }
  } else if (queuedUpdate.device === receiverType.M_SENSOR) {
    const queuedUpdateReceiver = Object.values(receivers).filter(receiver => {
      return receiver.getName() === queuedUpdate['device-id']
    })[0]
    if (queuedUpdateReceiver !== undefined) {
      queuedUpdateReceiver.toggle()
    } else {
      console.log('undefined sensor')
    }
  } else if (queuedUpdate.device === receiverType.PHONE) {
    const queuedUpdateReceiver = Object.values(receivers).filter(receiver => {
      return receiver.getName() === queuedUpdate['device-id']
    })[0]
    if (queuedUpdateReceiver !== undefined) {
      queuedUpdateReceiver.toggle()
    } else {
      console.log('undefined phone')
    }
  }

  // Draw the doors to the canvas
  drawDoors()

  // Draw receivers to the canvas
  drawReceivers()

  // Update display info
  document.getElementById('updateCounter').textContent = 'Updates Visualized: ' + (queuedUpdateIndex + 1)
  document.getElementById('updateInfo').textContent = 'Current Event: ' + queuedUpdate.event + ' | ' + queuedUpdate['device-id'] + ' | ' + queuedUpdate['guest-id']
  currentTime = queuedUpdate.time
  document.getElementById('currentTime').textContent = 'Current Time: ' + new Date(parseInt(queuedUpdate.time * 1000)).toLocaleString()
}

// Function to visualize the next action in the dataset
function nextAction () {
  const dataSet = visualizationArea.dataSet

  // Check if the user is attemping to access an update that does not exist
  if (queuedUpdateIndex >= Object.keys(dataSet).length || queuedUpdateIndex < -1) {
    console.log(queuedUpdateIndex)
    alert('This is the end of the updates!')
    return
  }

  // Advance to the next queued update
  queuedUpdateIndex++
  queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]

  // Update the visualization with the next action
  updateVisualization()
}

// Function to visualize the next action in the dataset that involves a followed person
function nextFollowedAction () {
  const dataSet = visualizationArea.dataSet

  // Advance to the next queued update
  do {
    queuedUpdateIndex++
    // Check if the user is attemping to access an update that does not exist
    if (queuedUpdateIndex >= Object.keys(dataSet).length || queuedUpdateIndex < -1) {
      queuedUpdateIndex--
      alert('This person has no more updates!')
      return
    }
    queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]

  } while (!selectedPeople.includes(queuedUpdate['guest-id']) && queuedUpdate.device !== 'motion sensor' && queuedUpdate.device !== 'phone')

  // Update the visualization with the next action
  updateVisualization()
}

// Function to visualize the previous action in the dataset
function prevAction () {
  const dataSet = visualizationArea.dataSet

  // Check if the user is attemping to access an update that does not exist
  if (queuedUpdateIndex > Object.keys(dataSet).length || queuedUpdateIndex < 0) {
    console.log(queuedUpdateIndex)
    alert('This is the end of the updates!')
    return
  }

  // Rewind to the previous queued update
  gotoUpdate(queuedUpdateIndex)
}

// Function to visualize the previous action in the dataset that involves a followed person
function prevFollowedAction () {
  const dataSet = visualizationArea.dataSet

  // Rewind to the previous queued update
  do {
    queuedUpdateIndex--
    // Check if the user is attemping to access an update that does not exist
    if (queuedUpdateIndex >= Object.keys(dataSet).length || queuedUpdateIndex < 0) {
      queuedUpdateIndex++
      alert('This person has no more updates!')
      return
    }
    queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]

  } while (!selectedPeople.includes(queuedUpdate['guest-id']) && queuedUpdate.device !== 'motion sensor' && queuedUpdate.device !== 'phone')

  // Rewind to the previous queued update
  gotoUpdate(queuedUpdateIndex)
}

// Function to goto a specific action
function gotoUpdate (actionNumber) {
  const dataSet = visualizationArea.dataSet

  // Check if the user is attemping to access an update that does not exist
  if (actionNumber >= Object.keys(dataSet).length || actionNumber < 0) {
    alert('There is no update of that number! Please enter a valid number.')
    return
  }

  // Restart the visualizer
  queuedUpdateIndex = -1
  startVisualizer(visualizationArea.dataSet)

  if (actionNumber === 0) {
    nextAction()
    return
  }

  // Progress through actionNumber of updates before stopping
  for (let i = 0; i < actionNumber; i++) {
    nextAction()
  }
}

// Function to goto a specific action
function advanceTime () {
  const hours = document.getElementById('advanceTimeHoursInput').value
  const minutes = document.getElementById('advanceTimeMinutesInput').value
  const seconds = document.getElementById('advanceTimeSecondsInput').value

  const timeAdvance = (parseInt(hours * 3600) + parseInt(minutes * 60) + parseInt(seconds))
  const newTime = parseInt(currentTime) + parseInt(timeAdvance)

  if (newTime > endTime) {
    alert('Time too far in future! Please enter a valid time advance.')
    return
  }

  let updateIndex = 0
  let currentUpdateTime = Object.keys(visualizationArea.dataSet)[updateIndex].time
  let nextUpdateTime = Object.keys(visualizationArea.dataSet)[updateIndex + 1].time

  // Continue iterating through updates until an update after the new time is found
  while (!(currentUpdateTime < newTime && nextUpdateTime >= newTime)) {
    // Iterate to the next update
    updateIndex++
    currentUpdateTime = Object.keys(visualizationArea.dataSet)[updateIndex]
    nextUpdateTime = Object.keys(visualizationArea.dataSet)[updateIndex + 1]
  }

  gotoUpdate(updateIndex + 2)
}

// Click handler function when a person's checkbox is selected
function selectPerson () {
  // Update the selected people based on the checked checkboxes
  const checkboxesArray = Array.prototype.slice.call(document.getElementsByName('personSelect'))
  selectedPeople = checkboxesArray.filter((checkbox) => {
    return checkbox.checked === true
  }).map((element) => {
    return element.value
  })

  gotoUpdate(queuedUpdateIndex + 1)
}

// HTML element event listeners
document.getElementById('play').addEventListener('click', visualizationArea.play)
document.getElementById('pause').addEventListener('click', visualizationArea.pause)
document.getElementById('prev').addEventListener('click', prevAction)
document.getElementById('prevFollowed').addEventListener('click', prevFollowedAction)
document.getElementById('next').addEventListener('click', nextAction)
document.getElementById('nextFollowed').addEventListener('click', nextFollowedAction)
document.getElementById('gotoUpdateSubmit').addEventListener('click', () => gotoUpdate(document.getElementById('gotoUpdateInput').value))
document.getElementById('advanceTimeSubmit').addEventListener('click', () => advanceTime())
const personSelectCheckboxes = document.getElementsByName('personSelect')
personSelectCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', selectPerson)
})

function mouseTracker (e) {
  var x = e.clientX
  var y = e.clientY
  document.getElementById('connectionsLS').innerHTML = ''
  if (x > 176 && y > 159 && x < 230 && y < 207) {
    selectedPeople.forEach(selectedPerson => {
      const trackedPerson = Object.values(people).filter(person => {
        return person.getName() === selectedPerson
      })[0]
      if (trackedPerson.getConnection()[0] !== 'none' && trackedPerson.getConnection()[0].getName() === receiverID.AP1_1) {
        const listItem = document.createElement('li')
        listItem.textContent = trackedPerson.getName() + ' connected to ' + receiverID.AP1_1 + ' at ' + new Date(parseInt(trackedPerson.getConnection()[1] * 1000)).toLocaleTimeString()
        document.getElementById('connectionsLS').appendChild(listItem)
      }
    })
  } else if (x > 342 && y > 163 && x < 400 && y < 219) {
    selectedPeople.forEach(selectedPerson => {
      const trackedPerson = Object.values(people).filter(person => {
        return person.getName() === selectedPerson
      })[0]
      if (trackedPerson.getConnection()[0] !== 'none' && trackedPerson.getConnection()[0].getName() === receiverID.AP1_4) {
        const listItem = document.createElement('li')
        listItem.textContent = trackedPerson.getName() + ' connected to ' + receiverID.AP1_4 + ' at ' + new Date(parseInt(trackedPerson.getConnection()[1] * 1000)).toLocaleTimeString()
        document.getElementById('connectionsLS').appendChild(listItem)
      }
    })
  } else if (x > 562 && y > 275 && x < 616 && y < 321) {
    selectedPeople.forEach(selectedPerson => {
      const trackedPerson = Object.values(people).filter(person => {
        return person.getName() === selectedPerson
      })[0]
      if (trackedPerson.getConnection()[0] !== 'none' && trackedPerson.getConnection()[0].getName() === receiverID.AP1_2) {
        const listItem = document.createElement('li')
        listItem.textContent = trackedPerson.getName() + ' connected to ' + receiverID.AP1_2 + ' at ' + new Date(parseInt(trackedPerson.getConnection()[1] * 1000)).toLocaleTimeString()
        document.getElementById('connectionsLS').appendChild(listItem)
      }
    })
  } else if (x > 340 && y > 388 && x < 400 && y < 451) {
    selectedPeople.forEach(selectedPerson => {
      const trackedPerson = Object.values(people).filter(person => {
        return person.getName() === selectedPerson
      })[0]
      if (trackedPerson.getConnection()[0] !== 'none' && trackedPerson.getConnection()[0].getName() === receiverID.AP1_3) {
        const listItem = document.createElement('li')
        listItem.textContent = trackedPerson.getName() + ' connected to ' + receiverID.AP1_3 + ' at ' + new Date(parseInt(trackedPerson.getConnection()[1] * 1000)).toLocaleTimeString()
        document.getElementById('connectionsLS').appendChild(listItem)
      }
    })
  } else if (x > 248 && y > 647 && x < 300 && y < 702) {
    selectedPeople.forEach(selectedPerson => {
      const trackedPerson = Object.values(people).filter(person => {
        return person.getName() === selectedPerson
      })[0]
      if (trackedPerson.getConnection()[0] !== 'none' && trackedPerson.getConnection()[0].getName() === receiverID.AP2_1) {
        const listItem = document.createElement('li')
        listItem.textContent = trackedPerson.getName() + ' connected to ' + receiverID.AP2_1 + ' at ' + new Date(parseInt(trackedPerson.getConnection()[1] * 1000)).toLocaleTimeString()
        document.getElementById('connectionsLS').appendChild(listItem)
      }
    })
  } else if (x > 442 && y > 647 && x < 492 && y < 702) {
    selectedPeople.forEach(selectedPerson => {
      const trackedPerson = Object.values(people).filter(person => {
        return person.getName() === selectedPerson
      })[0]
      if (trackedPerson.getConnection()[0] !== 'none' && trackedPerson.getConnection()[0].getName() === receiverID.AP2_3) {
        const listItem = document.createElement('li')
        listItem.textContent = trackedPerson.getName() + ' connected to ' + receiverID.AP2_3 + ' at ' + new Date(parseInt(trackedPerson.getConnection()[1] * 1000)).toLocaleTimeString()
        document.getElementById('connectionsLS').appendChild(listItem)
      }
    })
  } else if (x > 571 && y > 647 && x < 630 && y < 702) {
    selectedPeople.forEach(selectedPerson => {
      const trackedPerson = Object.values(people).filter(person => {
        return person.getName() === selectedPerson
      })[0]
      if (trackedPerson.getConnection()[0] !== 'none' && trackedPerson.getConnection()[0].getName() === receiverID.AP2_2) {
        const listItem = document.createElement('li')
        listItem.textContent = trackedPerson.getName() + ' connected to ' + receiverID.AP2_2 + ' at ' + new Date(parseInt(trackedPerson.getConnection()[1] * 1000)).toLocaleTimeString()
        document.getElementById('connectionsLS').appendChild(listItem)
      }
    })
  }
}

// Request the dataset from the back end
requestDataSet((dataSet) => {
  dataSet = JSON.parse(dataSet)
  queuedUpdate = dataSet[Object.keys(dataSet)[queuedUpdateIndex]]
  startVisualizer(dataSet)
})
