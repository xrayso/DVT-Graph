
class Particle{
  constructor(x, y, r, colour, relativeTo, img, frozenImg){
    this.startPos = createVector(x, y);
    this.pos = createVector(x, y);
    this.displacement = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.sw = random(5);
    this.colour = colour
    this.relativeTo = relativeTo;
    this.img = img;
    this.frozenImg = frozenImg;
  }
  update(){
    this.vel.add(this.acc);
    this.displacement.add(this.vel);
    this.pos.add(p5.Vector.sub(this.vel, this.relativeTo.vel));
    if (this.pos.x > width+this.r)
      this.pos.x = -this.r-abs(random(this.relativeTo.vel.x))
    else if (this.pos.x < -this.r)
      this.pos.x = width+this.r+abs(random(this.relativeTo.vel.x))
    
    

  }
  show(){
    push();
    fill(this.colour[0], this.colour[1], this.colour[2]);
    translate(this.pos.x, this.pos.y);
    if (this.img){
      let x = -20;
      let scaleX = 1;
      if (this.vel.x < 0) {
        scaleX = -1;
        x=-150;
      }
      scale(scaleX, 1);
      if (this.vel.x == 0){
        image(this.frozenImg, x, 0, 200, 200);
      }else{
        image(this.img, x, 0, 200, 200);
      }
      
    

    }else{
      strokeWeight(this.sw);
      stroke(0, 255, 0);
      point(0, 0);
    }
    pop();
  }
  reset(){
    this.pos = createVector(this.startPos.x, this.startPos.y);
    this.displacement.mult(0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }
}