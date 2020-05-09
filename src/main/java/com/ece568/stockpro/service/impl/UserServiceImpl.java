package com.ece568.stockpro.service.impl;

import com.ece568.stockpro.mapper.UserMapper;

import com.ece568.stockpro.pojo.User;
import com.ece568.stockpro.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;



@Service
@Primary
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public String insert(User user) {

        if (existName(user.getUsername())){
            return "Username Exist";
        }
        if (existEmail(user.getEmail())){
            return "Email Exist";
        }

        userMapper.insert(user);
        return null;
    }

    @Override
    public String update(User user) {
        if (existName(user.getUsername())){
            return "Username Exist";
        }
        if (existEmail(user.getEmail())){
            return "Email Exist";
        }
        userMapper.update(user);
        return null;
    }

    @Override
    public User getByName(String username) {
        return userMapper.getByName(username);
    }

    @Override
    public User get(String username, String password) {
        try{
            User user = userMapper.getByUsernameAndPassword(username, password);
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public User authorize(User user) {
        String name = user.getUsername();
        if(name!=null){
            User u = userMapper.getByName(name);
            if(u!=null && user.getPassword().equals(u.getPassword()))
                return u;
        }

        String email = user.getEmail();
        if(email!=null){
            User u = userMapper.getByEmail(email);
            if(u!=null && user.getPassword().equals(u.getPassword()))
                return u;
        }
        return null;
    }


    /**
     * 判断用户是否存在
     */
    private boolean existName(String username){
        User user = userMapper.getByName(username);
        return (user != null);
    }

    private boolean existEmail(String email){
        User user = userMapper.getByName(email);
        return (user != null);
    }

}
