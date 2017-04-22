//data in format [{name: '', value: ''}...]
function draw_pie_chart(data, selector) {
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
      .value(function(d) { console.log(d.value); return d.value; });

  var piedata = pie(data);

  var container = d3.select(selector);

  var g = container.select("svg")
      .attr("width", width)
      .attr("height", height)
    .select("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var ticks = g.selectAll("line")
      .data(piedata);

  var ticksEnter = ticks.enter()
      .append("line");

  ticksEnter.attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", -radius+10)
    .attr("y2", -radius)
    .attr("stroke", "black")
    .attr('opacity', 0)
    .attr("transform", function(d) {
    return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
    });

  ticks.attr("y1", -radius+10)
    .attr("y2", -radius)
    .attr('opacity', function (d) {
      if (d.value == 0) {
        return 0;
      }
      else {
        return 1;
      }
    })
    .attr("transform", function(d) {
      return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
    });

  var arcs = g.selectAll(".arc")
    .data(piedata);

  arcsEnter = arcs.enter();

  arcsEnter.append("g")
    .attr("class", "arc")
    .append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.value); });

  arcs.select("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.value); });

  var labels = g.selectAll("text").data(piedata);

  var labelsEnter = labels.enter();

  labelsEnter.append("text")
        .attr("class", "label")
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
        .attr('opacity', 0)
        .text(function(d) { return d.data.name; });

  labels.attr("transform", function(d) {
           var dist   = radius + 6;
               angle  = (d.startAngle + d.endAngle) / 2; // Middle of wedge
               x      = dist * Math.sin(angle);
               y      = -dist * Math.cos(angle);
           return "translate(" + x + "," + y + ")";
         })
        .attr('opacity', function (d) {
          if (d.value == 0) {
            return 0;
          }
          else {
            return 1;
          }
        })
        .attr("text-anchor", function(d) {
          if ((d.startAngle + d.endAngle) / 2 < Math.PI) { return 'start'; }
          else { return 'end'; }
        });

  arcs.exit().remove();
  labels.exit().remove();
  ticks.exit().remove();

  d3.selectAll('.arc')
    .attr('stroke', 'black');
  d3.selectAll('.label')
    .attr('font-family', 'Arial Rounded MT Bold')
    .attr('font-size', '11px');
}
