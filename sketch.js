let song;
let fft;
let peakDetect;
let luneBG;
let bg;
let osc;
let isDrawing = false;
let frequencyBgAmbientLight = 220;
let frequencyShader = 20;
let amplitudeShader = 0.5;
let font;
let sizeFont = 100;
const timeStartVoice = 52.8;
const timeEndVoice = 55.5;
const timeStartFlute = 72.1;
const string1 = "I have";
const string2 = "something";
const string3 = "that require your";
const string4 = "attention";
let cameraZ;
let cameraX = 0;
let cameraY = 0;
const startButton = document.querySelector(".js-start");

startButton.addEventListener("click", function() {
  isDrawing = true;
  startSong();
});

function startSong() {
  // song.jump(73);
  song.play();
  bg = loadImage("assets/img/asteroidTexture.jpg");

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();

  // color bg on peak times
  peakDetect.onPeak(() => {
    ambientLight(134, 0, 253);
  }, 0.5);
}

function preload() {
  song = loadSound("assets/son/lune-1.m4a");
  font = loadFont("assets/font/MonumentExtended-Regular.otf");
  // load the shaders, we will use the same vertex shader and frag shaders for both passes
  camShader = loadShader("assets/shader/vertex.vert", "assets/shader/blur.frag");
  luneBG = loadImage("assets/img/moon.png");
  bg = loadImage("assets/img/asteroidTexture.jpg");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  bgGraphics = createGraphics(windowWidth, windowHeight, WEBGL);
  sizeFont = height * 0.25;
  cameraZ = height / 2.0 / tan((PI * 30.0) / 180.0);
}

function draw() {
  if (isDrawing) {
    background(0);

    if (song.currentTime() > timeStartFlute) {
      cameraZ += sin((frameCount - 2) * 0.01) * 1.5 + 0.3;
      cameraY += cos(frameCount * 0.01) * 1.5;
      cameraX += cos(frameCount * 0.01) * 1.5;
    } else {
      cameraX = 0;
      cameraY = 0;
      cameraZ = height / 2.0 / tan((PI * 30.0) / 180.0);
    }

    camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 0.5, 0);
    var spectrum = fft.analyze();

    peakDetect.update(fft);
    ambientLight(fft.getEnergy(frequencyBgAmbientLight) * 0.8 - 60);

    bgGraphics.shader(camShader);
    camShader.setUniform("tex0", luneBG);
    camShader.setUniform("time", frameCount * 0.1);

    amplitudeShader = fft.getEnergy(600) / 600;

    camShader.setUniform("frequency", frequencyShader);
    camShader.setUniform("amplitude", amplitudeShader);
    bgGraphics.rect(0, 0, width, height);

    if (song.currentTime() > timeStartVoice && song.currentTime() < timeEndVoice) {
      addText();
    } else {
      texture(bg);
      plane(width);
    }

    ambientLight(150);

    texture(bgGraphics);
    if (song.currentTime() > timeEndVoice) {
      addSquare(fft);
    }

    texture(bgGraphics);
    plane(height * 0.5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function addSquare(fft) {
  heightPlane = (fft.getEnergy(1000) / 120) * (height * 0.35) + height * 0.54;
  plane(heightPlane);
}

function addText() {
  fill("#FFF");
  textFont(font, sizeFont);
  text(string1, -width * 0.5, -height * 0.5 + sizeFont - 20);
  text(string2, -width * 0.5, -height * 0.5 + (sizeFont - 20) * 2);
  text(string3, -width * 0.5, -height * 0.5 + (sizeFont - 20) * 3);
  text(string4, -width * 0.5, -height * 0.5 + (sizeFont - 20) * 4);
}
