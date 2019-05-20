-- MySQL dump 10.13  Distrib 8.0.14, for Linux (x86_64)
--
-- Host: localhost    Database: ekkiDatabase
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `ekkiDatabase`;
CREATE DATABASE ekkiDatabase;
USE `ekkiDatabase`;
--
-- Table structure for table `AccountsBank`
--

DROP TABLE IF EXISTS `AccountsBank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `AccountsBank` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `account_type` varchar(255) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `AccountsBank_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `AccountsBank_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AccountsLogin`
--

DROP TABLE IF EXISTS `AccountsLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `AccountsLogin` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `password_login` varchar(255) NOT NULL,
  `login_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `AccountsLogin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CreditCards`
--

DROP TABLE IF EXISTS `CreditCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `CreditCards` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `balance` double DEFAULT '0',
  `credit_line` double DEFAULT '0',
  `password_cd` varchar(255) NOT NULL,
  `due_date` varchar(255) NOT NULL,
  `account_bank_id` int(11) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `account_bank_id` (`account_bank_id`),
  CONSTRAINT `CreditCards_ibfk_1` FOREIGN KEY (`account_bank_id`) REFERENCES `AccountsBank` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DepositTrack`
--

DROP TABLE IF EXISTS `DepositTrack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `DepositTrack` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `value` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `DepositTrack_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Friends`
--

DROP TABLE IF EXISTS `Friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Friends` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `account_to` varchar(255) NOT NULL,
  `is_fav` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('Enviado','Aceito','Recusado','Excluido') DEFAULT 'Enviado',
  `account_login_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `account_login_id` (`account_login_id`),
  KEY `fk_action_id` (`action_id`),
  CONSTRAINT `Friends_ibfk_1` FOREIGN KEY (`account_login_id`) REFERENCES `AccountsLogin` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `fk_action_id` FOREIGN KEY (`action_id`) REFERENCES `AccountsLogin` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Transactions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `value` double NOT NULL,
  `status` char(1) NOT NULL DEFAULT 'O',
  `account_bank_id` int(11) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `to_who` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `account_bank_id` (`account_bank_id`),
  KEY `fk_to_who` (`to_who`),
  CONSTRAINT `Transactions_ibfk_1` FOREIGN KEY (`account_bank_id`) REFERENCES `AccountsBank` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `fk_to_who` FOREIGN KEY (`to_who`) REFERENCES `AccountsBank` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CPF` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `CPF` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-20  7:02:37
