package com.ece568.stockpro.web;

import com.ece568.stockpro.mapper.StockInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    StockInfoMapper mapper;

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/main")
    public String main(Model model){
        model.addAttribute("stocks",mapper.findAll());
        return "main";
    }

    @GetMapping("/indicators")
    public String tables(Model model){
        model.addAttribute("stocks",mapper.findAll());
        return "indicators";
    }
}
