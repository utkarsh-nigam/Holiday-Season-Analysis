// create svg element
data=[{"Product Category":"GRATTOL","Relative Sensitivity":0.290780142,"Sensitivity":0.29,"Order Share":0.06,"Revenue Share":0.06},{"Product Category":"MASURA","Relative Sensitivity":0.205673759,"Sensitivity":0.21,"Order Share":0.06,"Revenue Share":0.04},{"Product Category":"INGARDEN","Relative Sensitivity":0.19858156,"Sensitivity":0.21,"Order Share":0.04,"Revenue Share":0.03},{"Product Category":"IRISK","Relative Sensitivity":0.170212766,"Sensitivity":0.19,"Order Share":0.09,"Revenue Share":0.06},{"Product Category":"RUNAIL","Relative Sensitivity":0.134751773,"Sensitivity":0.18,"Order Share":0.15,"Revenue Share":0.09}];

//var chartArea = d3.select('#categoryCharts').node();
//var chartAreaHeight=chartArea.getBoundingClientRect().height;

//console.log("Height="+chartAreaHeight)


var chartArea1 = d3.select('#categoryChart1').node();
var chartAreaWidth1=chartArea1.getBoundingClientRect().width;

var actualHeight1=380;
var actualWidth1=370
var chartAreaHeight1 = (actualHeight1/actualWidth1)*chartAreaWidth1;


var chartArea2 = d3.select('#categoryChart4').node();
var chartAreaWidth2=chartArea2.getBoundingClientRect().width;

var actualHeight2=285;
var actualWidth2=285
var chartAreaHeight2 = (actualHeight2/actualWidth2)*chartAreaWidth2;



var actualFont=15

var chartFont=(15/actualWidth1)*chartAreaWidth1



