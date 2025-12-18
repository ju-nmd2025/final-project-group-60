export default class Platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;

    this.direction = 1;
    this.speed = 1.5;
    this.broken = false;
  }

  draw() {
    noStroke();

    if (this.type === "normal") fill(100, 220, 100);
    else if (this.type === "moving") fill(100, 150, 230);
    else fill(220, 120, 120);

    rect(this.x, this.y, this.w, this.h, 4);
  }

  update() {
    if (this.type === "moving") {
      this.x += this.speed * this.direction;

      if (this.x < 0 || this.x + this.w > width) {
        this.direction *= -1;
      }
    }

    if (this.type === "breaking" && this.broken) {
      this.y += 4;
    }
  }

  checkCollision(character) {
    if(this.type === "breaking" && this.broken) return false;
    if (character.vy <= 0) return false;

    //horizontal overlap
    if (character.x + character.w < this.x) return false;
    if (character.x > this.x + this.w) return false;

    const prevBottom = (character.y + character.h) - character.vy;

    if (prevBottom <= this.y && character.y + character.h >= this.y) {
      character.y = this.y - character.h;
      return true;
    }

    return false;
    
  }

  onJump() {
    if (this.type === "breaking") {
      this.broken = true;
    }
  }
}
