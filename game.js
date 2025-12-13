import Platform from "./platform";
import Character from "./character";

//Globals
let character;
let platforms = [];
let stars = [];
let scrollLine = 200;
//3 lanes
let lanes = [30, 160, 280];
let lastLane = -1;
let lastScoredPlatform = null;

// Grass
let floorHeight = 140;
let floorY;
let grassLines = [];
let sprouts = [];

// Game state
let gameStarted = false;
let gameOver = false;
let score = 0;

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
  platforms = [];
  createPlatforms(10);

  character = new Character(
    width / 2 - 25, 
    floorY - 50,    
    50,
    50
  );
}

function draw() {
   // start screen
  if (!gameStarted && !gameOver) {
    background(255);
    drawStartScreen();
    return;
  }
   // game over screen
  if (gameOver) {
    background(255);
     drawGameOverScreen();
    return;
  }
  //main game
    drawBackground();
    drawFloor();

    handleInput();
    character.update();

    //camera scroll
    if (character.y < scrollLine) {
      let dy = scrollLine - character.y; //how much to scroll down

      character.y = scrollLine; //keep cat at scroll line

      //move platforms down
      for (let p of platforms) {
        p.y += dy;
      }

      //move stars down
      for (let s of stars) {
        s.y +=dy;
      }

      //floor and sprouts too
      floorY += dy;
      for (let s of sprouts) {
        s.y += dy;
      }
      
    }

    for (let p of platforms) {
      p.update();

      if (p.y > height) {
        let gap = 70;
        let highestY = getHighestPlatformY();

        p.y = highestY - gap;
        p.x = pickLaneX(p.w);
        p.type = pickPlatformType();
        p.broken = false;
        p.h = 20;
      }

      p.draw();
    
      //collision test
      if (p.checkCollision(character)) {
        if (lastScoredPlatform !== p) {
          score += 1;
          lastScoredPlatform = p;
        }
        p.onJump();
        character.jump();
      }
    }

    //ground limit
    if (character.y > height) {
  gameOver = true;
}
 

    character.draw();
    
  // draw score
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Score: " + int(score), 10, 10);
}
function handleInput() {
  let speed = 5;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A
    character.x -= speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D
    character.x += speed;
  }

  // horizontal screen wrapping
  if (character.x > width) {
    character.x = -character.w;
  }
  if (character.x + character.w < 0) {
    character.x = width;
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
//start and end screens
function drawStartScreen() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Doodle Jump", width / 2, height / 2 - 40);
  textSize(18);
  text("Press SPACE to start", width / 2, height / 2);
  text("Use ← → or A/D to move", width / 2, height / 2 + 30);
}

function drawGameOverScreen() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(18);
  text("Score: " + int(score), width / 2, height / 2);
  text("Press SPACE to restart", width / 2, height / 2 + 30);
}

//platform creation
function createPlatforms(count) {
  let gap = 70; 

  for (let i = 0; i < count; i++) {
    let y = floorY - 80 - i*gap; //stacks upward from floor
    let type = pickPlatformType();
    let x = pickLaneX(80);
    platforms.push(new Platform(x, y, 80, 20, type));
  }
}

//platform simulator
function pickPlatformType() {
  let r = random(1);
  if (r<0.45) return "normal";
  if (r<0.75) return "moving";
  return "breaking";
}

//pick lanes
function pickLaneX(w) {
  let lane = int(random(lanes.length));
  if (lane === lastLane) lane = (lane + 1) % lanes.length;
  lastLane = lane;

  //center platforms inside canvas
  let x = lanes[lane];
  x = constrain(x, 20, width - w- 20);
  return x;
}

//remove repeating x platforms
function getHighestPlatformY() {
  let highest = platforms[0].y;
  for (let p of platforms) {
    if (p.y < highest) highest = p.y;
  }
  return highest;
}


//jump test
function keyPressed() {
  if (key === " ") {
    // start game
    if (!gameStarted && !gameOver) {
      gameStarted = true;
      score = 0;
      character.jump(); // first jump from ground
    }
    // restart after game over
    else if (gameOver) {
      gameOver = false;
      gameStarted = false;
      score = 0;

      // reset player to initial position
      character.x = width / 2 - 25;
      character.y = floorY - 50;
      character.vy = 0;

      platforms = [];
      createPlatforms(10);
    }
  }
}
