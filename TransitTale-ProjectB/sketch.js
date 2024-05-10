let customFont;

let isInRoom = false;
let pearl;
let statue;

let sunY = 100; // Initial position of the sun
let sunSpeed = 3; // Speed of the sun movement
let isSunRising = true;
let zoom;

let hasPressedSpace= false;
let airplaneImg;
let clouds = [];
let isGameOver = false;
let hasGameBegun = false;

let minDistanceBetweenClouds;
let nextSpawnDistance;

let mapNYC= true;
let bgNYC;
let liberty;
let boat;

let taxiImg;
let taxi;
let street

let mapSH=true;
let bgSH;
let bundImg;


function preload() {
  pearl = loadImage("pearl.png"); // Load your image here
  statue = loadImage("statue.png");
  airplaneImg = loadImage("airplane.png");
  bgNYC= loadImage ("nycbg.jpg");
  bgSH= loadImage("shbg.jpg")
  boat= loadImage("boat.png")
  taxiImg = loadImage('taxi.png'); 
  street= loadImage("street.webp");
  zoom= loadImage("zoom.jpg")
  bundImg= loadImage("bund.JPEG");
  customFont= loadFont ('antonio/Antonio-Light.ttf')
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("p5-canvas-container");
  textFont(customFont)
  minDistanceBetweenClouds = width / 3;
  resetGame();
  liberty = new Liberty(statue,boat);
  taxi = new Taxi(width / 2, height / 2, taxiImg)
  bund= new Bund(width/2, height/2, bundImg)

}

function draw() {
  background(138, 229, 255);
  if (hasPressedSpace) { // Check if space bar has been pressed
    if (hasGameBegun) {
      drawAirplane();
    } else if (mapNYC){ 
      drawNYC();}
      else if (mapSH){
        drawSH();
      }
      
  } else {
    if (isInRoom) {
      // Draw room environment
      drawRoom();
    } else {
      // Draw character and button
      drawCharacter();
      drawButton();
      drawMaleta1();
    }
  }
  
}

function keyPressed() {
  if (keyCode === 32) { // Check if space bar is pressed
    hasPressedSpace = true;
    if (!hasGameBegun) {
      hasGameBegun = true;
      mapNYC= true;
      airplane = new Airplane(100); 
    }
  }
  if (key === "s" || key ==="S") { 
    if (hasGameBegun && mapNYC) {
     
        mapNYC = false;
    }
}

if (key === "f" || key === "F") {
    if (mapNYC) {
        
        mapNYC=false
        mapSH = true;
    }

}
}

function drawCharacter() {
  fill(141, 85, 36);
  rect(242, 270, 117, 80); // hair
  circle(300, 240, 132); // hair

  // Me
  noStroke();
  fill(255, 219, 172);
  circle(250, 239, 20);
  circle(350, 239, 20);
  circle(300, 240, 100); // face
  rect(296, 280, 10, 25);

  fill(0);
  circle(276, 235, 10); // left eye
  circle(320, 235, 10); // right eye

  arc(300, 260, 30, 30, TWO_PI, PI); // mouth
  fill(255);
  rect(288, 260, 24, 5);
  fill(255, 0, 101);
  rect(276, 300, 55, 50); // torso
}

// Function to draw maleta1
function drawMaleta1() {
  push(); // Save the current drawing state
  translate(400, 300); // Translate to the position of maleta1
  fill(124, 63, 0);
  rect(0, 0, 160, 100); // maleta1
  fill(255, 0, 0);
  rect(30, 0, 10, 100);
  rect(120, 0, 10, 100);
  fill(62, 28, 0);
  rect(120, -50, 10, 50);
  rect(30, -50, 10, 50);
  rect(30, -50, 100, 10);
  let imageSize = 70;
  image(pearl, 52, 10, imageSize / 1.5, imageSize);
  pop(); // Restore the previous drawing state

  push(); // Save the current drawing state
  translate(10, 300); // Translate to the position of maleta1
  fill(124, 63, 0);
  rect(0, 0, 160, 100); // maleta1
  fill(255, 0, 0);
  rect(30, 0, 10, 100);
  rect(120, 0, 10, 100);
  fill(62, 28, 0);
  rect(120, -50, 10, 50);
  rect(30, -50, 10, 50);
  rect(30, -50, 100, 10);
  image(statue, 52, 10, imageSize / 1.5, imageSize);
  pop(); // Restore the previous drawing state
}

// Function to draw the button
function drawButton() {
  fill(100);
  rect(230, 350, 150, 50); // Button position and size
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("CLICK TO START", 305, 375); // Button text
}

