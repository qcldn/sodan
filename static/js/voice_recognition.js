

function VoiceRecognition () {

  this.recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : console.warn('GET CHROME');
  this.recognition.onresult = function (event) {
    console.log('RESULT', event.results);
  }
  this.recognition.onstart = function () {
    console.log('started');
  }
  this.recognition.continuous = true;
  this.recognition.interimResults = true;
  this.recognition.onerror = function(event) { console.error(event); }
    console.log('ended');
}
// usage
// var voice = new VoiceRecognition();

// voice.recognition.start();