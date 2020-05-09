
var chart_history = echarts.init(document.getElementById('chart-history'));
var data = [];
var option = get_his_option(data);
chart_history.setOption(option);
const url_real = "/api/history";
$(document).ready(function(){
    var symbol = $('.selectpicker').val();
    show_history(symbol);

});
$('.selectpicker').change(function(){
    var symbol = $(this).val();
    show_history(symbol);
});



function show_history(symbol){
    $.get(url_real, {"symbol": symbol}, function(res1, status){

        var data = []
        for(var i in res1){
            data.unshift([
                res1[i].date,
                res1[i].open,
                res1[i].close,
                res1[i].low,
                res1[i].high,
                res1[i].volume
            ])
        }

        data = split_history(data);
        // console.log(data)

        var option = get_his_option(data)
        chart_history.setOption(option);
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
            height: '58%'
        }, {
            left: '3%',
            right: '10%',
            top: '65%',
            height: '10%'
        }, {
            left: '3%',
            right: '10%',
            top: '78%',
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

        }, {
            type: 'category',
            gridIndex: 2,
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
        }, {
            gridIndex: 2,
            splitNumber: 4,
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
        }],
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
            xAxisIndex: [0, 2],
            type: 'slider',
            start: 20,
            end: 100
        }],
        series: [{
            name: 'value',
            type: 'candlestick',
            data: data.values,
            markPoint: {
                data: [{
                    name: 'XX标点'
                }]
            },
            markLine: {
                silent: true,
                data: [{
                    yAxis: 2222,
                }]
            }
        }, {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5, data),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        }, {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10, data),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        }, {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20, data),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        }, {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30, data),
            smooth: true,
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
                        if (data.values[params.dataIndex][1] > data.values[params.dataIndex][0]) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    },
                }
            }
        }, {
            name: 'MACD',
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
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
            name: 'DIF',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: data.difs
        }, {
            name: 'DEA',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: data.deas
        }]
    };
    return option;
}


function calculateMA(dayCount, data) {
    var result = [];
    len = data.values.length;
    for (var i = 0; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }

        result.push(sum / dayCount);

    }

    return result;
}

function split_history(rawData) {
    var categoryData = [];
    var values = [];
    var vols = [];
    var macds = [];
    var difs = [];
    var deas = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
        vols.push(rawData[i][4]);
    }
    return {
        categoryData: categoryData,
        values: values,
        vols: vols,
        macds: macds,
        difs: difs,
        deas: deas
    };
}
