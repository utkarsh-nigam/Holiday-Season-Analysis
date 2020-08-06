var atc_data=[
  {
    "day": 1,
    "hour": 1,
    "count": 0.753073411
  },
  {
    "day": 1,
    "hour": 2,
    "count": 0.794519508
  },
  {
    "day": 1,
    "hour": 3,
    "count": 0.763559246
  },
  {
    "day": 1,
    "hour": 4,
    "count": 0.70879036
  },
  {
    "day": 1,
    "hour": 5,
    "count": 0.741045522
  },
  {
    "day": 1,
    "hour": 6,
    "count": 0.699264771
  },
  {
    "day": 2,
    "hour": 1,
    "count": 0.78923632
  },
  {
    "day": 2,
    "hour": 2,
    "count": 0.734141126
  },
  {
    "day": 2,
    "hour": 3,
    "count": 0.797866861
  },
  {
    "day": 2,
    "hour": 4,
    "count": 0.709311473
  },
  {
    "day": 2,
    "hour": 5,
    "count": 0.674591023
  },
  {
    "day": 2,
    "hour": 6,
    "count": 0.696471471
  },
  {
    "day": 3,
    "hour": 1,
    "count": 0.815413892
  },
  {
    "day": 3,
    "hour": 2,
    "count": 0.757978215
  },
  {
    "day": 3,
    "hour": 3,
    "count": 0.755185311
  },
  {
    "day": 3,
    "hour": 4,
    "count": 0.603696426
  },
  {
    "day": 3,
    "hour": 5,
    "count": 0.64517932
  },
  {
    "day": 3,
    "hour": 6,
    "count": 0.612241899
  },
  {
    "day": 4,
    "hour": 1,
    "count": 0.668335419
  },
  {
    "day": 4,
    "hour": 2,
    "count": 0.691846397
  },
  {
    "day": 4,
    "hour": 3,
    "count": 0.610292161
  },
  {
    "day": 4,
    "hour": 4,
    "count": 0.69891358
  },
  {
    "day": 4,
    "hour": 5,
    "count": 0.651189081
  },
  {
    "day": 4,
    "hour": 6,
    "count": 0.56533861
  },
  {
    "day": 5,
    "hour": 1,
    "count": 0.59766881
  },
  {
    "day": 5,
    "hour": 2,
    "count": 0.490622295
  },
  {
    "day": 5,
    "hour": 3,
    "count": 0.500909604
  },
  {
    "day": 5,
    "hour": 4,
    "count": 0.557384096
  },
  {
    "day": 5,
    "hour": 5,
    "count": 0.588070711
  },
  {
    "day": 5,
    "hour": 6,
    "count": 0.556581986
  }
 ]


var days = ["Thanksgiving", "Black Friday", "Saturday", "Sunday", "Cyber Monday"],
	times = ["12AM - 4AM", "4AM - 8AM", "8AM - 12PM", "12PM - 4PM", "4PM - 8PM", "8PM - 12AM"];

