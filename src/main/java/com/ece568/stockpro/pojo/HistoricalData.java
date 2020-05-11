package com.ece568.stockpro.pojo;

import lombok.Data;

import java.sql.Date;

@Data
public class HistoricalData implements Comparable{
    private int id;
    private String symbol;
    private Date date;
    private double open;
    private double high;
    private double low;
    private double close;
    private int volume;
    private double sma;
    private double ema;
    private double macd;
    private double cci;

    public HistoricalData(String symbol, Date date, double open, double high, double low, double close, int volume) {
        this.symbol = symbol;
        this.date = date;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }

    public HistoricalData(){

    }

    @Override
    public int compareTo(Object o) {
        HistoricalData data = (HistoricalData) o;
        return data.date.compareTo(this.date);
    }
}
