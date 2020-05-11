
var chart_realtime = echarts.init(document.getElementById('chart-realtime'));
var data = [];
var option = get_real_option(data);
chart_realtime.setOption(option);
const url_real = "/api/realtime";
$(document).ready(function(){
    var symbol = $('.selectpicker').val();
    show_realtime(symbol);
});
$('.selectpicker').change(function(){
    var symbol = $(this).val();
    show_realtime(symbol);
});

function show_realtime(symbol) {
    $.get(url_real, {"symbol": symbol}, function(res, status){

        var data = []
        for(var i in res){
            data.unshift([
                res[i].time,
                res[i].price,
                res[i].volume
            ])
        }
        // console.log(data)
        data = split_realtime(data);
        // console.log(data)
        var option = get_real_option(data)
        chart_realtime.setOption(option);
    });
}

function get_real_option(data) {
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
            height: '68%'
        }, {
            left: '3%',
            right: '10%',
            top: '75%',
            height: '10%'
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
        }, {
            type: 'category',
            gridIndex: 1,
            data: data.categoryData,
            axisLabel: {
                show: false
            },

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
        }, {
            gridIndex: 1,
            splitNumber: 3,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: 'red'

                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true
            },
            position: 'right'
        }, ],
        dataZoom: [{
            type: 'inside',
            start: 100,
            end: 80
        }, {
            show: true,
            type: 'slider',
            y: '90%',
            xAxisIndex: [0, 1],
            start: 50,
            end: 100
        }, {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            start: 20,
            end: 100
        }],
        series: [{
            name: 'price',
            type: 'line',
            data: data.values,
            smooth: false,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        }, {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.vols,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if(params.dataIndex == 0)
                            colorList = '#ef232a';
                        else if (data.values[params.dataIndex] > data.values[params.dataIndex-1]) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    },
                }
            }
        }]
    };
    return option;
}

function split_realtime(rawData) {
    var categoryData = [];
    var values = [];
    var vols = [];

    for (var i = 0; i < rawData.length; i++) {
        // console.log(rawData[i]);
        categoryData.push(rawData[i][0]);
        values.push(rawData[i][1])
        vols.push(rawData[i][2]);
    }
    return {
        categoryData: categoryData,
        values: values,
        vols: vols,
    };
}
