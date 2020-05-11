const url_pre = '/api/predict';

function randomData() {
    var startId = ~~(Math.random() * 100);
    var rows = [];
    for (var i = 0; i < 10; i++) {
        rows.push({
            id: startId + i,
            name: 'test' + (startId + i),
            data:   startId + i,
            data1:  (startId + i)
        })
    }
    // console.log(rows);
    return rows;
}


$(document).ready(function() {
    var symbol = $('.selectpicker').val();
    loadData(symbol);
    $("td,th").addClass("text-center");
});

$('.selectpicker').change(function(){

    //刷新后需要删除之前的数据
    // $("#predict-table  tr:not(:first)").remove();
    // $("#indicator-table  tr:not(:first)").remove();
    var symbol = $('.selectpicker').val();
    loadData(symbol);
    $("td,th").addClass("text-center");
});

function loadData(symbol) {
    $.get(url_pre, {"symbol": symbol}, function (res) {
        console.log(res);
        $.get(url_his, {"symbol": symbol, "num": 1}, function (res1) {
            console.log(res1);
            var preData = [];
            preData.push({
                name: 'Bayes',
                data: res.bayes,
                trend: ((res.bayes - res1[0].close)/res1[0].close * 100).toFixed(4) + '%'
            });
            preData.push({
                name: 'SVM',
                data: res.svm,
                trend: ((res.svm - res1[0].close)/res1[0].close * 100).toFixed(4) + '%'
            });
            preData.push({
                name: 'LSTM',
                data: res.lstm,
                trend: ((res.lstm - res1[0].close)/res1[0].close * 100).toFixed(4) + '%'
            });
            var inData = [];
            inData.push({
                name: 'SMA',
                data: res1[0].sma,
                coef: res.c_sma
            });
            inData.push({
                name: 'EMA',
                data: res1[0].ema,
                coef: res.c_ema
            });
            inData.push({
                name: 'MACD',
                data: res1[0].macd,
                coef: res.c_macd
            });
            inData.push({
                name: 'CCI',
                data: res1[0].cci,
                coef: res.c_cci
            });
            console.log(inData);
            $('#predict-table').bootstrapTable('append', preData);
            $('#indicator-table').bootstrapTable('append', inData);
        });
    })
}