google.charts.load('current',{'packages':['corechart','controls']});
google.charts.setOnLoadCallback(drawAllSheets);
var vtitle1 = "In Billions ($)";
var twoQuery=0;
var data1Query = 0;
var data2Query = 0;
var vtitle2 ="GDPOverall (in Billion $) vs GDPPerCapita (in $)"
var twoQuery1=0;
var twoQuery2=0;
var twoQuery3=0;
var oldData = 0;
var newData = 0;
var overallElement = d3.select('.summaryLevel').node();
var overallWidth=overallElement.getBoundingClientRect().width;


function checkColumn(input_value) {
    input_value=input_value-1;
    var quotient = Math.floor(input_value/26);
    var remainder = input_value % 26;
    if (quotient<1) {
        var outputColumn=String.fromCharCode('A'.charCodeAt() + (remainder));
        }
    else {
        var outputColumn=String.fromCharCode('A'.charCodeAt() + (quotient-1))+String.fromCharCode('A'.charCodeAt() + (remainder));
    }
    return outputColumn;
};


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function drawAllSheets() {
    drawSheetName('Overall_Summary','SELECT A,B,C,D',summaryResponseHandler);
    drawSheetName('Overall_Perfomance','SELECT B,D',yearlyPerformanceResponseHandler);
    sleep(500);
    drawSheetName('Overall_Perfomance','SELECT B,C',yearlyPerformanceResponseHandler);
    drawSheetName('Overall_Perfomance','SELECT B,C',yearlyPerformanceResponseHandler);
    drawSheetName('Channel_Data','SELECT A,B,C,D,E,F,G', channelPerformanceResponseHandler);

    
} //drawAllSheets

function drawSheetName(sheetName, query, responseHandler) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1Vg-s8YHljB-YEuiKsWi5fWxqzuNdjS6QKSvWGLI7VRY/gviz/tq?sheet='
                + sheetName + '&headers=1&tq=' + queryString); //Query
    query.send(responseHandler);
}

function checkError(response) {
    if(response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return
    }
}


function summaryResponseHandler(response) {

    var chartData=response.getDataTable();
    var summaryChart1 = new google.visualization.ColumnChart(document.getElementById('summaryLevel1_div'));
    var summaryChart2 = new google.visualization.ColumnChart(document.getElementById('summaryLevel2_div'));
    var summaryChart3 = new google.visualization.ColumnChart(document.getElementById('summaryLevel3_div'));

    var dataView1 = new google.visualization.DataView(chartData);
    var dataView2 = new google.visualization.DataView(chartData);
    var dataView3 = new google.visualization.DataView(chartData);
    

    dataView1.setRows([0]);
    dataView2.setRows([1]);
    dataView3.setRows([2]);

    var options1 = {
        legend: { position: 'none' },
        //backgroundColor: "#f5f8fd",
        series: {
            0: {color: "#003f5c"},
            1: {color: "#bc5090"},
            2: {color: "#ffa600"}
        },
        chartArea:{
            top:5,
            width: (222/1110)*overallWidth,
            height: (463/1110)*overallWidth},
        vAxis:{gridlines:{color:'transparent'},
        ticks: [0,350,700,1050,1400,1750,2100] }
    };

    summaryChart1.draw(dataView1,options1);

    //var colChartDiff2 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance2_div'));
    //var diffData2 = colChartDiff2.computeDiff(oldView2, newView2);
    var options2 = {
        legend: { position: 'none' },
        //backgroundColor: "#f5f8fd",
        series: {
            0: {color: "#003f5c"},
            1: {color: "#bc5090"},
            2: {color: "#ffa600"}
        },
        chartArea:{
            top:5,
            width: (222/1110)*overallWidth,
            height: (463/1110)*overallWidth},
        vAxis:{gridlines:{color:'transparent'},
        ticks: [0,50,100,150,200,250,300] }
    };
    summaryChart2.draw(dataView2,options2);

    //var colChartDiff3 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance3_div'));
    //var diffData3 = colChartDiff3.computeDiff(oldView3, newView3);
    var options3 = {
        legend: { position: 'right' },
        //backgroundColor: "#f5f8fd",
        series: {
            0: {color: "#003f5c"},
            1: {color: "#bc5090"},
            2: {color: "#ffa600"}
        },
        chartArea:{
            top:5,
            width: (222/1110)*overallWidth,
            height: (463/1110)*overallWidth},
        vAxis:{gridlines:{color:'transparent'},
        ticks: [0,250,500,750,1000,1250,1500] }
    };

    summaryChart3.draw(dataView3,options3);

}//summaryResponseHandler



