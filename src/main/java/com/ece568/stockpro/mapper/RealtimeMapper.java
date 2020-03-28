package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.RealtimeData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RealtimeMapper {
    @Select("select * from `realtime_data` where symbol = #{symbol}")
    List<RealtimeData> findBySymbol(String symbol);
}
