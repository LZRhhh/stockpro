package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.StockInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface StockInfoMapper {

    @Select("select * from stock_info")
    List<StockInfo> findAll();
}
