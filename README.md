#### Tools

Java 1.8

Spring Boot 2.2.4

Maven 3.2

MySQL 5.8

#### Run Configuration

This is a standard Spring Boot application. To run the app, suppose you have already installed the tools above on your laptop. 

Run the following command in a terminal window (in the `stockpro`) directory:

```shell
mvnw spring-boot:run
```

#### File Management Description

The `src` folder contains all sources files. Under `src\main\java\com\ece568\stockpro` there are class files which implement core function of the application. Classes under `mapper` are used to operate database. Classes under `pojo` are Java Beans. Classes under `web` are controllers to manage page forwarding and provide APIs. Under `src\main\resources` are resource files of the app. `application.properties` is the configuration file. HTML files are under `templates`. Static resources such as `.js` and `.css` are under `static` .





