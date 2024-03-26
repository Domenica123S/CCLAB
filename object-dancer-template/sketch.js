let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new DomeDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); 

  dancer.update();
  dancer.display();
}

class DomeDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.armLength = 50;
    this.armSpeed = 0.05;
    this.angle = 0;
    this.noisesetX= random(1000);
    this.noisesetY= random(1000);
  }

  update() {
    // Update arm angle
    this.angle += this.armSpeed;

    //upadate noise 
    let noiseX = noise(this.noisesetX);
    let noiseY = noise(this.noisesetY);
    this.x = map(noiseX, 0, 1, width * 0.4, width * 0.6);
    this.y = map(noiseY, 0, 1, height * 0.4, height * 0.6);
    this.noisesetX += 0.02;
    this.noisesetY += 0.02;

  }

  display() {
    push();
    translate(this.x, this.y);

    // Draw body
    let numOfEllipses = 8;
    let baseEllipseWidth = 100;
    let baseEllipseHeight = 20;
    let ellipseWidthStep = (100 - baseEllipseWidth) / numOfEllipses;
    let ellipseHeightStep = (30 - baseEllipseHeight) / numOfEllipses;
    let spacing = -10;
    let startY = 0;

    for (let i = 0; i < numOfEllipses; i++) {
      let currentY = startY + (i * (baseEllipseHeight + spacing));
      let currentWidth = 100 - i * ellipseWidthStep;
      let currentHeight = 30 - i * ellipseHeightStep;
      noStroke();
      fill(127, 247, 8);
      ellipse(0, -20, 80, 50);
      ellipse(0, currentY, currentWidth, currentHeight);
    }

    // eyes
    fill(255);
    ellipse(20, -20, 20, 10);
    ellipse(-20, -20, 20, 10);

    // pupils
    fill(0);
    ellipse(20, -20, 10, 5);
    ellipse(-20, -20, 10, 5);

    // mouth
    stroke(0);
    arc(0, -10, 30, 30, TWO_PI, PI);
    noStroke();
    fill(255);
    rect(-10,-10,5,5);
    
    //necklace
    stroke(222,194,47);
    strokeWeight(5);
    line(-40,-10,-5,25);
    line(40,-10,-5,25)

    // arms
    this.drawArm(-40, 20, -1);
    this.drawArm(40, 20, 1);

    //cap
    stroke(0);
    strokeWeight(5);
    fill(255,0,0);
    ellipse(0,-40,70,30);


    pop();
  }

  drawArm(x, y, direction) {
    let armAngle = sin(this.angle) * 0.3 + 0.5;
    let armX = x + cos(TWO_PI * armAngle) * this.armLength * direction;
    let armY = y + sin(TWO_PI * armAngle) * this.armLength;

    stroke(105,210,0);
    strokeWeight(10);
    line(x, y, armX, armY);
  }
}


  drawReferenceShapes() ; {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }



