package com.ece568.stockpro.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/main")
    public String main(){
        return "main";
    }

    @GetMapping("/tables")
    public String tables(){
        return "tables";
    }
}
