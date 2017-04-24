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
data.push({name: name, value: 0, turns: 0})
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

  document.addEventListener('name-selected', function(e) {
    if (selected !== e.detail.name){
      selected = e.detail.name
      var i = names.indexOf(selected);
      data[i].turns += 1;
    updateTurns();
    }
    draw(selected, names);
  } );

function draw(selected, names) {
  speaking = selected;
  draw_buttons(selected, names, '#buttons');
  draw_pie_chart(data, pie_chart_selector);
}

function updateTurns(){
  var container = document.getElementById("stats");
  container.innerHTML = `${getTurns()}`;
}

function getTurns(){
  var turns = "";
  for (var i = 0; i < data.length; i++){
    turns += `${data[i].name} - ${data[i].turns}` + "<br>";
  }
  return turns;
}

init();

function changeData() {
  if (speaking !== undefined) {
    data[names.indexOf(speaking)].value = data[names.indexOf(speaking)].value + (1/100);
  }
  draw_pie_chart(data, pie_chart_selector);
};

setInterval(changeData, 100);
