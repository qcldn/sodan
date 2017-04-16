var names = ['Daniel', 'Franzi', 'Hector', 'Nathan', 'Sam'];

var data = names.map((o) => {
    return {name: o,
            value: Math.floor(Math.random()*100)}
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

function init() {
  let selected = undefined;
  document.addEventListener('name-selected', function(e) {
    selected = e.detail.name
    draw(selected, names);
  });
  draw(selected, names);
}

function draw(selected, names) {
  draw_buttons(selected, names, '#buttons');
  draw_pie_chart(data, '#pie');
}

init();
