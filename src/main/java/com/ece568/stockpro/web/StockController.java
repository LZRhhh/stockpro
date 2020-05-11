package com.ece568.stockpro.web;

import com.ece568.stockpro.mapper.HistoricalMapper;
import com.ece568.stockpro.mapper.PredictMapper;
import com.ece568.stockpro.mapper.RealtimeMapper;
import com.ece568.stockpro.mapper.StockInfoMapper;
import com.ece568.stockpro.pojo.HistoricalData;
import com.ece568.stockpro.pojo.PredictData;
import com.ece568.stockpro.pojo.RealtimeData;
import com.ece568.stockpro.pojo.StockInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class StockController {
    @Autowired
    StockInfoMapper stockInfoMapper;
    @Autowired
    HistoricalMapper historicalMapper;
    @Autowired
    RealtimeMapper realtimeMapper;
    @Autowired
    PredictMapper predictMapper;

    @GetMapping("/api/stocklist")
    public List<StockInfo> listStock(){
        return stockInfoMapper.findAll();
    }

    @GetMapping("/api/history")
    public List<HistoricalData> listHis(@Param("symbol") String symbol, @Param("num") String num){
        if(num==null){
            List<HistoricalData> list = historicalMapper.findBySymbol(symbol);
            Collections.sort(list);
            return list;
        }
        else {
            int n = Integer.parseInt(num) +1;
            List<HistoricalData> list = historicalMapper.getBySymbol(symbol, n);
            if(list.get(0).getEma()==0)
                list.remove(0);
            return list;
        }
    }

    @GetMapping("/api/realtime")
    public List<RealtimeData> listReal(@Param("symbol") String symbol){
        List<RealtimeData> list = realtimeMapper.findBySymbol(symbol);
        Collections.sort(list);
        return list;
    }

    @GetMapping("/api/predict")
    public PredictData listPre(@Param("symbol") String symbol){
//        System.out.println(symbol);
        PredictData data = predictMapper.findBySymbol(symbol).get(0);
//        System.out.println(data.getSymbol());
        return data;
    }
}