var speaking = undefined;
var selected;
var names = [];

var data = names.map((o) => {
    return {name: o, value: 0}
});

// Add an event listener
document.addEventListener("name-of-event", function(e) {
  console.log(e.detail); // Prints "Example of an event"
});

function send(name, detail) {
  var event = new CustomEvent(name, { detail });
  document.dispatchEvent(event);
}

function add_person() {
  let name = this.value;
  this.value = '';
  names.push(name)
  data.push({name: name, value: 0})
    draw(selected, names);
}

function draw_buttons(selected, names, selector) {
  var element = document.querySelector(selector);
  var root = d3.select(element);
  var names = root.selectAll('.name').data(names);
  names.enter().append('button')
    .attr('class', 'name')
    .on('click', name => send('name-selected', { name }));
  names
    .text(name => name)
    .classed('selected', name => selected === name);
  names.exit().remove()
}

var pie_chart_selector = '#pie'

function init() {
  function init_pie_chart() {
    let container = d3.select(pie_chart_selector);
    let svg = container.append('svg');
    svg.append('g');
  };
  init_pie_chart();

  const input = document.querySelector('.name_input');
  input.addEventListener('change', add_person)


  draw(selected, names);
}

document.addEventListener('name-selected', function(e) {
  selected = e.detail.name === selected ? undefined : e.detail.name;
  draw(selected, names);
});

function draw(selected, names) {
  speaking = selected;
  draw_buttons(selected, names, '#buttons');
  draw_pie_chart(data, pie_chart_selector);
}

// INITIALIZE D3 AND DATA
init();



// INTIALIZE MODE VARIABLES
var timerInterval;
var voice = new VoiceRecognition();

// SELECTOR BETWEEN TYPES
function switchMode(element) {
  var newValue = element.options[element.selectedIndex].value;
  tearDownActiveModes();
  switch (newValue) {
    case 'timer': // real default
      return initializeTimer();
    case 'voice':
      return listenToSpeech();
    default:
      console.error('could not select value');
  }
}

function tearDownActiveModes() {
  voice.continuous = false;
  voice.stop();

  if (timerInterval) {
    clearInterval(timerInterval);
  }
}

// TIMER - shows the amount of time a person has spoken

function initializeTimer () {
  function changeData() {
    if (speaking !== undefined) {
      data[names.indexOf(speaking)].value = data[names.indexOf(speaking)].value + (1/100);
    }
    draw_pie_chart(data, pie_chart_selector);
  };

  timerInterval = setInterval(changeData, 100);
}

// SPEECH RECOGNITION COUNTING - counts number of characters of speech

function listenToSpeech() {
 // initiate voice recognition
 var voiceString;
 voice.onresult = function (event) {

    voiceString = event.results[0][0].transcript;

    if (speaking && voiceString && voiceString['length']) {
      data[names.indexOf(speaking)].value = data[names.indexOf(speaking)].value + (voice.countCharacters(voiceString) / 100);
      draw_pie_chart(data, pie_chart_selector);
    }
  }
  voice.continuous = true;
  voice.start();
}

// TIMER IS DEFAULT
initializeTimer();