function yearlyPerformanceResponseHandler(response) {
    checkError(response);
    if (twoQuery2==0) {
        oldData=response.getDataTable();
        twoQuery2=1;
    }
    else {
        twoQuery2=0;
        newData=response.getDataTable();

        var colChartDiff1 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance1_div'));
        var colChartDiff2 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance2_div'));
        var colChartDiff3 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance3_div'));



        if (oldData.getColumnLabel(1)=="Non-Holiday") {
            oldData.setColumnLabel(1,newData.getColumnLabel(1));
            var oldView1 = new google.visualization.DataView(oldData);
            var oldView2 = new google.visualization.DataView(oldData);
            var oldView3 = new google.visualization.DataView(oldData);
            var newView1 = new google.visualization.DataView(newData);
            var newView2 = new google.visualization.DataView(newData);
            var newView3 = new google.visualization.DataView(newData);
        }
        else {
            newData.setColumnLabel(1,oldData.getColumnLabel(1));
            var oldView1 = new google.visualization.DataView(newData);
            var oldView2 = new google.visualization.DataView(newData);
            var oldView3 = new google.visualization.DataView(newData);
            var newView1 = new google.visualization.DataView(oldData);
            var newView2 = new google.visualization.DataView(oldData);
            var newView3 = new google.visualization.DataView(oldData);
        }

        oldView1.setRows([0,1,2]);
        oldView2.setRows([3,4,5]);
        oldView3.setRows([6,7,8]);
        newView1.setRows([0,1,2]);
        newView2.setRows([3,4,5]);
        newView3.setRows([6,7,8]);
        var diffData1 = colChartDiff1.computeDiff(oldView1, newView1);
        var diffData2 = colChartDiff2.computeDiff(oldView2, newView2);
        var diffData3 = colChartDiff3.computeDiff(oldView3, newView3);
        //var colChartDiff1 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance1_div'));
        //var diffData1 = colChartDiff1.computeDiff(oldView1, newView1);
        var options1 = {
            //title: "Visits (in Millions)",
            legend: { position: 'none' },
            tooltip: {trigger: "none"},
            series: {
                0: {color: "#003f5c" }
            },
            hAxis: {
                title: "Visits (in Thousands)"
              },
            vAxis:{
                  gridlines:{
                      count:0 },
                      ticks: [0,300,600,900,1200] },
            chartArea:{
                    top:5,
                    width: (250/1110)*overallWidth,
                    height: "90%" }
              
        };

        colChartDiff1.draw(diffData1,options1);

        //var colChartDiff2 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance2_div'));
        //var diffData2 = colChartDiff2.computeDiff(oldView2, newView2);
        var options2 = {
            //title: "Orders (in Millions)",
            legend: { position: 'none' },
            tooltip: {trigger: "none"},
            series: {
                0: {color: "#bc5090"}
            },
            hAxis: {
                title: "Orders (in Thousands)"
              },
            vAxis:{
                  gridlines:{
                      count:0 },
                      ticks: [0,40,80,120,160] },
            chartArea:{
                    top:5,
                    width: (250/1110)*overallWidth,
                    height: "90%" }
        };
        colChartDiff2.draw(diffData2,options2);

        //var colChartDiff3 = new google.visualization.ColumnChart(document.getElementById('yearlyPerformance3_div'));
        //var diffData3 = colChartDiff3.computeDiff(oldView3, newView3);
        var options3 = {
            //title: "Revenue (in Million ($))",
            legend: { position: 'none' },
            tooltip: {trigger: "none"},
            series: {
                0: {color: "#ffa600"}
            },
            hAxis: {
                title: "Revenue (in Thousand ($))"
              },
            vAxis:{
                  gridlines:{
                      count:0 },
                ticks: [0,200,400,600,800] },
            chartArea:{
                    top:5,
                    width: (250/1110)*overallWidth,
                    height: "90%" }
        };
        
        colChartDiff3.draw(diffData3,options3);

    }}//yearlyPerformanceResponseHandler


function channelPerformanceResponseHandler(response) {

    var chartData=response.getDataTable();
    console.log(chartData)
    var chart = new google.visualization.ComboChart(document.getElementById('channelPerformance_div'));
    
    var options = {
        //vAxis: {title: 'Visits'},
        seriesType: 'bars',
        hAxis: {gridlines: {color: 'transparent'}},
        
        vAxes: {
            0: {
                title:'Visits',
                minorGridlines: {color: 'transparent'}
                //textStyle: {color: 'orange'}
              },
                  1: {
                    title:'Order Conversion Rate',
                    minorGridlines: {color: 'transparent'},
                    textStyle: {color: '#003f5c'}
                  }},
        series: {
            0: {color: "#444e86"},
            1: {color: "#955196"},
            2: {color: "#dd5182"},
            3: {color: "#ff6e54"},
            4: {color: "#ffa600"},

            5: {type: 'line', targetAxisIndex:1, color:"#003f5c"}},  
        isStacked: true,
        chartArea:{
                top:60,
                width: "80%",
                height: "80%" }
         };

    chart.draw(chartData,options);

}//c2Chart2ResponseHandler




$("document").ready(function() {
    setTimeout(function() {
        $(".chooseFirstFilter").trigger('click');
    },1000);
});

window.addEventListener('load', function(){
    var checkglider = document.querySelectorAll('.glider');
    console.log(checkglider);
    checkglider.forEach(function(d){
        new Glider(d, {
            slidesToShow: 1,
            dots: '#dots',
            draggable: true,
            arrows: {
              prev: '.glider-prev',
              next: '.glider-next'
            }
        })

    })

  })
