let song;
let fft;
let peakDetect;
let luneBG;
let naked;

// // the shader variable
// let camShader;

// // the camera variable
// let cam;

// // we will need at least two layers for this effect
// let shaderLayer;
// let pupImg;

// how many past frames should we store at once
// the more you store, the further back in time you can go
// however it's pretty memory intensive so don't push it too hard
// let numLayers = 90;
// let index = 0;

// an array where we will store the past camera frames
// let layers = [];

// three indices representing a given momeny in time
// index1 is current
// index2 is 30 frames behind
// index3 is 60 frames behind
// let index1 = 0;
// let index2 = numLayers / 3; // 30
// let index3 = (numLayers / 3) * 2; // 60

function preload() {
  song = loadSound("assets/son/lune-1.m4a");
  // asteroid = loadModel("assets/obj/asteroid.obj");
  // head = loadModel("assets/obj/head.obj");
  // load the shaders, we will use the same vertex shader and frag shaders for both passes
  camShader = loadShader("assets/shader/vertex.vert", "assets/shader/blur.frag");
  luneBG = loadImage("assets/img/moon.png");
  naked = loadImage("assets/img/seins.png");
  // font = loadFont("assets/font/MonumentExtended-Regular.otf");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  nakedGraphics = createGraphics(windowWidth, windowHeight, WEBGL);

  song.play();
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();

  peakDetect.onPeak(() => {
    ambientLight(150);

    console.log("oui");

    // texture(nakedGraphics, width * 2, height * 2);
    // plane(width * 0.5, height * 0.5);
  }, 0.5);
  // shaderLayer = createGraphics(width, height, WEBGL);
  // shaderLayer.noStroke();
  // textSrc = createGraphics(width * 2, height * 2);
  // // initialize the webcam at the window size
  // cam = createCapture(VIDEO);
  // cam.size(windowWidth, windowHeight);
  // // hide the html element that createCapture adds to the screen
  // cam.hide();
}

function draw() {
  fft.analyze();
  peakDetect.update(fft);
  ambientLight(0);
  texture(naked);
  plane(width);
  nakedGraphics.shader(camShader);
  camShader.setUniform("tex0", luneBG);
  camShader.setUniform("time", frameCount * 0.1);
  let freq = 15;
  let amp = 0.25;
  camShader.setUniform("frequency", freq);
  camShader.setUniform("amplitude", amp);
  nakedGraphics.rect(0, 0, width, height);

  // nakedGraphics.texture(luneBG);
  // nakedGraphics.plane(width);
  ambientLight(150);
  texture(nakedGraphics);
  plane(height * 0.5);
  //
  // pointLight(255, 255, 255, 00, 50, 100);
  // background(255);
  // textSrc.background(0);
  // textSrc.textSize(2500);
  // textSrc.textFont(font);
  // textSrc.fill(255);
  // textSrc.text(text, -0.5 * width, 2 * height);
  // shader() sets the active shader with our shader
  // lets just send the cam to our shader as a uniform
  // camShader.setUniform("tex0", textSrc);
  // camShader.setUniform("tex0", textSrc);
  // send a slow frameCount to the shader as a time variable
  // camShader.setUniform("time", frameCount * 0.1);
  // lets map the mouseX to frequency and mouseY to amplitude
  // try playing with these to get a more or less distorted effect
  // 10 and 0.25 are just magic numbers that I thought looked good
  // let freq = map(mouseX, 0, width, 0, 10.0);
  // let amp = map(mouseY, 0, height, 0, 0.25);
  // let freq = 15;
  // let amp = 0.25;
  // send the two values to the shader
  // camShader.setUniform("frequency", freq);
  // camShader.setUniform("amplitude", amp);
  // rect gives us some geometry on the screen
  // shaderLayer.rect(0, 0, width, height);
  // image(shaderLayer, 0, 0, width, height);
  // shaderLayer.rotateY(0.01);
  // texture(shaderLayer, 0, 0, width, height);
  // plane(width, height);
  // plane(width - 50, height - 50);
  // tint(120, 127);
  // plane(width - 100, height - 100);
  // tint(255, 127);
  // plane(width - 150, height - 150);
  // tint(255, 127);
  // plane(width - 200, height - 200);
  // tint(255, 127);
  // plane(width - 250, height - 250);
  // tint(255, 127);
  // plane(width - 300, height - 300);
  // tint(255, 127);
  // plane(width - 350, height - 350);
  // tint(255, 127);
  // plane(width - 350, height - 350);
  // tint(255, 127);
  // plane(width - 400, height - 400);
  // rotateX(45.6);
  // rotateZ(frameCount * 0.08);
  // scale(8);
  // // normalMaterial();
  // specularMaterial(250);
  // // fill(255, 255, 255);
  // // texture(asteroidTexture, 0, 0, width, height);
  // // texture(asteroidTexture, 0, 0, width, height);
  // model(head);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
