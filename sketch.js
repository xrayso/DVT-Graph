let dispTime;
let velTime;
let accTime;
let tractor;
let velSlider;
let accSlider;
let start;
let updateButton;
let restartButton;
let stars = []
let pause = false;
let rocketImg;
let frozenRocketImg;

const frameR = 60;

function preload(){
  
  rocketImg = loadImage("rocket.png");
  frozenRocketImg = loadImage("rocketNotMoving.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  dispTime = new Graph(55, 30, 200, 360, 5, 100, "Displacement (m)");
  velTime = new Graph(300, 30, 200, 360, 5, 5, "Velocity (m/s)");
  accTime = new Graph(550, 30, 200, 360, 5, 1, "Acceleration (cm/s^2)");
  
  
  tractor = new Particle(width/2, height-150, 20, [0, 0, 255], undefined, rocketImg, frozenRocketImg);
  tractor.relativeTo = tractor;
  
  velSlider = new SketchSlider(0, height-15, -100, 100);
  accSlider = new SketchSlider(120, height-15, -5, 5);
  
  let updateVelocityButton = createButton('Update Velocity');
  updateVelocityButton.position(0, height-75);
  updateVelocityButton.mousePressed(updateVelocity);
  
  let updateAccelerationButton = createButton('Update Acceleration');
  updateAccelerationButton.position(108, height-75);
  updateAccelerationButton.mousePressed(updateAcceleration);
  
  let updateButton = createButton('Update Both');
  updateButton.position(0, height-55);
  updateButton.mousePressed(updateBoth);
  
  let restartButton = createButton('Reset');
  restartButton.position(90, height-55);
  restartButton.mousePressed(reset);
  
  let pauseButton = createButton('Toggle Pause');
  pauseButton.position(140, height-55);
  pauseButton.mousePressed(togglePause);
  
  for (let i = 0; i < 200; i++){
    stars.push(new Particle(random(width), random(height), 5, [100, 255, 62], tractor));
  }
  frameRate(frameR);
}

function draw() {
  
  background(0);
  fill(200)
  noStroke();
  textAlign(LEFT);
  text("Josh Ossip", 2, 15);
  
  if (!pause){
    tractor.update();
    
  }
  noStroke();
  for (let star of stars){
    star.show();
    if (!pause){
      star.update();
    }
  }
  velSlider.update();
  velSlider.show();
  
  accSlider.update();
  accSlider.show();
  
  tractor.show();
  
  textAlign(LEFT);
  fill(255, 150, 0);
  
  textSize(16)
  noStroke();
  text("Velocity(m/s): "+ velSlider.value + " Acceleration (cm/s^2): " + accSlider.value , 0, height-20)
  

  
  dispTime.adjustScale();
  dispTime.show();
  
  velTime.show();
  velTime.adjustScale();
  
  accTime.show();
  accTime.adjustScale();
  
  if (pause){
    frameCount--;
    return;
  }
  
  if (frameCount % 10 == 0 && start){
    dispTime.points.push(createVector(frameCount/60, tractor.displacement.x));
    velTime.points.push(createVector(frameCount/60, tractor.vel.x * frameR/100));
    accTime.points.push(createVector(frameCount/60, tractor.acc.x * frameR));
  }
}
function updateVelocity(){
  if (! start) frameCount = 0;
  start = true;
  
  let velPerSecond = velSlider.value;
  let velPerFrame = velPerSecond / frameR;
  
  tractor.vel.x = velPerFrame;

}
function updateAcceleration(){
  if (! start) frameCount = 0;
  start = true;
  
  let accPerSecond = accSlider.value;
  let accPerFrame = accPerSecond / frameR;
  
  tractor.acc.x = accPerFrame;
}

function updateBoth(){
  updateVelocity();
  updateAcceleration();
}

function reset(){
  dispTime.points = [];
  dispTime.scaleX = 5;
  dispTime.scaleY = 100;
  
  velTime.points = [];
  velTime.scaleX = 5;
  velTime.scaleY = 5;
  
  accTime.points = [];
  accTime.scaleX = 5;
  accTime.scaleY = 0.1;
  
  velSlider.value = 0;
  accSlider.value = 0;
  
  for (let star of stars){
    star.pos.x = random(width);
    star.pos.y = random(height);
  }
  
  tractor.reset();
  start = false;
  frameCount = 0;
}

function togglePause(){
  pause = !pause;
}