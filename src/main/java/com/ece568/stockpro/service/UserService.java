package com.ece568.stockpro.service;


import com.ece568.stockpro.pojo.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    /**
     * 添加新用户
     *
     * username 唯一， 默认 USER 权限
     */
    String insert(User user);

    String update(User user);
    /**
     * 查询用户信息
     * @param username 账号
     * @return UserEntity
     */
    User getByName(String username);

    User get(String username, String password);

    User authorize(User user);

}
