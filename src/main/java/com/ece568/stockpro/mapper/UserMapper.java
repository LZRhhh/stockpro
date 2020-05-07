package com.ece568.stockpro.mapper;

import com.ece568.stockpro.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserMapper {
    @Select("select * from `user` username = #{username}")
    User getByName(String username);

    @Insert("insert into user values " +
            "(#{username}, #{email}, #{password})")
    void insert(User user);

    @Update("update user set" +
            "email = #{email}, password = #{password}" +
            "where username = #{username}")
    void update(User user);
}
