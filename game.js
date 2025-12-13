import Platform from "./platform";
import { Character } from "./character";

//Globals
let character;


//Setup
function setup() {
  createCanvas(400, 600);

  character = new Character (50, 50, 50, 50);
  platform = new Platform(250, 230, 80, 20, "normal");
}

function draw() {
    background(100, 100, 100);

    character.draw();
    platform.draw();
}
