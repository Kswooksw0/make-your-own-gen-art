class Box {
  constructor(p, x, y, size, increment, stopTimeVar, rotateVal) {
    this.p = p;
    this.angle = 0;
    this.time_gap = 0;
    this.endAngle = this.angle + this.p.TWO_PI;
    this.x = x;
    this.y = y;
    this.size = size;
    this.increment = increment;
    this.endingAngle = this.angle + stopTimeVar;
    this.timer = null;
    this.rotateVal = rotateVal;
  }

  incrementAngle() {
    this.angle += this.increment;
  }

  rotateBox() {
    if (this.angle >= this.p.TWO_PI) {
      if (this.time_gap >= this.endingAngle) {
        this.angle = 0;
        this.time_gap = 0;
      } else {
        this.time_gap += this.increment;
      }
    } else {
      this.incrementAngle();
      this.time_gap += this.increment;
    }
  }

  display() {
    this.p.push();
    this.p.translate(this.x, this.y, 0);
    if (this.rotateVal === "xy") {
      this.p.rotateX(this.angle);
      this.p.rotateY(this.angle);
    } else if (this.rotateVal === "xz") {
      this.p.rotateX(this.angle);
      this.p.rotateZ(this.angle);
    } else if (this.rotateVal === "yz") {
      this.p.rotateY(this.angle);
      this.p.rotateZ(this.angle);
    }
    this.p.box(this.size);
    this.p.pop();
  }
}

export default Box;
