

function VoiceRecognition (continuous) {
  var self = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : console.warn('GET CHROME');
  self.onresult = function (event) {
     console.log(event.results);
  }
  self.hasStarted = false;
  self.onstart = function () {
    self.hasStarted = true;
  }
  // continuous by default and you can specify false if you want to
  self.continuous = continuous !== undefined ? continuous :  true;
  // receive interim results

  self.interimResults = true;

  /* on end, restart if continuous is specified, this because
     the continous stream will stop if no one speaks for a while
     and it needs to be restarted
  */
  self.countCharacters = function (voiceString) {
    return voiceString.split(' ').join('').length
  }

  self.onend = function() {
   if (self && self.continuous) self.start();
  }

  self.onerror = function(event) { console.error(event); }
  return self;
}
