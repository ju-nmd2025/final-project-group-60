import Platform from "./platform";
import Character from "./character";

//Globals
let character;
let platforms = [];
let stars = [];


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


  //platforms check
  platforms.push(new Platform(150, 430, 80, 20, "normal"));
  platforms.push(new Platform(50, 320, 80, 20, "moving"));
  platforms.push(new Platform(260, 250, 80, 20, "breaking"));

  character = new Character (platforms[0].x + platforms[0].w/ 2-25, platforms[0].y-50, 50, 50);

  
}

function draw() {
    drawBackground();

    character.draw();
    for (let p of platforms) {
      p.update();
      p.draw();
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
