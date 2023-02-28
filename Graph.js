class Graph{
  constructor(x, y, w, h, sX, sY, title){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.points = [];
    this.scaleX = sX;
    this.scaleY = sY;
    this.offSetX = 40;
    this.offSetY = 20;
    this.title = title;
  }
  show(){
    textAlign(CENTER);
    textSize(15);
    noStroke();
    fill(255, 0, 0);
    stroke(255);
    text(this.title, this.x+90, this.y-10)
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    stroke(0);
    let xValue = 0;
    fill(0, 200, 255)
    for (let i = this.x; i <= this.x+this.width; i+=this.offSetX){
      line(i, this.y, i, this.y+this.height);
      text(xValue, i, this.y+this.height+30);
      xValue+=this.scaleX;
    }
    textAlign(RIGHT)
    let yValue = this.scaleY*this.height/(this.offSetY*2);
    for (let j = this.y; j <= this.y+this.height; j+=this.offSetY){
      let roundValue = isNaN(round(yValue, 2))  ? 0 : round(yValue, 1);
      if (roundValue == 0){
        stroke(0, 0, 255);
        strokeWeight(2);
        line(this.x+1, j, this.x+this.width-1, j);
        stroke(0);
        strokeWeight(1);
      }else{
        line(this.x, j, this.x+this.width, j);
      }
      text(roundValue, this.x-1, j+10);
      
      yValue-=this.scaleY
    }
    this.plotPoints();
  }
  plotPoints(){
    stroke(255, 0, 0)
    beginShape();
    for (let plot of this.points){
      fill(255, 0, 0)
      const x = this.x+plot.x*this.offSetX/this.scaleX;
      const y = this.y+(this.height/2)-plot.y*this.offSetY/this.scaleY;
      circle(x, y, 2.5);
      noFill();
      vertex(x, y);
    }
    endShape();
  }
  adjustScale(){
    let maxPlottedX = 0;
    let maxPlottedY = 0;
    for (let plot of this.points){
      maxPlottedX = max(maxPlottedX, plot.x);
      maxPlottedY = max(maxPlottedY, abs(plot.y));
    }
    let maxX = (this.width/this.offSetX) * this.scaleX;
    let maxY = ((this.height/2)/this.offSetY) * this.scaleY
    if (maxPlottedX > maxX)
      this.scaleX*=2
    if (maxPlottedY > maxY)
      this.scaleY*=2
  }
}