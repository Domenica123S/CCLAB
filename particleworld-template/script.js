let NUM_OF_PARTICLES = 100; // Change the number of particles to 100.
let particles = [];

function setup() {
  let canvas = createCanvas(600, 600);
}

function draw() {
  background(135, 206, 235);
  //sun
  fill(241,194,50)
  circle(590,20,160)
  //Cloud
  fill(255)
  circle(400,65,50)
  circle(375,90,50)
  circle(420,90,50)

  // Draw branches
  strokeWeight(30);
  stroke(60, 38, 16);
  line(0, 100, 307, 160);
  strokeWeight(20);
  line(83, 109, 210, 33);
  line(125, 128, 211, 191);
  strokeWeight(15);
  line(122, 78, 91, 34);
  line(160, 73, 230, 88);
  line(155, 57, 149, 10);
  line(181, 177, 169, 204);

  let flowerPositions = [
    { x: 50, y: 120 },
    { x: 200, y: 80 },
    { x: 250, y: 160 },
    { x: 123, y: 139 },
    { x: 157, y: 27 },
    { x: 309, y: 140 },
    { x: 180, y: 200 },
    { x: 95, y: 63 },
    { x: 106, y: 30 }
  ];

  for (let i = 0; i < flowerPositions.length; i++) {
    let pos = flowerPositions[i];
    let flower = new Flower(pos.x, pos.y);
    flower.display();
  }

  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // Add new particles at every frame
  let startX = random(width); // Start particles at random x position
  let startY = random(100, height); // Start particles below the branches
  let newParticle = new Particle(startX, startY);
  particles.push(newParticle);
}

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.petalCount = 8;
    this.petalSize = 10;
    this.petalColor = color(201, 0, 118);
  }

  display() {
    // Draw petals
    fill(this.petalColor);
    noStroke();
    let angleIncrement = TWO_PI / this.petalCount;
    for (let angle = 0; angle < TWO_PI; angle += angleIncrement) {
      let xOffset = cos(angle) * this.petalSize;
      let yOffset = sin(angle) * this.petalSize;
      ellipse(this.x + xOffset, this.y + yOffset, this.petalSize, this.petalSize);
    }

    // Draw flower center
    fill(242, 123, 153);
    ellipse(this.x, this.y, this.petalSize * 0.8, this.petalSize * 0.8);
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 7;
  }

  update() {
    this.y += 2; // Move particles downwards
  }

  display() {
    push();
    translate(this.x, this.y);
    strokeWeight(3);
    circle(0, 0, this.dia);
    pop();
  }
}

