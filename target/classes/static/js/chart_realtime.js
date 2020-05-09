
var chart_realtime = echarts.init(document.getElementById('chart-realtime'));
var data0 = [];
// console.log(data0)

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
        data: data0.values,
        smooth: false,
        lineStyle: {
            normal: {
                opacity: 0.5,
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
                    if(params.dataIndex == 0)
                        colorList = '#ef232a';
                    else if (data0.values[params.dataIndex] > data0.values[params.dataIndex-1]) {
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



chart_realtime.setOption(option);
$(document).ready(function(){
    const url0 = "/api/realtime";
    // ajax异步请求
    // 待修改：symbol 需要输入/选择
    $.get(url0, {"symbol": "IBM"}, function(res0, status){

        var data0 = []
        for(var i in res0){
            data0.unshift([
                res0[i].time,
                res0[i].price,
                res0[i].volume
            ])
        }
        // console.log(data0)
        data0 = splitData0(data0);
        // console.log(data0)

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
                data: data0.values,
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
                data: data0.vols,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList;
                            if(params.dataIndex == 0)
                                colorList = '#ef232a';
                            else if (data0.values[params.dataIndex] > data0.values[params.dataIndex-1]) {
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



        chart_realtime.setOption(option);
    });
});


function splitData0(rawData) {
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
