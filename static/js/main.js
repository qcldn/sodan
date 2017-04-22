var speaking = undefined;
var names = ['Daniel', 'Franzi', 'Hector', 'Nathan', 'Sam'];

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

function draw_buttons(selected, names, selector) {
  var element = document.querySelector(selector);
  var root = d3.select(element);
  var names = root.selectAll('.name').data(names);
  names.enter().append('div')
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

  let selected = undefined;
  document.addEventListener('name-selected', function(e) {
    selected = e.detail.name
    draw(selected, names);
  });
  draw(selected, names);
}

function draw(selected, names) {
  speaking = selected;
  draw_buttons(selected, names, '#buttons');
  draw_pie_chart(data, pie_chart_selector);
}

init();

function changeData() {
  if (speaking !== undefined) {
    data[names.indexOf(speaking)].value = data[names.indexOf(speaking)].value + (1/100);
  }
  draw_pie_chart(data, pie_chart_selector);
};

setInterval(changeData, 100);
