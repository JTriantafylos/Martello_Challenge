const RED = '#ff2915';
const BLUE = '#2925ff';
const YELLOW = '#ffd000';
const GREEN = '#14ab03';
const VIOLET = '#7f25b0';
const ORANGE = '#e38f28';
const BLACK = '#000000';
const GRAY = '#707070';
const PINK = '#f280e3';
const BROWN = '#964B00';

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

let people;
let doors;

function startVisualizer() {
    //initializing guests
    let veronica = new person('Veronica', 'guest', 210, [0,0], RED);
    let jason = new person('Jason', 'guest', 241, [0,0], BLUE);
    let thomas = new person('Thomas', 'guest', 248, [0,0], ORANGE);
    let rob = new person('Rob', 'guest', 231, [0,0], YELLOW);
    let kristina = new person('Kristina', 'guest', 235, [0,0], BLACK);

    //initializing staff
    let marc = new person('Marc-Andre', 'cleaning', 0, [0,0], VIOLET);
    let dave = new person('Dave', 'cooking', 0, [0,0], PINK);
    let salina = new person('Salina', 'reception', 0, [0,0], GRAY);
    let harrison = new person('Harrison', 'reception late-night', 0, [0,0], GREEN);

    //initializing first floor doors
    let conference = new door(110,[258,160],false, BROWN);
    conference.rotate();
    let kitchen = new door(130,[258,400],false, BROWN);
    kitchen.rotate();
    let gym = new door(151,[503,246],false, BROWN);
    let reception = new door(101,[463,119],false, BROWN);
    reception.rotate();
    let pool = new door(155,[620,246],false, BROWN);
    let laundry = new door(156,[636,326],false, BROWN);
    let storage = new door(1566,[636,388],false, BROWN);
    let stairwell_1 = new door(150, [680,259], false, BROWN);
    stairwell_1.rotate();
    
    //initializing second floor doors
    let executive_1 = new door(210,[218,614],false, BROWN);
    executive_1.rotate();
    let executive_2 = new door(220,[218,674],false, BROWN);
    executive_2.rotate();
    let comfort_1 = new door(231,[256,591],false, BROWN);
    let comfort_2 = new door(232,[256,725],false, BROWN);
    let comfort_3 = new door(233,[344,591],false, BROWN);
    let comfort_4 = new door(235,[439,591],false, BROWN);
    let comfort_5 = new door(236,[439,725],false, BROWN);
    let comfort_6 = new door(241,[534,619],false, BROWN);
    let comfort_7 = new door(244,[534,697],false, BROWN);
    let comfort_8 = new door(247,[622,619],false, BROWN);
    let comfort_9 = new door(248,[622,697],false, BROWN);
    let stairwell_2 = new door(250, [682,670], false, BROWN);
    stairwell_2.rotate();


    people = [veronica, jason, thomas, rob, kristina, marc, dave, salina, harrison];
    doors = [conference, kitchen, gym, reception, pool, laundry, storage, stairwell_1,executive_1,executive_2, comfort_1, comfort_2, comfort_3, comfort_4, comfort_5, comfort_6, comfort_7, comfort_8, comfort_9, stairwell_2];

    simulationArea.start();
}

var simulationArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 785;
        this.canvas.height = 857;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateSimulation, 20);
        
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

function updateSimulation() {
    
    simulationArea.clear();
    simulationArea.frameNo += 1;
    drawDoors();
    
    
}

function drawDoors(ctx){
    cont = simulationArea.context;
    cont.fillStyle = '#000000';
    //cont.fillRect(0,0,100,100);
    doors.forEach(element => {
        pos = element.getPosition();
        size = element.getSize();
        cont.fillRect(pos[0], pos[1], size[0], size[1]);
        
    });
    // ;
        
        
    // ctx.fillStyle = color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
}


