package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.RealtimeData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface RealtimeMapper {
    @Select("select * from `realtime_data` where symbol = #{symbol}")
    List<RealtimeData> findBySymbol(String symbol);
}