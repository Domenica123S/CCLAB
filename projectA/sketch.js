let shapeSize = 10;
let shapeX;
let shapeY;
let showNewEnvironment = false;
let clicked = false;
let circley = 800 / 2;
let speedcircle = 3;
let shapeSpeed = 20;
let isCircle = true;
let rocks = [];

function setup() {
  createCanvas(800, 500);
  let cnv= createCanvas (800,500)
  cvn.parent ("p5-canvas-container"
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  shapeX = width / 2;
  shapeY = height / 2;
  generateRocks();
}

function draw() {
  if (!clicked) {
    drawOriginalEnvironment();
    stroke(0);
    fill(255);
    text("Instructions", 200, 300);
    text("-Press arrows left and right/ up and down to move the creature", 250, 325);
    text("-Move the creature around to eat the rocks",250,351)
    text("and get bigger",280,378)
    text("Click the screen to start", width / 2, height / 2);
  
  } else {
    background(0);
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

  // Sun
  noStroke()
  circley += speedcircle;
  if (circley > 400 || circley < 0) {
    speedcircle *= -1;
  }
  fill(255, 255, 0);
  circle(536, circley, 80);

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
  rect(0, 380, 800, 200)
  for (let x = 0; x < width; x += 2) {
    for (let y = 280; y < 380; y += 30) {
      let noiseVal = noise(x * 0.01, y * 0.01, frameCount * 0.06);
      let ocean = map(noiseVal, 0, 1, -10, 10);
      fill(138, 238, 213);
      noStroke();
      ellipse(x, y + ocean, 7, 7);
    }
  }

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
  stroke(0);
  text("HYDROSTONEVORE", 171, 150);
}

function drawNewEnvironment() {
  fill(249, 233, 142);

  rect(0, 0, width, height);

  fill(68, 151, 227)
  rect(400, 0, 800, 500);

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

  // Palm tree leaves
  push();
  translate(100, 128);
  noStroke();
  fill(0, 128, 0);
  for (var i = 0; i < 10; i++) {
    ellipse(0, 30, 20, 60);
    rotate(PI / 5);
  }
  pop();

  push();
  translate(250, 418);
  noStroke();
  fill(0, 128, 0);
  for (var i = 0; i < 10; i++) {
    ellipse(0, 30, 20, 60);
    rotate(PI / 5);
  }
  pop();

  //rocks
  for (let i = 0; i < rocks.length; i++) {
    fill(91, 91, 91);
    ellipse(rocks[i].x, rocks[i].y, rocks[i].size, rocks[i].size);

    
    if (isCircle && dist(shapeX, shapeY, rocks[i].x, rocks[i].y) < shapeSize / 2 + rocks[i].size / 2) {
      rocks.splice(i, 1); 
      shapeSize += 3; 
    }
  }

  
  if (shapeX >= width / 2) {
    isCircle = false;
  } else {
    isCircle = true;
  }

  if (isCircle) {
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
  } else {
    if (keyIsDown(LEFT_ARROW)) {
      shapeX -= shapeSpeed;
    }
    if (keyIsDown(RIGHT_ARROW) && shapeX < width - shapeSize) {
      shapeX += shapeSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
      shapeY -= shapeSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      shapeY += shapeSpeed;
    }
  }

 
  if (isCircle) {
    fill(255, 0, 0);
    ellipse(shapeX, shapeY, shapeSize, shapeSize);
  } else {
    fill(0, 255, 0);
    rect(shapeX - shapeSize / 2, shapeY - shapeSize / 2, shapeSize, shapeSize);
  }

  
  if (frameCount % 250 === 0) {
    generateRocks();
  }
}

function generateRocks() {
 
  for (let i = 0; i < 5; i++) {
    let x = random(0, width / 2);
    let y = random(height);
    let size = random(10, 30);
    rocks.push({ x: x, y: y, size: size });
  }
}

