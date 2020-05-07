package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.PredictData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PredictMapper {

    @Select("select * from `predict_data` where symbol = #{symbol}")
    List<PredictData> findBySymbol(String symbol);
}
