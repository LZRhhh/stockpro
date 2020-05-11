const url_pre = '/api/predict';

$(document).ready(function() {
    var symbol = $('.selectpicker').val();
    loadData(symbol);
    $("td,th").addClass("text-center");
});

$('.selectpicker').change(function(){

    //刷新后需要删除之前的数据
    $('#predict-table').bootstrapTable('remove', {field: 'name', values: ['Bayes', 'SVM', 'LSTM']});
    $('#indicator-table').bootstrapTable('remove', {field: 'name', values: ['SMA', 'EMA', 'MACD', 'CCI']});
    var symbol = $('.selectpicker').val();
    loadData(symbol);
    $("td,th,tr,tbody").addClass("text-center");
});

function loadData(symbol) {
    $.get(url_pre, {"symbol": symbol}, function (res) {
        console.log(res);
        $.get(url_his, {"symbol": symbol, "num": 1}, function (res1) {
            console.log(res1);
            var preData = [];
            preData.push({
                name: 'Bayes',
                data: res.bayes.toFixed(4),
                trend: ((res.bayes - res1[0].close)/res1[0].close * 100).toFixed(4) + '%'
            });
            preData.push({
                name: 'SVM',
                data: res.svm.toFixed(4),
                trend: ((res.svm - res1[0].close)/res1[0].close * 100).toFixed(4) + '%'
            });
            preData.push({
                name: 'LSTM',
                data: res.lstm.toFixed(4),
                trend: ((res.lstm - res1[0].close)/res1[0].close * 100).toFixed(4) + '%'
            });
            var inData = [];
            inData.push({
                name: 'SMA',
                data: res1[0].sma,
                coef: res.c_sma.toFixed(4)
            });
            inData.push({
                name: 'EMA',
                data: res1[0].ema,
                coef: res.c_ema.toFixed(4)
            });
            inData.push({
                name: 'MACD',
                data: res1[0].macd,
                coef: res.c_macd.toFixed(4)
            });
            inData.push({
                name: 'CCI',
                data: res1[0].cci,
                coef: res.c_cci.toFixed(4)
            });
            console.log(inData);
            $('#predict-table').bootstrapTable('append', preData);
            $('#indicator-table').bootstrapTable('append', inData);
        });
    })
}