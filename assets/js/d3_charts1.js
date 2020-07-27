// create svg element
data=[{"Product Category":"Electronic","Relative Sensitivity":0.290780142,"Sensitivity":0.41,"Order Share":0.49,"Revenue Share":0.53},{"Product Category":"Home & Furnishing","Relative Sensitivity":0.205673759,"Sensitivity":0.29,"Order Share":0.25,"Revenue Share":0.17},{"Product Category":"Beauty & Accessory","Relative Sensitivity":0.19858156,"Sensitivity":0.28,"Order Share":0.13,"Revenue Share":0.08},{"Product Category":"Clothing","Relative Sensitivity":0.170212766,"Sensitivity":0.24,"Order Share":0.13,"Revenue Share":0.09},{"Product Category":"Everyday Living","Relative Sensitivity":0.134751773,"Sensitivity":0.19,"Order Share":0.19,"Revenue Share":0.08}];

chart_data=[{"width":380, "height": 380,"centerx":190,"centery":190, "outerR1":101, "innerR1":90, "outerR2":114, "innerR2":76,  "outerR3":114, "innerR3":101, "midR3":108,
            "l1x":328,"l1y":140, "l2x":328,"l2y":152, "l3x":357,"l3y":200,"l4x":357,"l4y":212,"l5x":190,"l5y":210,"l6x":194,"l6y":248,"point1":328,"point2":160,
            "f1":"15px","f2":"12px", "f3":"18px", "f4": "35px","imgp1": 150, "imgp2":112,"size1":"80px","size2":"80px"},{"width":380, "height": 380,"centerx":190,"centery":190, "outerR1":101, "innerR1":90, "outerR2":114, "innerR2":76,  "outerR3":114, "innerR3":101, "midR3":108,
            "l1x":328,"l1y":140, "l2x":328,"l2y":152, "l3x":357,"l3y":200,"l4x":357,"l4y":212,"l5x":196,"l5y":210,"l6x":194,"l6y":248,"point1":328,"point2":160,
            "f1":"15px","f2":"12px", "f3":"18px", "f4": "35px","imgp1": 129, "imgp2":112,"size1":"90px","size2":"120px"},{"width":380, "height": 380,"centerx":190,"centery":190, "outerR1":101, "innerR1":90, "outerR2":114, "innerR2":76,  "outerR3":114, "innerR3":101, "midR3":108,
            "l1x":328,"l1y":140, "l2x":328,"l2y":152, "l3x":357,"l3y":200,"l4x":357,"l4y":212,"l5x":196,"l5y":210,"l6x":194,"l6y":248,"point1":328,"point2":160,
            "f1":"15px","f2":"12px", "f3":"18px", "f4": "35px","imgp1": 150, "imgp2":112,"size1":"80px","size2":"80px"},
            
            {"width":285, "height": 285,"centerx":142,"centery":142, "outerR1":76, "innerR1":68, "outerR2":86, "innerR2":57,  "outerR3":86, "innerR3":76, "midR3":81,
            "l1x":234,"l1y":100, "l2x":234,"l2y":110, "l3x":262,"l3y":140,"l4x":262,"l4y":148,"l5x":142,"l5y":158,"l6x":145,"l6y":188,"point1":234,"point2":118,
            "f1":"12px","f2":"10px", "f3":"15px", "f4": "30px", "imgp1": 112, "imgp2":86,"size1":"60px","size2":"60px"},{"width":285, "height": 285,"centerx":142,"centery":142, "outerR1":76, "innerR1":68, "outerR2":86, "innerR2":57,  "outerR3":86, "innerR3":76, "midR3":81,
            "l1x":234,"l1y":100, "l2x":234,"l2y":110, "l3x":262,"l3y":140,"l4x":262,"l4y":148,"l5x":142,"l5y":158,"l6x":145,"l6y":188,"point1":234,"point2":118,
            "f1":"12px","f2":"10px", "f3":"15px", "f4": "30px", "imgp1": 112, "imgp2":86,"size1":"60px","size2":"60px"}]


//console.log(data)
//console.log(data.length)