chart_data=[{"width":chartAreaWidth1, "height": chartAreaHeight1,"centerx":(chartAreaWidth1/2)-((20/actualWidth1)*chartAreaWidth1),"centery":(chartAreaHeight1/2), "outerR1":(101/actualWidth1)*chartAreaWidth1, "innerR1":(90/actualWidth1)*chartAreaWidth1, "outerR2":(114/actualWidth1)*chartAreaWidth1, "innerR2":(76/actualWidth1)*chartAreaWidth1,  "outerR3":(114/actualWidth1)*chartAreaWidth1, "innerR3":(101/actualWidth1)*chartAreaWidth1, "midR3":(108/actualWidth1)*chartAreaWidth1,
            "l1x":(303/actualWidth1)*chartAreaWidth1,"l1y":(140/actualHeight1)*chartAreaHeight1, "l2x":(303/actualWidth1)*chartAreaWidth1,"l2y":(152/actualHeight1)*chartAreaHeight1, "l3x":(332/actualWidth1)*chartAreaWidth1,"l3y":(200/actualHeight1)*chartAreaHeight1,"l4x":(332/actualWidth1)*chartAreaWidth1,"l4y":(212/actualHeight1)*chartAreaHeight1,"l5x":(chartAreaWidth1/2)-((20/actualWidth1)*chartAreaWidth1),"l5y":(183/actualHeight1)*chartAreaHeight1,"l6x":(chartAreaWidth1/2)-((16/actualWidth1)*chartAreaWidth1),"l6y":(240/actualHeight1)*chartAreaHeight1,"point1":(303/actualWidth1)*chartAreaWidth1,"point2":(160/actualHeight1)*chartAreaHeight1,
            "f1":chartFont+"px","f2":(0.8*chartFont)+"px", "f3":(2*chartFont)+"px", "f4": (2.67*chartFont)+"px","imgp1": (chartAreaWidth1/2)-((20/actualWidth1)*chartAreaWidth1), "imgp2":(chartAreaHeight1/2)-((5/actualHeight1)*chartAreaHeight1),"size1":"80px","size2":"80px"},
            {"width":chartAreaWidth1, "height": chartAreaHeight1,"centerx":(chartAreaWidth1/2)-((20/actualWidth1)*chartAreaWidth1),"centery":(chartAreaHeight1/2), "outerR1":(101/actualWidth1)*chartAreaWidth1, "innerR1":(90/actualWidth1)*chartAreaWidth1, "outerR2":(114/actualWidth1)*chartAreaWidth1, "innerR2":(76/actualWidth1)*chartAreaWidth1,  "outerR3":(114/actualWidth1)*chartAreaWidth1, "innerR3":(101/actualWidth1)*chartAreaWidth1, "midR3":(108/actualWidth1)*chartAreaWidth1,
            "l1x":(303/actualWidth1)*chartAreaWidth1,"l1y":(140/actualHeight1)*chartAreaHeight1, "l2x":(303/actualWidth1)*chartAreaWidth1,"l2y":(152/actualHeight1)*chartAreaHeight1, "l3x":(332/actualWidth1)*chartAreaWidth1,"l3y":(200/actualHeight1)*chartAreaHeight1,"l4x":(332/actualWidth1)*chartAreaWidth1,"l4y":(212/actualHeight1)*chartAreaHeight1,"l5x":(chartAreaWidth1/2)-((20/actualWidth1)*chartAreaWidth1),"l5y":(183/actualHeight1)*chartAreaHeight1,"l6x":(chartAreaWidth1/2)-((16/actualWidth1)*chartAreaWidth1),"l6y":(240/actualHeight1)*chartAreaHeight1,"point1":(303/actualWidth1)*chartAreaWidth1,"point2":(160/actualHeight1)*chartAreaHeight1,
            "f1":chartFont+"px","f2":(0.8*chartFont)+"px", "f3":(2*chartFont)+"px", "f4": (3*chartFont)+"px","imgp1": ((104/actualWidth1)*chartAreaWidth1), "imgp2":((112/actualHeight1)*chartAreaHeight1),"size1":"90","size2":"120"},
            {"width":chartAreaWidth1, "height": chartAreaHeight1,"centerx":(chartAreaWidth1/2)-((20/actualWidth1)*chartAreaWidth1),"centery":(chartAreaHeight1/2), "outerR1":(101/actualWidth1)*chartAreaWidth1, "innerR1":(90/actualWidth1)*chartAreaWidth1, "outerR2":(114/actualWidth1)*chartAreaWidth1, "innerR2":(76/actualWidth1)*chartAreaWidth1,  "outerR3":(114/actualWidth1)*chartAreaWidth1, "innerR3":(101/actualWidth1)*chartAreaWidth1, "midR3":(108/actualWidth1)*chartAreaWidth1,
            "l1x":(303/actualWidth1)*chartAreaWidth1,"l1y":(140/actualHeight1)*chartAreaHeight1, "l2x":(303/actualWidth1)*chartAreaWidth1,"l2y":(152/actualHeight1)*chartAreaHeight1, "l3x":(332/actualWidth1)*chartAreaWidth1,"l3y":(200/actualHeight1)*chartAreaHeight1,"l4x":(332/actualWidth1)*chartAreaWidth1,"l4y":(212/actualHeight1)*chartAreaHeight1,"l5x":(chartAreaWidth1/2)-((20/actualWidth1)*chartAreaWidth1),"l5y":(183/actualHeight1)*chartAreaHeight1,"l6x":(chartAreaWidth1/2)-((16/actualWidth1)*chartAreaWidth1),"l6y":(240/actualHeight1)*chartAreaHeight1,"point1":(303/actualWidth1)*chartAreaWidth1,"point2":(160/actualHeight1)*chartAreaHeight1,
            "f1":chartFont+"px","f2":(0.8*chartFont)+"px", "f3":(2*chartFont)+"px", "f4": (3*chartFont)+"px","imgp1": ((125/actualWidth1)*chartAreaWidth1), "imgp2":((112/actualHeight1)*chartAreaHeight1),"size1":"80px","size2":"80px"},
            
            {"width":chartAreaWidth2, "height": chartAreaHeight2,"centerx":chartAreaWidth2/2,"centery":chartAreaHeight2/2, "outerR1":(76/actualWidth2)*chartAreaWidth2, "innerR1":(68/actualWidth2)*chartAreaWidth2, "outerR2":(86/actualWidth2)*chartAreaWidth2, "innerR2":(57/actualWidth2)*chartAreaWidth2,  "outerR3":(86/actualWidth2)*chartAreaWidth2, "innerR3":(76/actualWidth2)*chartAreaWidth2, "midR3":(81/actualWidth2)*chartAreaWidth2,
            "l1x":(234/actualWidth2)*chartAreaWidth2,"l1y":(100/actualHeight2)*chartAreaHeight2, "l2x":(234/actualWidth2)*chartAreaWidth2,"l2y":(110/actualHeight2)*chartAreaHeight2, "l3x":(262/actualWidth2)*chartAreaWidth2,"l3y":(140/actualHeight2)*chartAreaHeight2,"l4x":(262/actualWidth2)*chartAreaWidth2,"l4y":(148/actualHeight2)*chartAreaHeight2,"l5x":(143/actualWidth2)*chartAreaWidth2,"l5y":(138/actualHeight2)*chartAreaHeight2,"l6x":(145/actualWidth2)*chartAreaWidth2,"l6y":(182/actualHeight2)*chartAreaHeight2,"point1":(234/actualWidth2)*chartAreaWidth2,"point2":(118/actualHeight2)*chartAreaHeight2,
            "f1":(0.8*chartFont)+"px","f2":(0.67*chartFont)+"px", "f3":(1.53*chartFont)+"px", "f4": (2.26*chartFont)+"px", "imgp1": (112/actualWidth2)*chartAreaWidth2, "imgp2":(86/actualHeight2)*chartAreaHeight2,"size1":"60px","size2":"60px"},
            {"width":chartAreaWidth2, "height": chartAreaHeight2,"centerx":chartAreaWidth2/2,"centery":chartAreaHeight2/2, "outerR1":(76/actualWidth2)*chartAreaWidth2, "innerR1":(68/actualWidth2)*chartAreaWidth2, "outerR2":(86/actualWidth2)*chartAreaWidth2, "innerR2":(57/actualWidth2)*chartAreaWidth2,  "outerR3":(86/actualWidth2)*chartAreaWidth2, "innerR3":(76/actualWidth2)*chartAreaWidth2, "midR3":(81/actualWidth2)*chartAreaWidth2,
            "l1x":(234/actualWidth2)*chartAreaWidth2,"l1y":(100/actualHeight2)*chartAreaHeight2, "l2x":(234/actualWidth2)*chartAreaWidth2,"l2y":(110/actualHeight2)*chartAreaHeight2, "l3x":(262/actualWidth2)*chartAreaWidth2,"l3y":(140/actualHeight2)*chartAreaHeight2,"l4x":(262/actualWidth2)*chartAreaWidth2,"l4y":(148/actualHeight2)*chartAreaHeight2,"l5x":(143/actualWidth2)*chartAreaWidth2,"l5y":(138/actualHeight2)*chartAreaHeight2,"l6x":(145/actualWidth2)*chartAreaWidth2,"l6y":(182/actualHeight2)*chartAreaHeight2,"point1":(234/actualWidth2)*chartAreaWidth2,"point2":(118/actualHeight2)*chartAreaHeight2,
            "f1":(0.8*chartFont)+"px","f2":(0.67*chartFont)+"px", "f3":(1.53*chartFont)+"px", "f4": (2.26*chartFont)+"px", "imgp1": (112/actualWidth2)*chartAreaWidth2, "imgp2":(86/actualHeight2)*chartAreaHeight2,"size1":"60px","size2":"60px"}]


//console.log(data)
//console.log(data.length)

for (i = 0; i < data.length; i++) {
var temp_data = data[i];

    var svg = d3.select("#categoryChart"+(i+1))
    .append("svg")
    .attr("width", chart_data[i].width)
    .attr("height", chart_data[i].height);

var scale1 = d3.scaleLinear()
    .domain([0.05,0.35])
    .range([3.145, 6.28]);

var scale2 = d3.scaleLinear()
    .domain([0,0.25])
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
.attr("font-weight", "700")
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

    
  }
