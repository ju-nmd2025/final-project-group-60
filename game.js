import Platform from "./platform";
import Character from "./character";

//Globals
let character;
let platforms = [];


//Setup
function setup() {
  createCanvas(400, 600);

  //platforms check
  platforms.push(new Platform(150, 430, 80, 20, "normal"));
  platforms.push(new Platform(50, 320, 80, 20, "moving"));
  platforms.push(new Platform(260, 250, 80, 20, "breaking"));

  character = new Character (platforms[0].x + platforms[0].w/ 2-25, platforms[0].y-50, 50, 50);

  
}

function draw() {
    background(100, 100, 100);

    character.draw();
    for (let p of platforms) {
      p.update();
      p.draw();
    }
}
