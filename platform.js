export default class Platform {
    constructor(x, y, w, h, type = "normal") {
        this.x= x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type= type;
    }

    draw() {
        noStroke();

        if(this.type === "normal") fill(100, 220, 100);
        else if (this.type === "moving") fill (100, 150, 230);
        else fill(220, 120, 120);

        rect(this.x, this.y, this.w, this.h, 4);
    }

}