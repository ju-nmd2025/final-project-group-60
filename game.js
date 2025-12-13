import Platform from "./platform";
import Character from "./character";

//Globals
let character;
let platforms = [];
let stars = [];

// Grass
let floorHeight = 140;
let floorY;
let grassLines = [];
let sprouts = [];

//Setup
function setup() {
  createCanvas(400, 600);

    // stars
  stars = [];
  for (let i = 0; i < 40; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      r: random(1, 3),
      speed: random(0.1, 0.4)
    });
  }

    //grass
  generateFloorArt();


  //platforms check
  platforms.push(new Platform(150, 430, 80, 20, "normal"));
  platforms.push(new Platform(50, 320, 80, 20, "moving"));
  platforms.push(new Platform(260, 250, 80, 20, "breaking"));

  character = new Character(
    width / 2 - 25, 
    floorY - 50,    
    50,
    50
  );
}

function draw() {
    drawBackground();
    drawFloor();
    handleInput();
    character.update();
    for (let p of platforms) {
      p.update();
      p.draw();
    
      //collision test
      if (p.checkCollision(character)) {
        p.onJump();
        character.jump();
      }
    }

    //ground limit
    if (character.y + character.h > floorY) {
      character.y = floorY - character.h;
      character.vy = 0;
    }

    character.draw();
}
function handleInput() {
  let speed = 5;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A
    character.x -= speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D
    character.x += speed;
  }
}  


// Background (gradient + stars)
function drawBackground() {
  for (let y = 0; y < height; y++) {
    stroke(
      lerp(30, 5, y / height),
      lerp(10, 15, y / height),
      lerp(60, 25, y / height)
    );
    line(0, y, width, y);
  }

  noStroke();
  fill(255, 240);
  for (let s of stars) {
    circle(s.x, s.y, s.r);
    s.y += s.speed;
    if (s.y > height) {
      s.y = 0;
      s.x = random(width);
    }
  }
}

// Grass/floor
function generateFloorArt() {
  floorY = height - floorHeight;

  grassLines = [];
  for (let x = 0; x < width; x += 6) {
    grassLines.push({ x: x, h: random(4, 10) });
  }

  sprouts = [];
  for (let i = 0; i < 25; i++) {
    sprouts.push({
      x: random(width),
      y: floorY + random(15, floorHeight - 10),
      h1: random(8, 16),
      h2: random(6, 12)
    });
  }
}

function drawFloor() {
  noStroke();
  fill(90, 180, 90);
  rect(0, floorY, width, floorHeight);

  fill(70, 150, 70);
  rect(0, floorY, width, 14);

  stroke(60, 130, 60, 120);
  for (let g of grassLines) {
    line(g.x, floorY, g.x, floorY + g.h);
  }

  stroke(50, 120, 50);
  strokeWeight(1.2);
  for (let s of sprouts) {
    line(s.x, s.y, s.x - 3, s.y - s.h1);
    line(s.x, s.y, s.x + 3, s.y - s.h2);
  }
  strokeWeight(1);
}

//jump test
function keyPressed() {
  if (key === " ") {
    character.jump(); 
  }
}
