package com.ece568.stockpro.service;


import com.ece568.stockpro.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class TestService {

    @Autowired
    UserService userService;

    @Test
    public void test1() {
        User user = new User("Zhuoran", "liuzhuoran8@gmail.com", "lzr13579.");
        System.out.println(userService.insert(user));
    }
}
