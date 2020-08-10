data=[
     {
       "Day": "Thanksgiving",
       "Visits": "90K",
       "Orders": "16K",
       "Revenue": 78
     },
     {
       "Day": "Black Friday",
       "Visits": "111K",
       "Orders": "23K",
       "Revenue": 103
     },
     {
        "Day": "Saturday",
        "Visits": "85K",
        "Orders": "15K",
        "Revenue": 70
      },
      {
        "Day": "Sunday",
        "Visits": "87K",
        "Orders": "20K",
        "Revenue": 88
      },
     {
       "Day": "Cyber Monday",
       "Visits": "69K",
       "Orders": "7K",
       "Revenue": 33
     }
 ]

 table_data={
        "Thanksgiving":[
            {
              "product_name": "Runail Glitter Stick",
              "Orders": 814,
              "Revenue": 4032
            },
            {
              "product_name": "Irisk Rosehip Oil",
              "Orders": 391,
              "Revenue": 121
            },
            {
              "product_name": "Grattol Dry Shampoo Collection",
              "Orders": 319,
              "Revenue": 275
            },
            {
              "product_name": "Masura Fluid Lip Color",
              "Orders": 303,
              "Revenue": 1584
            },
            {
              "product_name": "Domix Magnetic Brush Set",
              "Orders": 286,
              "Revenue": 105
            }
           ],
        "Black Friday": [
            {
              "product_name": "Runail Glitter Stick",
              "Orders": 842,
              "Revenue": 4092
            },
            {
              "product_name": "Irisk Rosehip Oil",
              "Orders": 495,
              "Revenue": 149
            },
            {
              "product_name": "Grattol Dry Shampoo Collection",
              "Orders": 473,
              "Revenue": 385
            },
            {
              "product_name": "Masura Fluid Lip Color",
              "Orders": 451,
              "Revenue": 2090
            },
            {
              "product_name": "Italwax Hair Strobing Spray",
              "Orders": 446,
              "Revenue": 4532
            }
           ],
    "Saturday": [
        {
          "product_name": "Runail Glitter Stick",
          "Orders": 545,
          "Revenue": 2646
        },
        {
          "product_name": "Irisk Rosehip Oil",
          "Orders": 402,
          "Revenue": 121
        },
        {
          "product_name": "Grattol Dry Shampoo Collection",
          "Orders": 374,
          "Revenue": 303
        },
        {
          "product_name": "Masura Fluid Lip Color",
          "Orders": 330,
          "Revenue": 1463
        },
        {
          "product_name": "Domix Magnetic Brush Set",
          "Orders": 303,
          "Revenue": 105
        }
       ],
           
        "Sunday": [
            {
              "product_name": "Runail Glitter Stick",
              "Orders": 869,
              "Revenue": 4224
            },
            {
              "product_name": "Grattol Dry Shampoo Collection",
              "Orders": 495,
              "Revenue": 402
            },
            {
              "product_name": "Irisk Rosehip Oil",
              "Orders": 462,
              "Revenue": 138
            },
            {
              "product_name": "Masura Fluid Lip Color",
              "Orders": 413,
              "Revenue": 1832
            },
            {
              "product_name": "Domix Magnetic Brush Set",
              "Orders": 396,
              "Revenue": 138
            }
           ],
           
        "Cyber Monday": [
            {
              "product_name": "Runail Glitter Stick",
              "Orders": 325,
              "Revenue": 1700
            },
            {
              "product_name": "Grattol Dry Shampoo Collection",
              "Orders": 154,
              "Revenue": 149
            },
            {
              "product_name": "Irisk Rosehip Oil",
              "Orders": 132,
              "Revenue": 44
            },
            {
              "product_name": "Italwax Hair Strobing Spray",
              "Orders": 121,
              "Revenue": 1326
            },
            {
              "product_name": "Lip Pencil Set",
              "Orders": 116,
              "Revenue": 182
            }
           ]
 }
 var element = d3.select('#peakDaySplit_div1').node();
 var elementWidth=element.getBoundingClientRect().width;

 var element2 = d3.select('#peakDaySplit_div2').node();
 var element2Width=element2.getBoundingClientRect().width;
 
var bodyFont=16;

var columns = [
    { head: 'Product Name', cl: 'title', html: d3.f('product_name') },
    { head: 'Orders', cl: 'num', html: d3.f('Orders', d3.format(',')) }];
    //,
    //{ head: 'Revenue', cl: 'num', html: d3.f('Revenue', d3.format('$,'))}
