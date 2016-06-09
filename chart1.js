var margin = {top: 20, right: 30, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//setup x
var xValue = function (d){return d.years_competing; },
    xScale = d3.scale.linear()
        .range([0, width]),
    xMap= function (d) {return xScale(xValue(d))},
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

//setup y
var yValue = function(d) {return d.total_prices; },
    yScale = d3.scale.linear()
        .range([height, 0]),
    yMap = function (d) { return yScale(yValue(d));},
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([120,40])
    .html(function (d) {
        return "<strong> Value 2015: </strong>" + (d.val2015) + "<br>" +
                " Number of Championships won : " + d.total_prices + "<br>"
    });

var footballColor = "66b3ff",
    soccerColor = "4dff4d",
    basketballColor = "#ff8533",
    baseballColor = "FF6666";

var colValue = function (d) {return d.sport};
var color = d3.scale.ordinal()
    .domain(["Football", "American football", "Baseball", "Basketball"])
    .range([soccerColor, footballColor, baseballColor, basketballColor]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("svg")
    .attr("class", "tooltip")
    .style("opacity", 0);

svg.call(tip);

queue()
	.defer(d3.json, '2015_.json')
	.await(analyze); // function that uses the files
// var klik = document.getElementById("klik")
// klik.addEventListener(("click"), function(event) {
//     console.log("hoi")
// }); 

function analyze (error, data) {
	if (error) { console.log(error); }

    xScale.domain([d3.min(data, xValue)-1, 150]);
    yScale.domain([d3.min(data, yValue)-1, 45]);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Years Competing");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Championships");

    // draw dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) { return d.val2015 *6})
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return color(colValue(d));})
        .on('mouseover',tip.show)
        .on('mouseout', tip.hide)

        // .on("mouseover", function(d) {
        //     tooltip.transition()
        //         .duration(200)
        //         .style("opacity", .9);
        //     tooltip.html(d["Team"] + "<br/> (" + xValue(d)
        //         + ", " + yValue(d) + ")")
        //         .style("left", (d3.event.pageX + 5) + "px")
        //         .style("top", (d3.event.pageY - 28) + "px");
        // })

        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // draw legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})

}