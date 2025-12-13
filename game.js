import platform from "platform";
import { Character } from "./character";


//Setup
function setup() {
  createCanvas(400, 600);
}

function draw() {
    background(100, 100, 100);


    Character.draw();
    platform.draw();
}
