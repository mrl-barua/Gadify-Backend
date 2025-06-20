-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: Gadify
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `AdminId` varchar(10) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `AdminId` (`AdminId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (14,'A-0001','Admin','Admin@gmail.com','$2a$10$h.fV1xp3EJ.W8ja3BfQsEeSSJzAcFu3552y/SAG9EewJA32Ee2Q6S','2025-02-09 02:52:09');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertAdmin` BEFORE INSERT ON `admin` FOR EACH ROW BEGIN
    IF NEW.AdminId IS NULL THEN
        SET NEW.AdminId = CONCAT('A-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Admin), 4, '0'));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `blacklistedtoken`
--

DROP TABLE IF EXISTS `blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklistedtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `blacklistedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiresAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklistedtoken`
--

LOCK TABLES `blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `blacklistedtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campus` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CampusId` varchar(10) NOT NULL,
  `CampusName` varchar(255) NOT NULL,
  `CampusAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `CampusId` (`CampusId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus`
--

LOCK TABLES `campus` WRITE;
/*!40000 ALTER TABLE `campus` DISABLE KEYS */;
INSERT INTO `campus` VALUES (1,'C-0001','USeP Obrero','Iñigo Street, Barangay Obrero, Poblacion District, Davao City, Davao del Sur, 8000, Philippines'),(9,'C-0002','USeP Mabini','Barangay Pindasan, Municipality of Mabini, Davao de Oro (Compostela Valley), Philippines, ZIP 8807 '),(10,'C-0010','USeP Tagum','Apokon, Tagum City, Davao del Norte');
/*!40000 ALTER TABLE `campus` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertCampus` BEFORE INSERT ON `campus` FOR EACH ROW BEGIN
    IF NEW.CampusId IS NULL THEN
        SET NEW.CampusId = CONCAT('C-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Campus), 4, '0'));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DepartmentId` varchar(10) NOT NULL,
  `CampusId` int NOT NULL,
  `DepartmentName` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `DepartmentId` (`DepartmentId`),
  KEY `CampusId` (`CampusId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'D-0001',11,'College of Information and Computing'),(2,'D-0002',10,'College of Engineering'),(3,'D-0003',1,'College of Arts and Sciences'),(4,'D-0004',1,'College of Business Administration'),(5,'D-0005',1,'College of Technology'),(6,'D-0006',1,'College of Industrial Technology');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertDepartment` BEFORE INSERT ON `department` FOR EACH ROW BEGIN
    IF NEW.DepartmentId IS NULL THEN
        SET NEW.DepartmentId = CONCAT('D-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Department), 4, '0'));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `evaluator`
--

DROP TABLE IF EXISTS `evaluator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluator` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EvaluatorId` varchar(10) NOT NULL,
  `OfficeId` int NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Signature` blob,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `EvaluatorId` (`EvaluatorId`),
  UNIQUE KEY `Email` (`Email`),
  KEY `OfficeId` (`OfficeId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluator`
--

LOCK TABLES `evaluator` WRITE;
/*!40000 ALTER TABLE `evaluator` DISABLE KEYS */;
INSERT INTO `evaluator` VALUES (1,'E-0002',1,'Evaluator','Evaluator@gmail.com','$2a$10$h.fV1xp3EJ.W8ja3BfQsEeSSJzAcFu3552y/SAG9EewJA32Ee2Q6S',NULL,'2025-01-12 01:33:29');
/*!40000 ALTER TABLE `evaluator` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertEvaluator` BEFORE INSERT ON `evaluator` FOR EACH ROW BEGIN
    IF NEW.EvaluatorId IS NULL THEN
        SET NEW.EvaluatorId = CONCAT('E-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Evaluator), 4, '0'));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `genderevaluationassessment`
--

DROP TABLE IF EXISTS `genderevaluationassessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genderevaluationassessment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sectionId` int NOT NULL,
  `submissionEvaluationId` int NOT NULL,
  `doneNo` tinyint(1) NOT NULL,
  `donePartly` tinyint(1) NOT NULL,
  `doneYes` tinyint(1) NOT NULL,
  `score` float NOT NULL,
  `comments` text,
  PRIMARY KEY (`id`),
  KEY `section_id` (`sectionId`),
  KEY `submission_evaluation_id` (`submissionEvaluationId`)
) ENGINE=InnoDB AUTO_INCREMENT=1123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genderevaluationassessment`
--

LOCK TABLES `genderevaluationassessment` WRITE;
/*!40000 ALTER TABLE `genderevaluationassessment` DISABLE KEYS */;
/*!40000 ALTER TABLE `genderevaluationassessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genderevaluationsection`
--

DROP TABLE IF EXISTS `genderevaluationsection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genderevaluationsection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `element` text NOT NULL,
  `isMainSection` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genderevaluationsection`
--

LOCK TABLES `genderevaluationsection` WRITE;
/*!40000 ALTER TABLE `genderevaluationsection` DISABLE KEYS */;
INSERT INTO `genderevaluationsection` VALUES (1,'1.0 Involvement of women and men (max score: 2; 1 for each item)',1),(2,'1.1 Participation of women and men in beneficiary groups in problem identification (possible scores: 0, 0.5, 1.0)',0),(3,'1.2 Participation of women and men in beneficiary groups in project design (possible scores: 0, 0.5, 1.0)',0),(4,'2.0 Collection of sex-disaggregated data and gender-related information (possible scores: 0, 1.0, 2.0)',1),(5,'3.0 Conduct of gender analysis and identification of gender issues (max score: 2; 1 for each item)',1),(6,'3.1 Analysis of gender gaps and inequalities related to gender roles, perspectives and needs, or access to and control of resources (possible scores: 0, 0.5, 1.0)',0),(7,'3.2 Analysis of constraints and opportunities related to women and men’s participation in the project (possible scores: 0, 0.5, 1.0)',0),(8,'4.0 Gender equality goals, outcomes, and outputs (possible scores: 0, 1.0, 2.0)',1),(9,'5.0 Matching of strategies with gender issues (possible scores: 0, 1.0, 2.0)',1),(10,'6.0 Gender analysis of likely impacts of the project (max score: 2; for each item or question, 0.67)',1),(11,'6.1 Are women and girl children among the direct or indirect beneficiaries? (Possible scores: 0, 0.33, 0.67)',0),(12,'6.2 Has the project considered its long-term impact on women’s socioeconomic status and empowerment? (Possible scores: 0, 0.33, 0.67)',0),(13,'6.3 Has the project included strategies for avoiding or minimizing negative impact on women’s status and welfare? (Possible scores: 0, 0.33, 0.67)',0),(14,'7.0 Monitoring targets and indicators (possible scores: 0, 1.0, 2.0)',1),(15,'8.0 Sex-disaggregated database requirement (possible scores: 0, 1.0, 2.0)',1),(16,'9.0 Resources (max score: 2; for each question, 1)',1),(17,'9.1 Is the project’s budget allotment sufficient for gender equality promotion or integration? (Possible scores: 0, 0.5, 1.0)',0),(18,'9.2 Does the project have the expertise in promoting gender equality and women’s empowerment? (Possible scores: 0, 0.5, 1.0)',0),(19,'10.0 Relationship with the agency’s GAD efforts (max score: 2; for each question or item, 0.67)',1),(20,'10.1 Will the project build on or strengthen the agency/ NCRFW/ government’s commitment to the empowerment of women? (Possible scores: 0, 0.33, 0.67)',0),(21,'10.2 Will the project build on the initiatives or actions of other organizations in the area? (Possible scores: 0, 0.33, 0.67)',0),(22,'10.3 Does the project have an exit plan that will ensure the sustainability of GAD efforts and benefits? (Possible scores: 0, 0.33, 0.67)',0);
/*!40000 ALTER TABLE `genderevaluationsection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `OfficeId` varchar(10) NOT NULL,
  `DepartmentId` int NOT NULL,
  `OfficeName` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `OfficeId` (`OfficeId`),
  KEY `DepartmentId` (`DepartmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES (1,'O-0001',1,'Office of Internal Affair');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertOffice` BEFORE INSERT ON `office` FOR EACH ROW BEGIN
    IF NEW.OfficeId IS NULL THEN
        SET NEW.OfficeId = CONCAT('O-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Office), 4, '0'));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `proponent`
--

DROP TABLE IF EXISTS `proponent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proponent` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProponentId` varchar(10) NOT NULL,
  `DepartmentId` int DEFAULT NULL,
  `OfficeId` int DEFAULT NULL,
  `ProponentType` enum('Insider','Outsider') NOT NULL,
  `ProponentStatus` enum('Pending','Approved','Rejected') NOT NULL,
  `FullName` varchar(60) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IsDeleted` tinyint NOT NULL DEFAULT '0',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `ProponentId` (`ProponentId`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `DepartmentId` (`DepartmentId`),
  KEY `OfficeId` (`OfficeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5376 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proponent`
--

LOCK TABLES `proponent` WRITE;
/*!40000 ALTER TABLE `proponent` DISABLE KEYS */;
INSERT INTO `proponent` VALUES (1,'IN-0001',1,1,'Insider','Approved','Proponent','proponent@gmail.com','$2a$10$/sNiaiix0TkXHo9TtekvF.1Js2rcRCbeE1j2xaDWpuG0yET7ENGW2',0,'2025-02-09 02:46:21');
/*!40000 ALTER TABLE `proponent` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertProponents` BEFORE INSERT ON `proponent` FOR EACH ROW BEGIN
    IF NEW.ProponentId IS NULL THEN
        SET NEW.ProponentId = CONCAT(
            CASE WHEN NEW.ProponentType = 'Inside' THEN 'IN-' ELSE 'OUT-' END,
            LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Proponents), 4, '0')
        );
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `remarks`
--

DROP TABLE IF EXISTS `remarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remarks` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Remarks` text,
  `SubmissionId` int NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remarks`
--

LOCK TABLES `remarks` WRITE;
/*!40000 ALTER TABLE `remarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `remarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SubmissionId` varchar(10) NOT NULL,
  `ProponentId` int NOT NULL,
  `FileType` enum('Link','File') NOT NULL,
  `ProposalTitle` text NOT NULL,
  `ProposalDescription` text,
  `SubmissionStatus` enum('OnHold','Evaluation','Completed','ForCorrection') NOT NULL,
  `TotalScore` double DEFAULT '0',
  `GadScoreRemark` text,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `EvaluatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `SubmissionId` (`SubmissionId`),
  KEY `ProponentId` (`ProponentId`)
) ENGINE=InnoDB AUTO_INCREMENT=10280 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission`
--

LOCK TABLES `submission` WRITE;
/*!40000 ALTER TABLE `submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `submission` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertSubmission` BEFORE INSERT ON `submission` FOR EACH ROW BEGIN
    IF NEW.SubmissionId IS NULL THEN
        SET NEW.SubmissionId = CONCAT('S-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Submission), 4, '0'));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `submissionevaluation`
--

DROP TABLE IF EXISTS `submissionevaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissionevaluation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `submissionId` int NOT NULL,
  `evaluatorId` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `submissionId` (`submissionId`),
  KEY `evaluatorId` (`evaluatorId`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissionevaluation`
--

LOCK TABLES `submissionevaluation` WRITE;
/*!40000 ALTER TABLE `submissionevaluation` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissionevaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissionevaluator`
--

DROP TABLE IF EXISTS `submissionevaluator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissionevaluator` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SubmissionId` int NOT NULL,
  `EvaluatorId` int NOT NULL,
  `hasEvaluated` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `SubmissionId` (`SubmissionId`,`EvaluatorId`),
  KEY `FK_EvaluatorId` (`EvaluatorId`),
  CONSTRAINT `FK_EvaluatorId` FOREIGN KEY (`EvaluatorId`) REFERENCES `evaluator` (`Id`),
  CONSTRAINT `FK_SubmissionId` FOREIGN KEY (`SubmissionId`) REFERENCES `submission` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissionevaluator`
--

LOCK TABLES `submissionevaluator` WRITE;
/*!40000 ALTER TABLE `submissionevaluator` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissionevaluator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissionfiles`
--

DROP TABLE IF EXISTS `submissionfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissionfiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `submissionId` int NOT NULL,
  `resourcesLink` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20328 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissionfiles`
--

LOCK TABLES `submissionfiles` WRITE;
/*!40000 ALTER TABLE `submissionfiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissionfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissionhistory`
--

DROP TABLE IF EXISTS `submissionhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissionhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `description` text NOT NULL,
  `changedBy` varchar(100) NOT NULL,
  `submissionId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `submissionId` (`submissionId`),
  CONSTRAINT `submissionhistory_ibfk_1` FOREIGN KEY (`submissionId`) REFERENCES `submission` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=385 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissionhistory`
--

LOCK TABLES `submissionhistory` WRITE;
/*!40000 ALTER TABLE `submissionhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissionhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'Gadify'
--

--
-- Dumping routines for database 'Gadify'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-21  3:26:57
