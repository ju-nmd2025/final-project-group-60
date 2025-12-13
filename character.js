export default function Player() {
  this.x = width / 2 - 20;
  this.y = height - 80;
  this.width = 40;
  this.height = 40;
  this.vy = 0;
  this.gravity = 0.5;
  this.jumpStrength = -12;

  this.update = function () {
    this.vy += this.gravity;
    this.y += this.vy;
  };

  this.jump = function () {
    this.vy = this.jumpStrength;
  };

  // Cat draw
  this.draw = function () {
    push();
    translate(this.x + this.width / 2, this.y + this.height / 2);

    // squish
    let squish = map(this.vy, -15, 10, 0.8, 1.2, true);
    scale(1.05, squish);

    // body
    noStroke();
    fill(250, 250, 255);
    rectMode(CENTER);
    rect(0, 5, this.width * 0.8, this.height * 0.9, 16);

    // ears 
    triangle(-14, -28, -2, -6, -18, -6);
    triangle(14, -28, 2, -6, 18, -6);

    // eyes
    fill(40, 40, 80);
    circle(-6, -5, 6);
    circle(6, -5, 6);

    // mouth
    stroke(40, 40, 80);
    strokeWeight(1.5);
    noFill();
    arc(0, 2, 8, 5, 0, PI);

    pop();
  };
}