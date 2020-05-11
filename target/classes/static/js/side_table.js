
var chart_indicators = echarts.init(document.getElementById('chart-indicators'));
var data = [];
const url_his = "/api/history";
var option = get_his_option(data);
chart_indicators.setOption(option);
$(document).ready(function(){
    var symbol = $('.selectpicker').val();
    show_indicators(symbol);

});
$('.selectpicker').change(function(){
    var symbol = $(this).val();
    show_indicators(symbol);
});



function show_indicators(symbol){
    $.get(url_his, {"symbol": symbol}, function(res1, status){

        var data = []
        for(var i in res1){
            data.unshift([
                res1[i].date,
                res1[i].sma,
                res1[i].ema,
                res1[i].macd,
                res1[i].cci,
            ])
        }

        data = split_indicators(data);
        console.log(data)

        var option = get_his_option(data)
        chart_indicators.setOption(option);
    });
}

function get_his_option(data){
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: [{
            left: '3%',
            top: '1%',
            height: '88%'
        }],
        xAxis: [{
            type: 'category',
            data: data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: 'red',
                }
            },
            splitLine: {
                show: false
            },
            splitNumber: 20
        }],
        yAxis: [{
            scale: true,
            splitArea: {
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: 'red',
                }
            },
            position: 'right'
        }],
        dataZoom: [{
            type: 'inside',
            start: 100,
            end: 80
        }, {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100
        }, {
            show: false,
            type: 'slider',
            start: 20,
            end: 100
        }],
        series: [{
            name: 'MACD',
            type: 'bar',
            data: data.macds,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    },
                }
            }
        }, {
            name: 'SMA',
            type: 'line',
            data: data.smas
        }, {
            name: 'EMA',
            type: 'line',
            data: data.emas
        }, {
            name: 'CCI',
            type: 'line',
            data: data.ccis
        }]
    };
    return option;
}

function split_indicators(rawData) {
    var categoryData = [];
    var smas = [];
    var emas = [];
    var macds = [];
    var ccis = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i][0]);
        smas.push(rawData[i][1]);
        emas.push(rawData[i][2]);
        macds.push(rawData[i][3]);
        ccis.push(rawData[i][4]);
    }
    return {
        categoryData: categoryData,
        smas: smas,
        emas: emas,
        macds: macds,
        ccis: ccis
    };
}
