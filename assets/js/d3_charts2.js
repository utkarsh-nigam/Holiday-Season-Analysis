
//data=[{"Product Category":"Electronic","Relative Sensitivity":0.290780142,"Sensitivity":0.41,"Order Share":0.49,"Revenue Share":0.53},{"Product Category":"Home & Furnishing","Relative Sensitivity":0.205673759,"Sensitivity":0.29,"Order Share":0.25,"Revenue Share":0.17},{"Product Category":"Beauty & Accessory","Relative Sensitivity":0.19858156,"Sensitivity":0.28,"Order Share":0.13,"Revenue Share":0.08},{"Product Category":"Clothing","Relative Sensitivity":0.170212766,"Sensitivity":0.24,"Order Share":0.13,"Revenue Share":0.09},{"Product Category":"Everyday Living","Relative Sensitivity":0.134751773,"Sensitivity":0.19,"Order Share":0.19,"Revenue Share":0.08}];
data=[
    {"Campaign":1,"data":[
     {
       "Day": "Wednesday",
       "Visits": "57K",
       "Orders": "8K",
       "Revenue": 1
     },
     {
       "Day": "Thanksgiving",
       "Visits": "41K",
       "Orders": "4K",
       "Revenue": 0.6
     },
     {
       "Day": "Black Friday",
       "Visits": "44K",
       "Orders": "5K",
       "Revenue": 0.5
     },
     {
       "Day": "Cyber Monday",
       "Visits": "87K",
       "Orders": "9K",
       "Revenue": 0.9
     }
    ]},{"Campaign":2,  "data":[
     {
       "Day": "Wednesday",
       "Visits": "206K",
       "Orders": "41K",
       "Revenue": 5.
     },
     {
       "Day": "Thanksgiving",
       "Visits": "316K",
       "Orders": "43K",
       "Revenue": 5.1
     },
     {
       "Day": "Black Friday",
       "Visits": "336K",
       "Orders": "47K",
       "Revenue": 4.9
     },
     {
       "Day": "Cyber Monday",
       "Visits": "394K",
       "Orders": "70K",
       "Revenue": 6.9
     }
    ]}, {"Campaign":3,  "data":[
     {
       "Day": "Wednesday",
       "Visits": "36K",
       "Orders": "6K",
       "Revenue": 0.7
     },
     {
       "Day": "Thanksgiving",
       "Visits": "44K",
       "Orders": "6K",
       "Revenue": 0.7
     },
     {
       "Day": "Black Friday",
       "Visits": "46K",
       "Orders": "6K",
       "Revenue": 0.7
     },
     {
       "Day": "Cyber Monday",
       "Visits": "83K",
       "Orders": "13K",
       "Revenue": 1.3
     }
    ]}, {"Campaign":4,  "data":[
     {
       "Day": "Wednesday",
       "Visits": "7292K",
       "Orders": "637K",
       "Revenue": 93
     },
     {
       "Day": "Thanksgiving",
       "Visits": "11419K",
       "Orders": "555K",
       "Revenue": 80.8
     },
     {
       "Day": "Black Friday",
       "Visits": "7028K",
       "Orders": "402K",
       "Revenue": 53.5
     },
     {
       "Day": "Cyber Monday",
       "Visits": "7936K",
       "Orders": "579K",
       "Revenue": 77.3
     }
    ]}
 
 ]
 
 
 
 for (i = 0; i < 4; i++) {
     var donut = donutChart()
     .width(1100)
     .height(600)
     .cornerRadius(3) // sets how rounded the corners are on each slice
     .padAngle(0.015) // effectively dictates the gap between slices
     .variable('Revenue')
     .category('Day');
 
 
     console.log(data[i].data)
     d3.select('#c'+(i+1)+'Chart3')
         .datum(data[i].data) // bind data to the div
         .call(donut); // draw chart in div
 
     function donutChart() {
         var width,
             height,
             margin = {top: 10, right: 10, bottom: 10, left: 10},
             colour = d3.scaleOrdinal(d3.schemeCategory10), // colour scheme
             variable, // value in data that will dictate proportions on chart
             category, // compare data by
             padAngle, // effectively dictates the gap between slices
             floatFormat = d3.format('.4r'),
             cornerRadius, // sets how rounded the corners are on each slice
             percentFormat = d3.format(',.2%');
 
         function chart(selection){
             selection.each(function(data) {
                 // generate chart
 
                 // ===========================================================================================
                 // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
                 var radius = Math.min(width, height) / 2;
 
                 // creates a new pie generator
                 var pie = d3.pie()
                     .value(function(d) { return floatFormat(d[variable]); })
                     .sort(null);
 
                 // contructs and arc generator. This will be used for the donut. The difference between outer and inner
                 // radius will dictate the thickness of the donut
                 var arc = d3.arc()
                     .outerRadius(radius * 0.8)
                     .innerRadius(radius * 0.6)
                     .cornerRadius(cornerRadius)
                     .padAngle(padAngle);
 
                 // this arc is used for aligning the text labels
                 var outerArc = d3.arc()
                     .outerRadius(radius * 0.9)
                     .innerRadius(radius * 0.9);
                 // ===========================================================================================
 
                 // ===========================================================================================
                 // append the svg object to the selection
                 var svg = selection.append('svg')
                     .attr('width', width + margin.left + margin.right)
                     .attr('height', height + margin.top + margin.bottom)
                 .append('g')
                     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
                 // ===========================================================================================
 
                 // ===========================================================================================
                 // g elements to keep elements within svg modular
                 var slices_v = 'slices'+i;
                 var labelName_v = 'labelName'+i;
                 var lines_v='lines'+i
                 svg.append('g').attr('class', slices_v);
                 svg.append('g').attr('class', labelName_v);
                 svg.append('g').attr('class', lines_v);
                 // ===========================================================================================
 
                 // ===========================================================================================
                 // add and colour the donut slices
                 var path = svg.select('.'+slices_v)
                     .datum(data).selectAll('path')
                     .data(pie)
                 .enter().append('path')
                     .attr('fill', function(d) { return colour(d.data[category]); })
                     .attr('d', arc);
                 // ===========================================================================================
 
                 // ===========================================================================================
                 // add text labels
                 var label = svg.select('.'+labelName_v).selectAll('text')
                     .data(pie)
                 .enter().append('text')
                     .attr('dy', '.35em')
                     .html(function(d) {
                         // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                         return d.data[category] + ': <tspan>$ ' + d.data[variable] + 'M</tspan>';
                     })
                     .attr('transform', function(d) {
 
                         // effectively computes the centre of the slice.
                         // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                         var pos = outerArc.centroid(d);
 
                         // changes the point to be on left or right depending on where label is.
                         pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                         return 'translate(' + pos + ')';
                     })
                     .style('text-anchor', function(d) {
                         // if slice centre is on the left, anchor text to start, otherwise anchor to end
                         return (midAngle(d)) < Math.PI ? 'start' : 'end';
                     });
                 // ===========================================================================================
 
                 // ===========================================================================================
                 // add lines connecting labels to slice. A polyline creates straight lines connecting several points
                 var polyline = svg.select('.'+lines_v)
                     .selectAll('polyline')
                     .data(pie)
                 .enter().append('polyline')
                     .attr('points', function(d) {
 
                         // see label transform function for explanations of these three lines.
                         var pos = outerArc.centroid(d);
                         pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                         return [arc.centroid(d), outerArc.centroid(d), pos]
                     });
                 // ===========================================================================================
 
                 // ===========================================================================================
                 // add tooltip to mouse events on slices and labels
                 d3.selectAll('.'+labelName_v+' text, .'+slices_v+' path').call(toolTip);
                 // ===========================================================================================
 
                 // ===========================================================================================
                 // Functions
 
                 // calculates the angle for the middle of a slice
                 function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
 
                 // function that creates and adds the tool tip to a selected element
                 function toolTip(selection) {
 
                     // add tooltip (svg circle element) when mouse enters label or slice
                     selection.on('mouseenter', function (data) {
 
                         svg.append('text')
                             .attr('class', 'toolCircle')
                             .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                             .html(toolTipHTML(data)) // add text to the circle.
                             .style('font-size', '.9em')
                             .style('text-anchor', 'middle'); // centres text in tooltip
 
                         svg.append('circle')
                             .attr('class', 'toolCircle')
                             .attr('r', radius * 0.55) // radius of tooltip circle
                             .style('fill', colour(data.data[category])) // colour based on category mouse is over
                             .style('fill-opacity', 0.35);
 
                     });
 
                     // remove the tooltip when mouse leaves the slice/label
                     selection.on('mouseout', function () {
                         d3.selectAll('.toolCircle').remove();
                     });
                 }
 
                 // function to create the HTML string for the tool tip. Loops through each key in data object
                 // and returns the html string key: value
                 function toolTipHTML(data) {
 
                     var tip = '',
                         i   = 0;
                     var tempData = data.data;
                     delete tempData["Revenue"]
                     for (var key in tempData) {
 
                         // if value is a number, format it as a percentage
                         var value = tempData[key];
 
                         // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
                         // tspan effectively imitates a line break.
                         if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
                         else tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
                         i++;
                     }
 
                     return tip;
                 }
                 // ===========================================================================================
 
             });
         }
 
         // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
         chart.width = function(value) {
             if (!arguments.length) return width;
             width = value;
             return chart;
         };
 
         chart.height = function(value) {
             if (!arguments.length) return height;
             height = value;
             return chart;
         };
 
         chart.margin = function(value) {
             if (!arguments.length) return margin;
             margin = value;
             return chart;
         };
 
         chart.radius = function(value) {
             if (!arguments.length) return radius;
             radius = value;
             return chart;
         };
 
         chart.padAngle = function(value) {
             if (!arguments.length) return padAngle;
             padAngle = value;
             return chart;
         };
 
         chart.cornerRadius = function(value) {
             if (!arguments.length) return cornerRadius;
             cornerRadius = value;
             return chart;
         };
 
         chart.colour = function(value) {
             if (!arguments.length) return colour;
             colour = value;
             return chart;
         };
 
         chart.variable = function(value) {
             if (!arguments.length) return variable;
             variable = value;
             return chart;
         };
 
         chart.category = function(value) {
             if (!arguments.length) return category;
             category = value;
             return chart;
         };
 
         return chart;
     }
 }
 
 
 