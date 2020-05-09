package com.ece568.stockpro.web;

import com.ece568.stockpro.pojo.User;
import com.ece568.stockpro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    UserService userService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String doLogin(User user, Model model, HttpSession session){
        User u;
        if((u = userService.authorize(user)) == null) {
            String errorMsg = "Username or password incorrect";
            model.addAttribute("error", errorMsg);
            return "redirect:/login";
        }
        session.setAttribute("username", u.getUsername());
        return "redirect:/main";
    }

    @GetMapping("/register")
    public String register() {
        return "registrations";
    }

    @PostMapping("/register")
    public String doRegister(User user, Model model, HttpSession session){
        String res;
//        System.out.println("test1");
        if((res = userService.insert(user)) != null){
            model.addAttribute("error", res);
            System.out.println(res);
            return "redirect:/register";
        }
//        System.out.println("test2");
        session.setAttribute("username", user.getUsername());
        return "redirect:/main";
    }
}