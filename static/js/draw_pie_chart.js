//data in format [{name: '', value: ''}...]
function draw_pie_chart(data, elementId) {
  var width = 470;
  var height = 530;
  var radius = Math.min(width, height) / 3.1;

  // var color = d3.scale.ordinal()
  //     .range(["#4C255B", "#7A518A", "#9167A1", "#BF94D0", "#EDC0FF"]);

  var maxValue = Math.max(...data.map((o) => {
    return o.value;
  }));

  var minValue = Math.min(...data.map((o) => {
    return o.value;
  }));

  var color = d3.scale.linear().domain([minValue, maxValue])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#00FF00"), d3.rgb('#FF0000')]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

  var piedata = pie(data);

  var svg = d3.select("#" + elementId).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var ticks = svg.selectAll("line")
      .data(piedata)
    .enter()
      .append("line");

  ticks.attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", -radius+10)
    .attr("y2", -radius)
    .attr("stroke", "black")
    .attr("transform", function(d) {
    return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
    });

  var g = svg.selectAll(".arc")
    .data(pie(data))
  .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.value); });

  var labels = svg.selectAll("text")
                .data(piedata)
                .enter()
                .append("text");

  labels.attr("class", "label")
        .attr("transform", function(d) {
           var dist   = radius + 6;
               angle  = (d.startAngle + d.endAngle) / 2; // Middle of wedge
               x      = dist * Math.sin(angle);
               y      = -dist * Math.cos(angle);
           return "translate(" + x + "," + y + ")";
         })
        .attr("dy", "0.35em")
        //hacky
        .attr("text-anchor", function(d) {
          if ((d.startAngle + d.endAngle) / 2 < Math.PI) { return 'start'; }
          else { return 'end'; }
        })
        .text(function(d) { return d.data.name; });

  d3.selectAll('.arc')
    .attr('stroke', 'black');
  d3.selectAll('.label')
    .attr('font-family', 'Arial Rounded MT Bold')
    .attr('font-size', '11px');
}