//];

 var table_width=300;
 for (i = 0; i < 1; i++) {
     var donut = donutChart()
     .width(elementWidth-20)
     .height((0.69*elementWidth)-20)
     .cornerRadius(3) // sets how rounded the corners are on each slice
     .padAngle(0.015) // effectively dictates the gap between slices
     .variable('Revenue')
     .category('Day');
 
 
     //console.log(data[i].data)
     d3.select('#peakDaySplit_div1')
         .datum(data) // bind data to the div
         .call(donut); // draw chart in div

    
 
     function donutChart() {
        var myColor=d3.scaleOrdinal()
        .domain(data)
        .range(["#003f5c", "#58508d" ,"#bc5090","#ff6361", "#ffa600"]);

         var width,
             height,
             margin = {top: 10, right: 10, bottom: 10, left: 10},
             colour = myColor,//d3.scaleOrdinal(d3.schemeCategory10), // colour scheme
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
                 var svg1 = selection.append('svg')
                     .attr('width', width  + margin.left + margin.right)
                     .attr('height', height + margin.top + margin.bottom);
                //  .append('g')
                //      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
                    
                var svg = svg1.append("g").attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

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
                     .attr("font-size", ((bodyFont/750)*elementWidth*0.93)+'px')
                     .html(function(d) {
                         // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                         return d.data[category] + ': <tspan>$' + d.data[variable] + 'K</tspan>';
                     })
                     .attr('transform', function(d) {
 
                         // effectively computes the centre of the slice.
                         // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                         var pos = outerArc.centroid(d);
 
                         // changes the point to be on left or right depending on where label is.
                         pos[0] = radius * 0.88 * (midAngle(d) < Math.PI ? 1 : -1);
                         return 'translate(' + pos + ')';
                     })
                     .style('text-anchor', function(d) {
                         // if slice centre is on the left, anchor text to start, otherwise anchor to end
                         return (midAngle(d)) < Math.PI ? 'start' : 'end';
                     });
                 // ===========================================================================================
                 svg.append('text')
                 .attr('class', 'toolCircle')
                 .attr('dy', -35) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                 .html(function(d,i) {
                    tip=''
                    tip += '<tspan x="0">' + 'Hover Over the' + '</tspan>';
                    tip += '<tspan x="0" dy="1.2em">'  + " " + '</tspan>';
                    tip += '<tspan x="0" dy="1.2em">' + 'Donut Slice' + '</tspan>';
                    tip += '<tspan x="0" dy="1.2em">'  + " " + '</tspan>';
                    tip += '<tspan x="0" dy="1.2em">' + 'for More Details' + '</tspan>';
                    return tip
                          }) // add text to the circle.
                 .style('font-size', ((bodyFont/750)*elementWidth*1.5)+"px")
                 .style('text-anchor', 'middle'); // centres text in tooltip
                          
                 svg.append('circle')
                         .attr('class', 'toolCircle')
                         .attr('r', radius * 0.55) // radius of tooltip circle
                         .style('fill', "#a8a8a8") // colour based on category mouse is over
                         .style('fill-opacity', 0.35);



                 // ===========================================================================================
                 // add lines connecting labels to slice. A polyline creates straight lines connecting several points
                 var polyline = svg.select('.'+lines_v)
                     .selectAll('polyline')
                     .data(pie)
                 .enter().append('polyline')
                     .attr('points', function(d) {
 
                         // see label transform function for explanations of these three lines.
                         var pos = outerArc.centroid(d);
                         pos[0] = radius * 0.88 * (midAngle(d) < Math.PI ? 1 : -1);
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
                        d3.selectAll('.toolCircle').remove();
 
                         svg.append('text')
                             .attr('class', 'toolCircle')
                             .attr('dy', -35) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                             .html(toolTipHTML(data)) // add text to the circle.
                             .style('font-size', ((bodyFont/750)*elementWidth*1.5)+"px")
                             .style('text-anchor', 'middle'); // centres text in tooltip
 
                         svg.append('circle')
                             .attr('class', 'toolCircle')
                             .attr('r', radius * 0.55) // radius of tooltip circle
                             .style('fill', colour(data.data[category])) // colour based on category mouse is over
                             .style('fill-opacity', 0.35);
                        
                        var caption = d3.select('#peakDaySplit_div2_title')
                                            .append('text')
                                            .attr('class', 'toolTableTitle')
                                            .attr("width", (0.94*element2Width)-10)
                                            .attr("height", 40)
                                            
                                            .html(tableTitle(data)) // add text to the circle.
                                            .style('font-size', ((bodyFont/750)*elementWidth*1.2)+"px")
                                            .attr("font-weight", "700")
                                            .style('text-anchor', 'middle'); // centres text in tooltip

                                        

                        var table = d3.select('#peakDaySplit_div2_table')
                                    .append('table')
                                    .attr("width", element2Width-10)
                                    .attr("height", (element2Width*0.7)-10)
                                    .attr('class', 'toolTable');
                                    //.attr('transform', 'translate(' + 500 / 2 + ',' + height / 2 + ')');

                        table.append('thead').append('tr')
                        .selectAll('th')
                        .data(columns).enter()
                        .append('th')
                        .attr('class', d3.f('cl'))
                        .text(d3.f('head'))
                        .style('font-size', ((bodyFont/750)*elementWidth*1.2)+"px")
                        .style('background-color', colour(data.data[category])+"70");
                    
                        // create table body
                        table.append('tbody')
                            .selectAll('tr')
                            .data(tableHTML(data)).enter()
                            .append('tr')
                            .selectAll('td')
                            .data(function(row, i) {
                                return columns.map(function(c) {
                                    // compute cell values for this specific row
                                    var cell = {};
                                    d3.keys(c).forEach(function(k) {
                                        cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
                                    });
                                    return cell;
                                });
                            }).enter()
                            .append('td')
                            .html(d3.f('html'))
                            .attr('class', d3.f('cl'))
                            .style('font-size', ((bodyFont/750)*elementWidth*1.2)+"px")
                            .style('background', colour(data.data[category])+"35")
                        
                        function length() {
                            var fmt = d3.format('02d');
                            return function(l) { return Math.floor(l / 60) + ':' + fmt(l % 60) + ''; };
                        }
                    });
 
                     // remove the tooltip when mouse leaves the slice/label
                     selection.on('mouseout', function () {
                         d3.selectAll('.toolCircle').remove();
                         d3.selectAll('.toolTableTitle').remove();
                         d3.selectAll('.toolTable').remove();
                         svg.append('text')
                         .attr('class', 'toolCircle')
                         .attr('dy', -35) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                         .html(function(d,i) {
                            tip=''
                            tip += '<tspan x="0">' + 'Hover Over the' + '</tspan>';
                            tip += '<tspan x="0" dy="1.2em">'  + " " + '</tspan>';
                            tip += '<tspan x="0" dy="1.2em">' + 'Donut Slice' + '</tspan>';
                            tip += '<tspan x="0" dy="1.2em">'  + " " + '</tspan>';
                            tip += '<tspan x="0" dy="1.2em">' + 'for More Details' + '</tspan>';
                            return tip
                                  }) // add text to the circle.
                         .style('font-size', ((bodyFont/750)*elementWidth*1.5)+"px")
                         .style('text-anchor', 'middle'); // centres text in tooltip

                         svg.append('circle')
                         .attr('class', 'toolCircle')
                         .attr('r', radius * 0.55) // radius of tooltip circle
                         .style('fill', "#a8a8a8") // colour based on category mouse is over
                         .style('fill-opacity', 0.35);
                         

                     });
                 }
 
                 // function to create the HTML string for the tool tip. Loops through each key in data object
                 // and returns the html string key: value
                 function toolTipHTML(data) {
 
                     var tip = '',
                         i   = 0;
                     var tempData = data.data;
                     delete tempData["Revenue"]
                    var currentValue=tempData["Day"]
                    //console.log(currentValue);
                    //console.log(table_data[currentValue])
                     for (var key in tempData) {
 
                         // if value is a number, format it as a percentage
                         var value = tempData[key];
 
                         // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
                         // tspan effectively imitates a line break.
                         if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
                         else tip += '<tspan x="0" dy="1.2em">'  + " " + '</tspan>'+'<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
                         i++;
                     }
 
                     return tip;
                 }


                 function tableTitle(data) {
                        
                    var tempData = data.data;
                    var currentValue=tempData["Day"]
                    var title = '<tspan x="0">' + 'Top Products: ' + currentValue + '</tspan>';
                    return title;
                }

                 function tableHTML(data) {
                    var tempData = data.data;
                    var currentValue=tempData["Day"];

                    var tempTableData=table_data[currentValue];
                    var tip = '',
                         i   = 0;
                    tip += 'Product' + '</tspan>' + 'Orders' + '</tspan>' + 'Revenue';
                    for (var key in table_data) {
                        // if value is a number, format it as a percentage
                        
                        if(key == currentValue) tempTableData = table_data[key];
                    };
                    return tempTableData;
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
 
 
 