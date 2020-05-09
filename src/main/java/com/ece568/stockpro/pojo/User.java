package com.ece568.stockpro.pojo;

import lombok.Data;

@Data
public class User {
    private String username;
    private String email;
    private String password;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public User(){}
}
