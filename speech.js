var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

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
  var color = event.results[last][0].transcript;
  console.log(color);
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