//var dayDict={"Wednesday":0,"Thanksgiving":1, "Black Friday": 2, "Cyber Monday:3" };    
i=0;
var data =atc_data

        var margin = {
            top: 18,
            right: 50,
            bottom: 10,
            left: 150
        };

        var width = 900 - margin.left - margin.right - 20,
            gridSizex = Math.floor(width / times.length),
            gridSizey = Math.floor(gridSizex / 3)
            height = gridSizey * (days.length+2);


        //SVG container
        // console.log('#cCharts4');
        // console.log('#c'+(i+1)+'Chart4');
        var svg = d3.select('#hourlyTrend_div1')
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Reset the overall font size
        //var newFontSize = width * 62.5 / 900;
        //d3.select("html").style("font-size", newFontSize + "%");

        ///////////////////////////////////////////////////////////////////////////
        //////////////////////////// Draw Heatmap /////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
            
        //Based on the heatmap example of: http://blockbuilder.org/milroc/7014412

        var colorScale = d3.scaleLog()
            .domain([d3.min(data, function(d) {return d.count; }), d3.max(data, function(d) {return d.count; })])
            .range(["#ffffff", "#007da1"])
            //.interpolate(d3.interpolateHcl);

        var dayLabels = svg.selectAll(".dayLabel")
            .data(days)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSizey; })
            .style("text-anchor", "end")
            .style("font-size", "14px")
            .attr("transform", "translate(-6," + gridSizey / 1.5 + ")");
            //.attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

        var timeLabels = svg.selectAll(".timeLabel")
            .data(times)
            .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSizex; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .attr("transform", "translate(" + gridSizex / 2 + ", -6)");
            //.attr("class", function(d, i) { return ((i >= 8 && i <= 17) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

        var heatMap = svg.selectAll(".hour")
            .data(data)
            .enter().append("rect")
            .attr("x", function(d) { return (d.hour - 1) * gridSizex; })
            .attr("y", function(d) { return (d.day - 1) * gridSizey; })
            .attr("class", "hour bordered")
            .attr("width", gridSizex)
            .attr("height", gridSizey)
            .style("stroke", "white")
            .style("stroke-opacity", 0.6)
            .style("fill", function(d) { return colorScale(d.count); })
            
        //console.log(heatMap)
        var dataLabel=svg.selectAll(".rect")
            .data(data)
            .enter().append("text")
            .attr("x", function(d) { return (d.hour - 1) * gridSizex; })
            .attr("y", function(d) { return (d.day - 1) * gridSizey; } )
            .text(function(d) { 
                return ((d3.format(".2f")(d.count))); })
            .style("text-anchor", "start")
            .style("font-size", "12px")
            .attr("transform", "translate(45,25)");
            //d3.format(".2f")



        //Append credit at bottom
        svg.append("text")
            .attr("class", "credit")
            .attr("x", width/2)
            .attr("y", gridSizey * (days.length+1) + 80)
            .style("text-anchor", "middle")
            .text("");

        ///////////////////////////////////////////////////////////////////////////
        //////////////// Create the gradient for the legend ///////////////////////
        ///////////////////////////////////////////////////////////////////////////

        //Extra scale since the color scale is interpolated
        var countScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {return d.count; })])
            .range([0, width])

        //Calculate the variables for the temp gradient
        var numStops = 12;
        countRange = countScale.domain();
        countRange[2] = countRange[1] - countRange[0];
        countPoint = [];
        for(var i = 0; i < numStops; i++) {
            countPoint.push(i * countRange[2]/(numStops-1) + countRange[0]);
        }//for i

        //Create the gradient
        svg.append("defs")
            .append("linearGradient")
            .attr("id", "legend-traffic")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "100%").attr("y2", "0%")
            .selectAll("stop") 
            .data(d3.range(numStops))                
            .enter().append("stop") 
            .attr("offset", function(d,i) { 
                return countScale( countPoint[i] )/width;
            })   
            .attr("stop-color", function(d,i) { 
                return colorScale( countPoint[i] ); 
            });






        ///////////////////////////////////////////////////////////////////////////
        ////////////////////////// Draw the legend ////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////

        var legendWidth = Math.min(width*0.8, 400);
        //Color Legend container
        var legendsvg = svg.append("g")
            .attr("class", "legendWrapper")
            .attr("transform", "translate(" + (width/2) + "," + (gridSizey * days.length + 40) + ")");

        //Draw the Rectangle
        legendsvg.append("rect")
            .attr("class", "legendRect")
            .attr("x", -legendWidth/2)
            .attr("y", 0)
            //.attr("rx", hexRadius*1.25/2)
            .attr("width", legendWidth)
            .attr("height", 10)
            .style("fill", "url(#legend-traffic)");
            
        //Append title
        legendsvg.append("text")
            .attr("class", "legendTitle")
            .attr("x", 0)
            .attr("y", -10)
            .style("text-anchor", "middle")
            .style("font-size", "10px")
            .text("Add to Cart Rate");

        //Set scale for x-axis
        var xScale = d3.scaleLinear()
            .range([-legendWidth/2, legendWidth/2])
            .domain([ d3.min(data, function(d) { return d.count; }), d3.max(data, function(d) { return d.count; })] );

        //Define x-axis
        var xAxis = d3.axisBottom(xScale)
            .ticks(5);
            //.tickFormat(formatPercent)


        //Set up X axis
        legendsvg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (10) + ")")
            .call(xAxis);

