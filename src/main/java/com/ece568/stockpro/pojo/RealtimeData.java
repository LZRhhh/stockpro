package com.ece568.stockpro.pojo;

import lombok.Data;


import java.sql.Time;

@Data
public class RealtimeData {

    private int id;
    private String symbol;
    private Time time;
    private double price;
}
