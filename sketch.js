var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

let text = "";

//recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "fr-FR";
recognition.interimResults = true;
recognition.maxAlternatives = 1;

document.onclick = function() {
  recognition.start();
  console.log("Ready to receive a color command.");
};

recognition.onresult = function(event) {
  // recognition.start();
  console.log(event);
  var last = event.results.length - 1;
  text = event.results[last][0].transcript;
  console.log(text);
  console.log("Confidence: " + event.results[0][0].confidence);
};

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onnomatch = function(event) {
  console.log("I didnt recognise that color.");
};

recognition.onerror = function(event) {
  console.log(event.error);
};

// the shader variable
let camShader;

// the camera variable
let cam;

// we will need at least two layers for this effect
let shaderLayer;
let pupImg;

// how many past frames should we store at once
// the more you store, the further back in time you can go
// however it's pretty memory intensive so don't push it too hard
let numLayers = 90;
let index = 0;

// an array where we will store the past camera frames
let layers = [];

// three indices representing a given momeny in time
// index1 is current
// index2 is 30 frames behind
// index3 is 60 frames behind
let index1 = 0;
let index2 = numLayers / 3; // 30
let index3 = (numLayers / 3) * 2; // 60

function preload() {
  // load the shaders, we will use the same vertex shader and frag shaders for both passes
  camShader = loadShader("assets/shader/vertex.vert", "assets/shader/blur.frag");
  pupImg = loadImage("assets/img/bbq.jpg");
  font = loadFont("assets/font/MonumentExtended-Regular.otf");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight);

  shaderLayer = createGraphics(width, height, WEBGL);
  shaderLayer.noStroke();
  textSrc = createGraphics(width * 2, height * 2);

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();
}

function draw() {
  textSrc.background(0);
  textSrc.textSize(100);
  textSrc.textFont(font);
  textSrc.fill(255);
  textSrc.text(text, 0, height * 0.5);

  // shader() sets the active shader with our shader
  shaderLayer.shader(camShader);
  // lets just send the cam to our shader as a uniform
  camShader.setUniform("tex0", textSrc);

  // send a slow frameCount to the shader as a time variable
  camShader.setUniform("time", frameCount * 0.01);

  // lets map the mouseX to frequency and mouseY to amplitude
  // try playing with these to get a more or less distorted effect
  // 10 and 0.25 are just magic numbers that I thought looked good
  let freq = map(mouseX, 0, width, 0, 10.0);
  let amp = map(mouseY, 0, height, 0, 0.25);

  // send the two values to the shader
  camShader.setUniform("frequency", freq);
  camShader.setUniform("amplitude", amp);

  // rect gives us some geometry on the screen
  shaderLayer.rect(0, 0, width, height);
  image(shaderLayer, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
