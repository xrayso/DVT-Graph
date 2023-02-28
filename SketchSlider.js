class SketchSlider{
  
  
  constructor(x, y, min, max){
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 8;
    this.min = min;
    this.max = max;
    this.value = 0;
    this.isClicked = false;
  }
  show(){
    noStroke();
    fill(140);
    rect(this.x, this.y, this.w, this.h);
    let mapX = map(this.value, this.min, this.max, this.x, this.x+this.w);
    fill(0, 200, 255);
    rect(this.x, this.y, mapX-this.x, this.h);
    fill(255, 0, 0);
    circle(mapX, this.y+this.h/2, 10);
    
  }
  update(){
    if (mouseIsPressed){
      if (mouseX <= this.x+this.w && mouseX >= this.x || this.isClicked){
        if (mouseY <= this.y+this.h && mouseY >= this.y || this.isClicked){
          this.isClicked = true;
          this.value = round(map(constrain(mouseX, this.x, this.x+this.w), this.x, this.x+this.w, this.min, this.max), 2);
        }
      }
    }
    if (this.isClicked && !mouseIsPressed){
      this.isClicked = false;
    }
  }
  
}
