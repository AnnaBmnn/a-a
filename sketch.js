let song;
let fft;
let peakDetect;
let luneBG;
let bg;
let osc;
let isDrawing = false;
let frequencyBgAmbientLight = 220;
let frequencyShader = 15;
let amplitudeShader = 0.5;

const startButton = document.querySelector(".js-start");
startButton.addEventListener("click", function() {
  isDrawing = true;
  startSong();
});

function startSong() {
  song.play();

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();

  // color bg on peak times
  peakDetect.onPeak(() => {
    ambientLight(150, 150, 0);
  }, 0.5);
}

function preload() {
  song = loadSound("assets/son/lune-1.m4a");
  // asteroid = loadModel("assets/obj/asteroid.obj");
  // head = loadModel("assets/obj/head.obj");
  // load the shaders, we will use the same vertex shader and frag shaders for both passes
  camShader = loadShader("assets/shader/vertex.vert", "assets/shader/blur.frag");
  luneBG = loadImage("assets/img/moon.png");
  bg = loadImage("assets/img/asteroidTexture.jpg");
  // font = loadFont("assets/font/MonumentExtended-Regular.otf");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  bgGraphics = createGraphics(windowWidth, windowHeight, WEBGL);
}

function draw() {
  if (isDrawing) {
    background(0);
    var spectrum = fft.analyze();

    peakDetect.update(fft);
    ambientLight(fft.getEnergy(frequencyBgAmbientLight));

    texture(bg);

    plane(width);

    bgGraphics.shader(camShader);
    camShader.setUniform("tex0", luneBG);
    camShader.setUniform("time", frameCount * 0.1);

    //frequencyShader = fft.getEnergy(400) / 10;
    console.log(fft.getEnergy(400));

    camShader.setUniform("frequency", frequencyShader);
    camShader.setUniform("amplitude", amplitudeShader);
    bgGraphics.rect(0, 0, width, height);

    ambientLight(150);
    texture(bgGraphics);
    plane(height * 0.5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
