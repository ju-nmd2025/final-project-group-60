export default class Character {
	constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;


    // physics
    this.vy = 0;
    this.gravity = 0.5;
    this.jumpStrength = -12;
  }


  update() {
    this.vy += this.gravity;
    this.y += this.vy;
  }


  jump() {
    this.vy = this.jumpStrength;
  }


 draw() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);


    // squash/stretch
    let squish = map(this.vy, -15, 10, 0.8, 1.2, true);
    scale(1.05, squish);


    // body
    noStroke();
    fill(250, 250, 255);
    rectMode(CENTER);
    rect(0, 5, this.w * 0.8, this.h * 0.9, 16);


    // ears (bigger)
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
  }
}