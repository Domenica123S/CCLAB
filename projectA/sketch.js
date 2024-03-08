let shapeSize = 50;
let shapeX;
let shapeY;
let showNewEnvironment = false;
let clicked = false; 
let shapeSpeed = 20;
let isCircle = true; 




function setup() {
  let cnv= createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  noStroke();
  //leon added a comment
  let leon = "free";
  shapeX = width / 2; 
  shapeY = height / 2; 
}

function draw() {
  if (!clicked) {
    
    drawOriginalEnvironment();
    
    fill(255);
    text("Click the screen to start", width / 2, height / 2);
  } else {
    
    if (showNewEnvironment) {
      drawNewEnvironment();
    } else {
      drawOriginalEnvironment();
    }
  }
}

function mouseClicked() {
  clicked = true;
  showNewEnvironment = !showNewEnvironment;
}

function drawOriginalEnvironment() {
  // Clear canvas
  background(142, 228, 240);
  

  // Island
  fill(249, 233, 142);
  circle(width / 2, 320, 250);
  // Palm tree
  fill(222, 184, 135);
  rect(328, 150, 12, 80);
  fill(249, 233, 142);
  circle(335, 230, 20);
  // Sea
  fill(68, 151, 227);
  rect(0, 280, 800, 100);
  fill(68, 151, 227);
  rect(0, 380, 800, 200);
  // Sun
  fill(255, 255, 0);
  circle(536, 44, 80);
  // Palm tree leaves
  push();
  translate(333, 128);
  noStroke();
  fill(0, 128, 0);
  for (var i = 0; i < 10; i++) {
    ellipse(0, 30, 20, 60);
    rotate(PI / 5);
  }
  pop();

  // Text
  fill(255);
  text("THE", 72, 109);
  text("ISLAND", 113, 130);
  text("CREATURE", 171, 150);
}

function drawNewEnvironment() {
  
  background(0);
  
  
  fill(255, 255, 0);
  rect(0, 0, width, height);

 
  for (let i = 0; i < 20000; i++) {
    let x = random(0, width / 2);
    let y = random(height);
    fill(255, 255, 0); 
    noStroke();
    ellipse(x, y, 2, 3);
  }

  for (let x = width / 2; x < width; x += 5) {
    for (let y = 0; y < height; y += 10) {
      let ocean = 10 * sin(0.01 * y + x * 0.05);
      fill(138, 238, 213);
      noStroke();
      ellipse(x, y + ocean, 7, 7);
    }
  }

  
  if (keyIsDown(LEFT_ARROW)) {
    shapeX -= shapeSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    shapeX += shapeSpeed;
  }
  if (keyIsDown(UP_ARROW)) {
    shapeY -= shapeSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    shapeY += shapeSpeed;
  }

  
  if (shapeX >= width / 2) {
    
    isCircle = false;
  } else {
    isCircle = true;
  }
  if (isCircle) {
    fill(255, 0, 0); 
    ellipse(shapeX, shapeY, shapeSize, shapeSize);
  } else {
    fill(0, 255, 0); 
    rect(shapeX - shapeSize / 2, shapeY - shapeSize / 2, shapeSize, shapeSize); 
  }
}

