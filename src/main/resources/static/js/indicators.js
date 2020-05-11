var chart_sma = echarts.init(document.getElementById('chart-sma'));
var chart_ema = echarts.init(document.getElementById('chart-ema'));
var chart_macd = echarts.init(document.getElementById('chart-macd'));
var chart_cci = echarts.init(document.getElementById('chart-cci'));

const url_his = "/api/history";

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

        option['xAxis'] = [{
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
        }]
        var option0 = get_sma_option(data)
        chart_sma.setOption(option0);
        // console.log(option0)
        option0 = get_ema_option(data)
        chart_ema.setOption(option0);
        option0 = get_macd_option(data)
        chart_macd.setOption(option0);
        option0 = get_cci_option(data)
        chart_cci.setOption(option0);
    });
}

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
        height: '85%'
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
    }]
};

function get_sma_option(data){
    var option0 = {};
    for(var key in option){
        option0[key] = option[key]
    }
    option0['series']= [{
        name: 'SMA',
        type: 'line',
        data: data.smas
    }];
    return option0;
}

function get_ema_option(data){
    var option0 = {};
    for(var key in option){
        option0[key] = option[key]
    }
    option0['series']= [{
        name: 'EMA',
        type: 'line',
        data: data.emas
    }];
    return option0;
}

function get_macd_option(data){
    var option0 = {};
    for(var key in option){
        option0[key] = option[key]
    }
    option0['series']= [{
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
        },
        stack: 'one'
    }];
    return option0;
}

function get_cci_option(data){
    var option0 = {};
    for(var key in option){
        option0[key] = option[key]
    }
    option0['series']= [{
        name: 'CCI',
        type: 'line',
        data: data.ccis
    }];
    return option0;
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