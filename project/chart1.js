// Demi Vollemans
// Programmeer Project
// bubble chart

var margin = {top: 30, right: 40, bottom: 70, left: 80},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//setup x
var xValue = function (d){return d.years_competing; },
    xScale = d3.scale.linear()
        .range([0, width]),
    xMap= function (d) {return xScale(xValue(d))},
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        .tickPadding(10);

//setup y
var yValue = function(d) {return d.total_prices; },
    yScale = d3.scale.linear()
        .range([height, 0]),
    yMap = function (d) { return yScale(yValue(d));},
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5)
        .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(10);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0,120])
    .html(function (d) {
        return "<strong> Team: </strong>" + (d.team) + "<br>"+
            "<strong> Value 2015: </strong>" + (d.val2015) + "<br>" +
                " <strong >Number of Championships won : </strong> " + d.total_prices + "<br>"
    });

var footballColor = "66b3ff",
    soccerColor = "4dff4d",
    basketballColor = "#ff8533",
    baseballColor = "FF6666";

var colValue = function (d) {return d.sport},
    color = d3.scale.ordinal()
        .domain(["Football", "American football", "Baseball", "Basketball"])
        .range([soccerColor, footballColor, baseballColor, basketballColor]);

function radius(d){
    if (d.val2015 > 3) {
        return 50;
    }
    if (d.val2015 > 2) {
        return 20;
    }
    if (d.val2015 > 1) {
        return 10;
    }
}

var svg = d3.select("body")
    .append("svg")
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

function analyze (error, data) {
	if (error) { console.log(error); }
    //console.log(data)
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
    var circle = svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d){ return radius(d)})
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return color(colValue(d));})
        // Assign ID
        .attr("id", function (d) {return 'tag' + d.sport.replace(/\s+/g, '')})
        .on('mouseover',function(d){tip.show(d); mouseOver (d) })
        .on('mouseout', tip.hide);

    circle.append("text")
        .attr("text-anchor", "middle")
        .style("fill", "#fff")
        .text(function(d) {
            return d.rank;
        });
    function mouseOver(d) {
        d3.select(".line")
            .datum(d)
            .attr("id", function(d) {
                return d.team
            });
        //change and remove when hovered
        for( var i = 0; i < data.length; i++ ) {
            if (d.team == data[i].team){
                var tempData = data[i];
                d3.select("#newline2").remove();
                d3.select("#newline").remove();
                lineGraph(tempData);
                forcechart(tempData);
                console.log(tempData);
            }
        }
    }

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
        .style("fill", color)
        .on("click", function(d) {
            var active = d.active ? false : true,
                newOpacity = active ? 0 : 1;
                d3.selectAll("#tag" + d.replace(/\s +/g, ''))
                    .transition().duration(100)
                    .style("opacity", newOpacity);
                console.log(active);
                d.active = active;
                console.log(active)
        });

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;});
}

