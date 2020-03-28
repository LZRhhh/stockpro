package com.ece568.stockpro.pojo;

import lombok.Data;


@Data
public class PredictData {
    private int id;
    private String symbol;
    private double bayes;
    private double svm;
    private double ann;
}
