package com.ece568.stockpro.mapper;

import com.ece568.stockpro.StockApplication;
import com.ece568.stockpro.pojo.HistoricalData;
import com.ece568.stockpro.pojo.RealtimeData;
import com.ece568.stockpro.pojo.StockInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StockApplication.class)
public class TestMapper {

    @Resource
    StockInfoMapper stockInfoMapper;
    @Resource
    RealtimeMapper realtimeMapper;
    @Resource
    HistoricalMapper historicalMapper;

    @Test
    public void testStockInfo(){
        List<StockInfo> list = stockInfoMapper.findAll();
        for(StockInfo stock : list){
            System.out.println(stock.getSymbol());
        }
//        System.out.println("test");
    }

    @Test
    public void testRealtime(){
        String[] symbols = {"GOOG", "BABA"};
        for(String symbol : symbols){
            List<RealtimeData> rList = realtimeMapper.findBySymbol(symbol);
            for(RealtimeData rData : rList){
                System.out.println(rData.getPrice());
            }
        }
    }
    @Test
    public void testHistorical(){
        String[] symbols = {"GOOG", "BABA"};
        for(String symbol : symbols){
            List<HistoricalData> rList = historicalMapper.findBySymbol(symbol);
            for(HistoricalData hData : rList){
                System.out.println(hData.getClose());
            }
        }
    }
}
