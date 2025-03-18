-- MySQL dump 10.13  Distrib 9.2.0, for macos15 (x86_64)
--
-- Host: localhost    Database: HiPal
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rfrPointType`
--

DROP TABLE IF EXISTS `rfrPointType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rfrPointType` (
  `strPointType` varchar(6) DEFAULT NULL,
  `strDescription` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rfrPointType`
--

LOCK TABLES `rfrPointType` WRITE;
/*!40000 ALTER TABLE `rfrPointType` DISABLE KEYS */;
INSERT INTO `rfrPointType` VALUES ('SWIM','Swim'),('HIKE','Hike'),('DINE','Dining'),('CHILL','Chill');
/*!40000 ALTER TABLE `rfrPointType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPoints`
--

DROP TABLE IF EXISTS `tblPoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblPoints` (
  `lngPointKey` bigint DEFAULT NULL,
  `strAddress` varchar(255) DEFAULT NULL,
  `strTitle` varchar(255) DEFAULT NULL,
  `strDescription` varchar(255) DEFAULT NULL,
  `pntLatLong` point DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPoints`
--

LOCK TABLES `tblPoints` WRITE;
/*!40000 ALTER TABLE `tblPoints` DISABLE KEYS */;
INSERT INTO `tblPoints` VALUES (1,'318 Magellan Ave Honolulu HI 96813','The Magellan House','Commissioners stomping grounds',_binary '\0\0\0\0\0\0\0\�|\�\n�O5@�b<C�c�'),(2,'1201 Ala Moana Blvd, Honolulu, HI 96814','Ala Moana Beach Park','Huge park with a plethora of things to do',_binary '\0\0\0\0\0\0\0J\"\�BJ5@5�R\��c�');
/*!40000 ALTER TABLE `tblPoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPointToType`
--

DROP TABLE IF EXISTS `tblPointToType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblPointToType` (
  `lngPointKey` bigint DEFAULT NULL,
  `strPointType` varchar(6) DEFAULT NULL,
  `strDescription` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPointToType`
--

LOCK TABLES `tblPointToType` WRITE;
/*!40000 ALTER TABLE `tblPointToType` DISABLE KEYS */;
INSERT INTO `tblPointToType` VALUES (2,'SWIM','1 mile out-and-back good for swim conditioning'),(2,'HIKE','7 mile walking path great for walking and running'),(2,'DINE','L&L: Local kine grindz'),(1,'CHILL','Kick it with cat boy');
/*!40000 ALTER TABLE `tblPointToType` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17 21:20:12
