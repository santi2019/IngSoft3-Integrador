-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: ingsoft3int
-- ------------------------------------------------------
-- Server version	8.0.29

DROP TABLE IF EXISTS `libros`;

CREATE TABLE `libros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `portada` varchar(300) DEFAULT NULL,
  `precio` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `libros` WRITE;

INSERT INTO `libros` VALUES (1,'Lord Of The Rings','La comunidad del anillo','https://i.ibb.co/zrLjCb4/The-Fellowship-Of-The-Ring-Book-Cover-by-JRR-Tolkien-1-480.jpg',90),(2,'Economia en una lección','Libro de economia por Henry Hazlitt','https://i.ibb.co/tsMRR7Z/libro-la-economia-en-una-leccion.png',75),(3,'El futbol a sol y sombra','Cuentos de futbol por Eduardo Galeano','https://i.ibb.co/2cMVqVJ/9789876294751.jpg',50),(4,'Patrones de diseño','Patrones de software - GoF','https://i.ibb.co/yByGVXP/web-cover-es.png',150);

UNLOCK TABLES;

