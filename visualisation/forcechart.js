function forcechart (data) {
    var margin = {top: 30, right: 40, bottom: 70, left: 80},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var parseDate = d3.time.format("%Y").parse;

    //setup y
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width]),
    xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y"));

    //setup y
    var y = d3.scale.linear()
        .rangeRound([height, 0]),
    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0,120])
        .html(function (d) {
            return "<strong> Team: </strong>" + (d.prices)
        });

    var color = d3.scale.ordinal()
        .domain(["Worldwide Championship", "Continental", "Regional Price"])
        .range(["#98abc5", "#8a89a6", "#7b6888"]);

    var svg = d3.select("body")
        .append("svg")
        .attr("id", "newline")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var formatdata = [
        {year: "2010", regio: data.regio2010, euro: data.euro2010, world: data.world2010, prices: data.price2010},
        {year: "2011", regio: data.regio2010, euro: data.euro2011, world: data.world2011, prices: data.price2011},
        {year: "2012", regio: data.regio2010, euro: data.euro2012, world: data.world2012, prices: data.price2012},
        {year: "2013", regio: data.regio2010, euro: data.euro2013, world: data.world2013, prices: data.price2013},
        {year: "2014", regio: data.regio2010, euro: data.euro2014, world: data.world2014, prices: data.price2014},
        {year: "2015", regio: data.regio2010, euro: data.euro2015, world: data.world2015, prices: data.european_prices}
    ];
   console.log("Demffsd");
    var levels = ["regio", "euro", "world"];

    formatdata.forEach( function (d) {
        d.year = parseDate(d.year);
        d.regio = +d.regio;
        d.euro = +d.euro;
        d.world = +d.world;
    });
    
    var layers = levels.map(function (c) {
        return formatdata.map(function(d) {
            return {x:d.year, y: d[c]};
        })
    });

    var datastack = d3.layout.stack()(layers);

    x.domain (datastack[0].map(function (d) { return d.x;}));
    y.domain([0, 3]);

    var layer = svg.selectAll(".stack")
        .data(datastack)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function(d, i) { return color(i); });
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide);

    var rects = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .transition()
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y + d.y0); })
        .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
        .attr("width", x.rangeBand()- 3);

    svg.append("g")
        .attr("class", "x axis")
        //.attr("stroke-width", "2px")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    console.log("bofrfgefse")
    svg.append("g")
        .transition()
        .duration(1000)
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxis);

    //draw legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {return "translate(0," + i * 20 + ")"; });

    //draw rectangles of legend
    legend.append("rect")
        .attr("x", width + 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    //draw legend text
    legend.append("text")
        .attr("x", width + 80)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;});
}
