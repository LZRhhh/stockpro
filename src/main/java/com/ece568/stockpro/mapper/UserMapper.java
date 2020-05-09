package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserMapper {
    @Select("select * from `user` where username = #{username}")
    User getByName(String username);

    @Select("select * from `user` where email = #{email}")
    User getByEmail(String email);

    @Select("select * from `user` where username = #{username} and password = #{password}")
    User getByUsernameAndPassword(String username, String password);

    @Insert("insert into user (username, email, password) values " +
            "(#{username}, #{email}, #{password})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(User user);

    @Update("update user set" +
            "email = #{email}, password = #{password}" +
            "where username = #{username}")
    void update(User user);
}
