drop database if exists ece568;
create database ece568;
use ece568;
drop table if exists `historical_data`;
drop table if exists `realtime_data`;
drop table if exists `predict_data`;
drop table if exists `stock_info`;

CREATE TABLE `stock_info` (
  `symbol` varchar(6) NOT NULL,
  PRIMARY KEY (`symbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `historical_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(6) NOT NULL,
  `close` double NOT NULL,
  `date` date DEFAULT NULL,
  `high` double NOT NULL,
  `low` double NOT NULL,
  `open` double NOT NULL,
  `volume` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `symbol_date` (`symbol`, `date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `predict_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(6) NOT NULL,
  `ann` double NOT NULL,
  `bayes` double NOT NULL,
  `svm` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `realtime_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(6) NOT NULL,
  `price` double NOT NULL,
  `volume` int NOT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `symbol_time` (`symbol`, `time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into realtime_data (symbol, price, volume, time) values('BABA', 20.0, 100, '12:00:00');
insert into realtime_data (symbol, price, volume, time) values('BABA', 21.0, 200, '12:01:00');
insert into realtime_data (symbol, price, volume, time) values('GOOG', 10.0, 300, '12:00:00');
insert into realtime_data (symbol, price, volume, time) values('GOOG', 11.0, 400, '12:01:00');