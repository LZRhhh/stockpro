package com.ece568.stockpro.config;

import java.lang.annotation.*;

/**
 * 元注解：加在自定义注解上的注解
 * @Target 定义注解可以添加的位置 METHOD 方法上 type 类上
 * @Retention RUNTIME 运行时  不管编译 还是 运行 这个注解都可以用
 *
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SysLog {
    /**
     * 写法类似于接口的方法 后面可以通过default 关键字给默认值
     * 用法类似于属性
     * @return
     */
    String value() default "";
    String type() default "";
}


