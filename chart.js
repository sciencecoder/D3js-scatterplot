var svg = d3.select('svg');
var margin = 50;
var svgWidth = parseInt(svg.attr('width')) - margin;
var svgHeight = parseInt(svg.attr('height')) - margin;
var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

function formatDate(numberDate) {
  return number;
}
//x and y coordinate origin is from the top left
$.getJSON(url, function(data) {

  var fastestTime = new Date('2016-01-01T00:' + data[0].Time);
  var barWidth = svgWidth / data.length;

  function difFromFastestTime(time) {
    return time - fastestTime;
  }
  
  var xScale = d3.scaleTime()
    .domain([d3.max(data, function(d) {
      var a = new Date('2016-01-01T00:' + d.Time)
      return difFromFastestTime(a);
    }), d3.min(data, function(d) {
      var a = new Date('2016-01-01T00:' + d.Time)
      return difFromFastestTime(a);
    })])
    .range([margin, svgWidth]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
      return d.Place;
    })])
    .range([margin, svgHeight]);
  
  var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {
        return d.Name + ': ' + d.Nationality + ', Year: ' + d.Year + ', Time: ' + d.Time + '</br>' + d.Doping; 
      });
  
  svg.call(tool_tip); 
  svg.selectAll('g').data(data).enter().append('circle')

  .attr('r', 5)
    .attr('class', function(d, i) {
      return 'data-point' + i
    })
    .attr('fill', function(d) {
      return d.Doping != '' ? 'red' : 'black';
    })
    .attr('cx', function(d) {
      return xScale(difFromFastestTime(new Date('2016-01-01T00:' + d.Time)))
    })
    .attr('cy', function(d) {
      return yScale(d.Place)
    })
   .on('mouseover', tool_tip.show)
  .on('mouseleave', tool_tip.hide);
  
  
  svg.selectAll('g').data(data).enter().append('text')
    .text(function(d) {
      return d.Name;
    })
    .attr('x', function(d) {
      return xScale(difFromFastestTime(new Date('2016-01-01T00:' + d.Time))) + 10
    }).attr('y', function(d) {
      return yScale(d.Place) + 5
    });
  
  var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%M:%S"));
  var yAxis = d3.axisLeft(yScale);
  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = svg.append("g")
    .attr("transform", "translate(0," + (svgHeight) + ")")
    .call(xAxis);
  var yAxisGroup = svg.append('g')
    .attr("transform", "translate(" + (margin) + ",0)")
    .call(yAxis);

});
