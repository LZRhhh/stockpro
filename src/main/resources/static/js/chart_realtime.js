
var myChart = echarts.init(document.getElementById('main'));

$(document).ready(function(){
    const url = "/api/history";
    // ajax异步请求
    // 待修改：symbol 需要输入/选择
    $.get(url, {"symbol": "IBM"}, function(res, status){

        var data = []
        for(var i in res){
            data.unshift([
                res[i].date,
                res[i].open,
                res[i].close,
                res[i].low,
                res[i].high,
                res[i].volume
            ])
        }

        var data0 = splitData(data);
        console.log(data0)

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
                data: data0.categoryData,
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
                data: data0.categoryData,
                axisLabel: {
                    show: false
                },

            }, {
                type: 'category',
                gridIndex: 2,
                data: data0.categoryData,
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
                data: data0.values,
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
                data: calculateMA(5, data0),
                smooth: true,
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                }
            }, {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, data0),
                smooth: true,
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                }
            }, {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, data0),
                smooth: true,
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                }
            }, {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, data0),
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
                data: data0.vols,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList;
                            if (data0.values[params.dataIndex][1] > data0.values[params.dataIndex][0]) {
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
                data: data0.macds,
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
                data: data0.difs
            }, {
                name: 'DEA',
                type: 'line',
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: data0.deas
            }]
        };



        myChart.setOption(option);
    });
});

function calculateMA(dayCount, data0) {
    var result = [];
    len = data0.values.length;
    for (var i = 0; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
        }

        result.push(sum / dayCount);

    }

    return result;
}

function splitData(rawData) {
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
        macds.push(rawData[i][6]);
        difs.push(rawData[i][7]);
        deas.push(rawData[i][8]);
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
