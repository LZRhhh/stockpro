package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.HistoricalData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HistoricalMapper {
    @Select("select * from `historical_data` symbol = #{symbol}")
    List<HistoricalData> findBySymbol(String symbol);
}
