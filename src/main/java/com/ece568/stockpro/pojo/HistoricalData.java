package com.ece568.stockpro.pojo;

import lombok.Data;

import java.sql.Date;

@Data
public class HistoricalData {
    private int id;
    private String symbol;
    private Date date;
    private double open;
    private double high;
    private double low;
    private double close;
    private int volume;
}
