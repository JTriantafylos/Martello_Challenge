var myGamePiece;
const RED = '#ff2915';
const BLUE = '#2925ff';
const YELLOW = '#ffd000';
const GREEN = '#14ab03';
const VIOLET = '#7f25b0';
const ORANGE = '#e38f28';
const BLACK = '#000000';
const GRAY = '#707070';
const PINK = '#f280e3';

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

let people;


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

    people = [veronica, jason, thomas, rob, kristina, marc, dave, salina, harrison];


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
    
    
    
}