// Function to draw the room environment
function drawRoom() {
  // Flag to track if the sun is rising or setting
  if (sunY < height / 2.5) {
    // Sun is rising, set background to light blue
    background(0, 150, 255); // Light blue
  } else {
    // Sun is setting, set background to orange
    background(1, 31, 75);
    fill(253, 238, 152);
    circle(90, 70, 100);
    fill(163, 145, 147);
    circle(100, 60, 10);
    circle(108, 39, 10);
    circle(115, 50, 10);

    let textToDisplay = "It was 2021 when I was admitted to the college of my dreams.\nI was ready to go to the other side of the\.nworld and start exploring the culture, meeting new people, trying new things.\nBut these hopes were all eclipsed by COVID-19, a global pandemic that disrupted life as we knew it.\nIt made my college experience take a 360-degree shift.\nI found myself attending classes remotely, day and night.";
  
    textSize(12);
    textAlign(RIGHT);
    text(textToDisplay, 40, -160, width - 40, height - 40);
   
  }
  // Draw sun
  fill(255, 255, 0); // Yellow
  ellipse(width / 2, sunY, 100, 100); // Position the sun in the center horizontally

  // Move the sun up or down
  if (isSunRising) {
    sunY -= sunSpeed;
  } else {
    sunY += sunSpeed;
  }

  // Check if the sun reaches the top or bottom of the canvas
  if (sunY <= 0) {
    isSunRising = false; // Sun is setting
  } else if (sunY >= height) {
    isSunRising = true; // Sun is rising
  }

  // Draw window
  noStroke();

  // Draw mesa
  fill(99, 50, 0);
  rect(0, 400, 600, 400); // mesa
  // Draw computer
  fill(0)
  rect(150, 200, 300, 200) //compu
  fill(255)
  rect(160, 220, 280, 160)
  image(zoom,160, 220, 280, 160)
  fill(0)
  ellipse(299, 471, 200, 50)
  rect(280, 400, 40, 90)
  fill(255)
  textToDisplay2= "In the future, will technology continue to shift the way people attend classes, \.nfavoring online learning for its convenience? \.nOr will we still appreciate one-on-one interactions?"
  textSize(14);
  textAlign(LEFT);
  text(textToDisplay2, 40, 255, width - 40, height - 40);
}

function mousePressed() {
  // Check if the mouse is over the button
  if (mouseX > 230 && mouseX < 380 && mouseY > 300 && mouseY < 550) {
    isInRoom = true; // Switch to the room environment
  }
}

function drawAirplane() {
  background (128,128,128);
  textAlign(LEFT);
  textSize(12);
  fill(0);
  text("After 1 year, I was able to attend class in person and travel to the city of my dreams, NYC.\n\nInstructions:\n- fligh the plane for a while, and crash it\n- against a cloud when ready for landing.\n\nQuestions:\n- Are there new ways to travel faster?\n- Do many people want to study abroad?\n- How accessible is it?", 20, -120, width - 10, height - 20);
  
  if (hasGameBegun) {
    // Draw airplane
    airplane.update(mouseY); // Update airplane's position with mouseY
    airplane.drawAirplane();

    if (clouds.length <= 0 || width - clouds[clouds.length - 1].x >= nextSpawnDistance) {
      clouds.push(new Cloud());
      nextSpawnDistance = random(minDistanceBetweenClouds, width - width / 5);
    }

    // Loop through all the clouds and update/draw them
    for (let i = clouds.length - 1; i >= 0; i--) {
      clouds[i].update();
      clouds[i].drawClouds();
      
      // Check for collision with airplane
      if (airplane.checkIfHitsCloud(clouds[i])) {
        resetGame();
        break;
      }
    }
  } else {
    // Display instructions
    textAlign(CENTER);
    textSize(24);
    fill(0);
    text("PRESS S TO RESTART", width / 2, height / 2);
  }
}
 
class Airplane {
  constructor(x) {
    this.x = x;
    this.y = height / 2; // Start the airplane at the center of the canvas
    this.size = 50; // Reduced size for better collision detection
  }

  update(mouseY) {
    this.y = mouseY; // Update y-coordinate to follow the mouse
  }

  drawAirplane() {
    // Draw airplane image
    image(airplaneImg, this.x - 25, this.y - 20, 150, 150);
  }

  // Function to check collision with a cloud
  checkIfHitsCloud(cloud) {
    // Simple collision detection
    let distance = dist(this.x, this.y, cloud.x, cloud.y);
    if (distance < (this.size / 2) + (cloud.size / 2)) {
      return true;
    }
    return false;
  }
}

class Cloud {
  constructor() {
    this.x = width;
    this.y = random(height);
    this.speed = random(1, 3);
    this.size = random(50, 80);
  }

  update() {
    this.x -= this.speed;
  }

  drawClouds() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size, this.size * 0.6);
    ellipse(this.x + this.size * 0.4, this.y - this.size * 0.3, this.size * 0.8, this.size * 0.5);
    ellipse(this.x - this.size * 0.3, this.y + this.size * 0.2, this.size * 0.8, this.size * 0.5);
  }
}

function resetGame() {
  // Reset game state
  airplane = null;
  clouds = [];
  isGameOver = false;
  hasGameBegun = false;
  score = 0;
  nextSpawnDistance = 0;
}



