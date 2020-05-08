package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.PredictData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PredictMapper {

    @Select("select * from `predict_data` where symbol = #{symbol}")
    List<PredictData> findBySymbol(String symbol);
}
