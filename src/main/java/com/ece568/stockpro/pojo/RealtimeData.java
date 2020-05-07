package com.ece568.stockpro.pojo;

import lombok.Data;

import java.sql.Time;

@Data
public class RealtimeData implements Comparable{

    private int id;
    private String symbol;
    private Time time;
    private double price;

    @Override
    public int compareTo(Object o) {
        RealtimeData data = (RealtimeData) o;
        return data.time.compareTo(this.time);
    }
}