for (i = 0; i < data.length; i++) {
var temp_data = data[i];

    var svg = d3.select("#categoryChart"+(i+1))
    .append("svg")
    .attr("width", chart_data[i].width)
    .attr("height", chart_data[i].height);

var scale1 = d3.scaleLinear()
    .domain([0,0.5])
    .range([3.145, 6.28]);

var scale2 = d3.scaleLinear()
    .domain([0,0.6])
    .range([3.135, 0]);
svg
    .append("path")
    .attr("transform", "translate("+chart_data[i].centerx+","+chart_data[i].centery+")")
    .attr("d", d3.arc()
      .innerRadius( chart_data[i].innerR1 )
      .outerRadius( chart_data[i].outerR1 )
      .startAngle( 3.14 )     // It's in radian, so Pi = 3.14 = bottom.
      .endAngle( -3.14 )       // 2*Pi = 6.28 = top
      )
    //.attr('stroke', 'black')
    .attr('fill', '#ECEBEC');

// add an arc
//console.log(temp_data["Sensitivity"])
//console.log(scale1(temp_data["Sensitivity"]))
var angle1 = scale1(temp_data["Sensitivity"]);
var angle2 = scale2(temp_data["Order Share"]);
var color;
svg
  .append("path")
  .attr("transform", "translate("+chart_data[i].centerx+","+chart_data[i].centery+")")
  .attr("d", d3.arc()
    .innerRadius( chart_data[i].innerR2 )
    .outerRadius( chart_data[i].outerR2 )
    .startAngle( 3.145 )     // It's in radian, so Pi = 3.14 = bottom.
    .endAngle( angle1 )       // 2*Pi = 6.28 = top
    )
  .attr('fill', function(){
      if (angle1>5.235){
          color = '#95BB63'
          return color;
      } else if(angle1>4.7){
          color = '#F5D749';
          return color;
      }
      else{
          color = '#D88449';
          return color
      }
    });

svg
  .append("path")
  .attr("transform", "translate("+chart_data[i].centerx+","+chart_data[i].centery+")")
  .attr("d", d3.arc()
    .innerRadius( chart_data[i].innerR3 )
    .outerRadius( chart_data[i].outerR3 )
    .startAngle( 3.135 )     // It's in radian, so Pi = 3.14 = bottom.
    .endAngle( angle2 )       // 2*Pi = 6.28 = top
    )
  //.attr('stroke', 'black')
  .attr('fill', '#ECBE63');


var outerArc = d3.arc()
.outerRadius(chart_data[i].outerR3)
.innerRadius(chart_data[i].innerR3);




var label1 = svg.append("text")
.attr("y", chart_data[i].l1y)
.attr("x", chart_data[i].l1x)
.attr("font-size", chart_data[i].f1)
.attr("text-anchor", "middle")
//.attr("transform", "rotate(-90)")
.text((temp_data["Order Share"]*100)+"%");

var label2 = svg.append("text")
.attr("y", chart_data[i].l2y)
.attr("x", chart_data[i].l2x)
.attr("font-size", chart_data[i].f2)
.attr("text-anchor", "middle")
//.attr("transform", "rotate(-90)")
.text("Order");

var label3 = svg.append("text")
.attr("y", chart_data[i].l3y)
.attr("x", chart_data[i].l3x)
.attr("font-size", chart_data[i].f1)
.attr("text-anchor", "middle")
//.attr("transform", "rotate(-90)")
.text((temp_data["Revenue Share"]*100)+"%");

var label4 = svg.append("text")
.attr("y", chart_data[i].l4y)
.attr("x", chart_data[i].l4x)
.attr("font-size", chart_data[i].f2)
.attr("text-anchor", "middle")
//.attr("transform", "rotate(-90)")
.text("Revenue");

var label5 = svg.append("text")
.attr("y", chart_data[i].l5y)
.attr("x", chart_data[i].l5x)
.attr("font-size", chart_data[i].f3)
.attr("text-anchor", "middle")
.style('fill', color)
//.attr("transform", "rotate(-90)")
.text(temp_data["Product Category"]);

var label6 = svg.append("text")
.attr("y", chart_data[i].l6y)
.attr("x", chart_data[i].l6x)
.attr("font-size", chart_data[i].f4)
.attr("text-anchor", "middle")
.attr("font-weight", "700")
.style('fill', color)
//.attr("transform", "rotate(-90)")
.text(d3.format(".0f")(temp_data["Sensitivity"]*100)+"%");



var midAngle = 3.135 - (angle2+3.135)/2;
var pointStart = [chart_data[i].centerx + chart_data[i].midR3*Math.sin(midAngle), chart_data[i].centery + chart_data[i].midR3*Math.cos(midAngle)];

var polyline = svg.append('polyline')
    .attr('points', [pointStart,chart_data[i].point1,pointStart[1], chart_data[i].point1,chart_data[i].point2])
    .style("stroke-dasharray", "4,4");

var image = svg.append("image")
      .attr("x",chart_data[i].imgp1 )
      .attr("y", chart_data[i].imgp2)
      .attr("height", chart_data[i].size1)
      .attr("width", chart_data[i].size2)
      .attr("xlink:href", "assets/img/d3Images/"+(i+1)+".png")
    
  }
