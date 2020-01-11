class person{
    constructor(name, role, room, position, colour){
        this.name = name;
        this.role = role;
        this.room = room;
        this.position = position;
        this.colour = colour;

    }
    getName(){
        return this.name;
    }
    getRole(){
        return this.role;
    }
    getRoom(){
        return this.room;
    }
    getPosition(){
        return this.position;
    }
    getColour(){
        return this.colour;
    }
    updatePosition(newP){
        this.position = newP;
    }
}
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
let people = {};

//Object to store each door object
let doors = {};
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
  BROWN: '#964B00'
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
class door{
    constructor(room, position, mode, colour){
        this.height = 6;
        this.width = 30;
        this.room = room;
        this.position = position;
        this.mode = mode;
        this.colour = colour;
    }

    getRoom(){
        return this.room;
    }
    getPosition(){
        return this.position;
    }
    getMode(){
        return this.mode;
    }
    updatePosition(newP){
        this.position = newP;
    }
    toggleMode(){
        this.mode = !(this.mode);
        this.rotate();
        
    }
    rotate(){
        var x = this.height;
        this.height = this.width;
        this.width = x;
    }
    getColour(){
        return this.colour;
    }
    getSize(){
        return [this.width, this.height];
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

    //initializing first floor doors
    let conference = new door(110,[258,160],false, Colours.BROWN);
    conference.rotate();
    let kitchen = new door(130,[258,400],false, Colours.BROWN);
    kitchen.rotate();
    let gym = new door(151,[503,246],false, Colours.BROWN);
    let reception = new door(101,[463,119],false, Colours.BROWN);
    reception.rotate();
    let pool = new door(155,[620,246],false, Colours.BROWN);
    let laundry = new door(156,[636,326],false, Colours.BROWN);
    let storage = new door(1566,[636,388],false, Colours.BROWN);
    let stairwell_1 = new door(150, [680,259], false, Colours.BROWN);
    stairwell_1.rotate();
    
    //initializing second floor doors
    let executive_1 = new door(210,[218,614],false, Colours.BROWN);
    executive_1.rotate();
    let executive_2 = new door(220,[218,674],false, Colours.BROWN);
    executive_2.rotate();
    let comfort_1 = new door(231,[256,591],false, Colours.BROWN);
    let comfort_2 = new door(232,[256,725],false, Colours.BROWN);
    let comfort_3 = new door(233,[344,591],false, Colours.BROWN);
    let comfort_4 = new door(235,[439,591],false, Colours.BROWN);
    let comfort_5 = new door(236,[439,725],false, Colours.BROWN);
    let comfort_6 = new door(241,[534,619],false, Colours.BROWN);
    let comfort_7 = new door(244,[534,697],false, Colours.BROWN);
    let comfort_8 = new door(247,[622,619],false, Colours.BROWN);
    let comfort_9 = new door(248,[622,697],false, Colours.BROWN);
    let stairwell_2 = new door(250, [682,670], false, Colours.BROWN);
    stairwell_2.rotate();

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

    
    doors = [conference, kitchen, gym, reception, pool, laundry, storage, stairwell_1,executive_1,executive_2, comfort_1, comfort_2, comfort_3, comfort_4, comfort_5, comfort_6, comfort_7, comfort_8, comfort_9, stairwell_2];

    visualizationArea.start();
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




function drawDoors(){
    cont = visualizationArea.context;
    cont.fillStyle = '#000000';
    //cont.fillRect(0,0,100,100);
    doors.forEach(element => {
        pos = element.getPosition();
        size = element.getSize();
        cont.fillRect(pos[0], pos[1], size[0], size[1]);
        
    });
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
  drawDoors();

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
