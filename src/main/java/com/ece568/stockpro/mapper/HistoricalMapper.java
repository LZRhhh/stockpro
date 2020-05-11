package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.HistoricalData;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HistoricalMapper {
    @Select("select * from `historical_data` where symbol = #{symbol}")
    List<HistoricalData> findBySymbol(String symbol);

    @Select("select * from `historical_data` where symbol = #{symbol} order by date desc limit #{num}")
    List<HistoricalData> getBySymbol(String symbol, int num);

    @Insert("insert into historical_data (symbol, close, date, high, low, open, volume)" +
            "values (#{symbol}, #{close}, #{date}, #{high}, #{low}, #{open}, #{volume})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(HistoricalData data);
}
