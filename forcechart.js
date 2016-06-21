data = {"world2010": null, "world2011": null, "world2012": null, "world2013": null, "world2014": "1", "world2015": null, "euro2010": null, "euro2011": null, "euro2012": null, "euro2013": "1", "euro2014": null, "euro2015": "1", "regio2010": "1", "regio2011": "1", "regio2012": null, "regio2013": "1", "regio2014": null, "regio2015": null, "numb2013": " 2", "numb2012": " 1", "numb2011": " 1", "european_prices": " UEFA Champignions League", "numb2015": " 1", "numb2014": " 4", "rank": "2", "totalin5": " 9", "numb2010": "0", "sport": "Football", "price2011": " Copa Del Rey", "val2013": " 3.3", "val2012": " 1.877", "val2011": " 1.451", "val2010": " 1.323", "val2015": " 3.26", "val2014": " 3.44", "total_prices": " 32", "price2013": " Copa Del Rey; Champions League", "price2012": " La Liga", "worldwide_prices": null, "price2010": null, "price2014": " Copa del Rey; UEFA Champions Leage; UEFA Super Cup; FIFA World Cup", "country": " Spain", "years_competing": " 111", "domestic_prices": null, "team": " Real Madrid"},
forcechart(data);
function forcechart (data) {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var parseDate = d3.time.format("%Y").parse;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("body")
        .append("svg")
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
    var levels = ["regio", "euro", "world"];

    formatdata.forEach(function (d) {
        d.year = parseDate(d.year);
        d.regio = +d.regio2010;
        d.euro = +d.value;
        d.world = +d.world;
        d.prices = d.prices;

        var layers = d3.layout.stack()(levels.map(function (c) { return formatdata.map (function (d) {
            return {x: d.year, y: d[c]};
        })
        }));
        console.log(layers);

        x.domain(layers[0].map(function(d) { return d.x; }));
        y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]).nice();

        var layer = svg.selectAll(".layer")
            .data(layers)
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function(d, i) { return color(i); });

        layer.selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y + d.y0); })
            .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
            .attr("width", x.rangeBand() - 1);

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxis);

})}

function type(d) {
   // d.date = parseDate(d.date);
    levels.forEach(function (c) {
        d[c] = +d[c];
    });
    return d;
}