let font,
  sizeFont = 120;
let imgGradient, mars;
let string = "mars";
let coordImg = { x: 0, y: 0 };

function preload() {
  font = loadFont("assets/font/Monarch.otf");
  imgGradient = loadImage("assets/img/ellipse.png");
  mars = loadImage(
    "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG"
  );
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);

  setUpText();
}

function draw() {
  background(20);
  // orbitControl();

  push();
  translate(coordImg.x, coordImg.y, -10);
  texture(mars);
  plane(300);
  pop();

  for (let i = -3; i < 4; i++) {
    for (let j = -1; j < 2; j++) {
      addText(j * 350, i * 100 * Math.abs(cos(frameCount * 0.001)));
    }
  }
  push();
  translate(cos(frameCount * 0.01) * 100, sin(frameCount * 0.02) * 50, 300);
  texture(imgGradient);
  plane(150);
  pop();

  if (frameCount % 10 === 0) {
    coordImg.x = random(-width * 0.5, width * 0.5);
    coordImg.y = random(-height * 0.5, height * 0.5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function addText(x, y) {
  text(string, x, y);
}

function setUpText() {
  fill("#FFF");
  textFont(font, sizeFont);
  textAlign(CENTER, CENTER);
}