class Liberty {
  constructor() {
    // Define initial positions for statue and boats
    this.statueX = 100;
    this.statueY = 180;
    this.statue= statue;
    this.boat1X = 200;
    this.boat1Y = 400;
    this.boat2X = 400;
    this.boat2Y = 450;
    this.boat3X = 500;
    this.boat3Y = 500;
    this.boatSpeed = 2;
    this.boat= boat
    
  }
  update(){

    this.boat1X += this.boatSpeed;
    this.boat2X += this.boatSpeed;
    this.boat3X += this.boatSpeed;

 
    if (this.boat1X > width) {
      this.boat1X = -100;
    }
    if (this.boat2X > width) {
      this.boat2X = -100;
    }
    if (this.boat3X > width) {
      this.boat3X = -100;
    }
  }

  display() {
    // Draw background
    background(135, 206, 250); // Light blue for sky
    fill(255, 215, 0); // Yellow for sand
    rect(0, height * 0.7, width, height); // Sand

    // Draw ocean
    fill(65, 105, 225); // Dark blue for ocean
    rect(0, height * 0.7, width, height * 0.3); // Ocean

    // Draw sun
    fill(255, 255, 0); // Yellow for sun
    ellipse(width * 0.85, height * 0.15, 100, 100); // Sun
    
    image(this.statue, this.statueX, this.statueY, 100, 250); // Statue body
   
    for (let i = 0; i < 3; i++) {
      translate(200 * i, 0); // Translate horizontally to position boats
      image(this.boat, this.boat1X, this.boat1Y, 100, 50); // Boat 1
      image(this.boat, this.boat2X, this.boat2Y, 100, 50); // Boat 2
      image(this.boat, this.boat3X, this.boat3Y, 100, 50); // Boat 3
  }
}
}
class Taxi {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.acceleration = 0.1;
    this.friction = 0.95;
    this.size = 20; // Size of the taxi
    this.maxSpeed = 2; // Maximum speed of the taxi
    this.img = img; // Taxi image
  }

  update() {
    // Update velocity
    this.vx *= this.friction;
    this.vy *= this.friction;
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Handle edges of canvas
    this.edges();
  }

  display() {
    background(street)
    // Draw the taxi image
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size * 2, this.size * 2);
  }

  // Reset taxi position
  reset() {
    this.x = width / 2;
    this.y = height / 2;
  }

  // Handle edges of canvas
  edges() {
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }

  // Apply force to move taxi
  move(direction) {
    switch (direction) {
      case "UP":
        this.vy -= this.acceleration;
        break;
      case "DOWN":
        this.vy += this.acceleration;
        break;
      case "LEFT":
        this.vx -= this.acceleration;
        break;
      case "RIGHT":
        this.vx += this.acceleration;
        break;
    }
  }
}

const regionLiberty = {
  x: 80,
  y: 500,
  width: 100,
  height: 100
}

const regionTaxi = {
  x: 80,
  y: 300,
  width: 100,
  height: 100
}

function drawNYC() {
  background(bgNYC);
  fill(255)
  rect(220,39,350,20)
  fill(0);
  text("PRESS F WHEN YOU ARE READY TO TRAVEL TO SHANGHAI", 220,42)
  text("CLICK HERE", 80, 500);
  text("CLICK HERE",80,300);

  // Draw Liberty only if clicked
 
  if (mousePressed && mouseX > regionLiberty.x && mouseX < regionLiberty.x + regionLiberty.width &&
    mouseY > regionLiberty.y && mouseY < regionLiberty.y + regionLiberty.height) {
    push();
    liberty.update();
    liberty.display();
    pop();
  }

  // Check for taxi region
  if (mousePressed && mouseX > regionTaxi.x && mouseX < regionTaxi.x + regionTaxi.width &&
    mouseY > regionTaxi.y && mouseY < regionTaxi.y + regionTaxi.height) {
    push();
    taxi.update();
    taxi.display();
    pop();
  }

  // Check if arrow keys are pressed and move taxi accordingly
  if (keyIsDown(UP_ARROW)) {
    taxi.move("UP");
  }
  if (keyIsDown(DOWN_ARROW)) {
    taxi.move("DOWN");
  }
  if (keyIsDown(LEFT_ARROW)) {
    taxi.move("LEFT");
  }
  if (keyIsDown(RIGHT_ARROW)) {
    taxi.move("RIGHT");
  }
}

class Bund{
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img; // Taxi image
    this.width = 600; // Target width
    this.height = 600; // Target height
  
  }
  
  display() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

const regionBund= {
  x: 374,
  y: 156,
  width: 100,
  height: 100

}
function drawSH() {
  background(bgSH);
  fill(255)
  textSize(18)
  rect(120,300,300,100);
  fill(0)
  text("This is the first picture I took in Shanghai\n.and my favorite so far",120,350);

  if (mousePressed && mouseX > regionBund.x && mouseX < regionBund.x + regionBund.width &&
    mouseY > regionBund.y && mouseY < regionBund.y + regionBund.height) {
    push();
    bund.display();
    pop();
  }

}
