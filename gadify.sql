-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 08, 2025 at 04:34 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gadify`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `AdminId` varchar(10) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `AdminId` (`AdminId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Id`, `AdminId`, `FullName`, `Email`, `Password`, `CreatedAt`) VALUES
(1, 'A-0001', 'John Admin', 'admin1@example.com', '$2a$10$qC4pCbw8K22JvvJreC0h..OPHqHGctpfJuqbiU', '2025-01-12 00:10:10'),
(2, 'A-0002', 'Jane Admin', 'admin2@example.com', '$2a$10$qC4pCbw8K22JvvJreC0h..OPHqHGctpfJuqbiU', '2025-01-12 00:10:10'),
(3, 'A-0003', 'Marlo Barua', 'admin3@example.com', '$2a$10$qC4pCbw8K22JvvJreC0h..OPHqHGctpfJuqbiU', '2025-01-12 00:18:02'),
(4, 'A-0004', 'Marlo Barua', 'admin4@example.com', '$2a$10$qC4pCbw8K22JvvJreC0h..OPHqHGctpfJuqbiU', '2025-01-12 00:24:23'),
(5, 'A-0005', 'Marlo Barua', 'admin5@example.com', '$2a$10$qC4pCbw8K22JvvJreC0h..OPHqHGctpfJuqbiU', '2025-01-12 00:26:40'),
(10, 'A-0006', 'Marlo Barua', 'mlbarua@usep.edu.ph', '$2a$10$wqr9hPKPuyilCO9ju/m3D.NduMfUTpxUOGWi8Z', '2025-01-31 11:51:56');

--
-- Triggers `admin`
--
DROP TRIGGER IF EXISTS `BeforeInsertAdmin`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertAdmin` BEFORE INSERT ON `admin` FOR EACH ROW BEGIN
    IF NEW.AdminId IS NULL THEN
        SET NEW.AdminId = CONCAT('A-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Admin), 4, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminId` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blacklistedtoken`
--

DROP TABLE IF EXISTS `blacklistedtoken`;
CREATE TABLE IF NOT EXISTS `blacklistedtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `blacklistedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiresAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blacklistedtoken`
--

INSERT INTO `blacklistedtoken` (`id`, `token`, `blacklistedAt`, `expiresAt`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY3OTc4NiwiZXhwIjoxNzM2NjgzMzg2fQ.VPsPDE_wavXHD1_8KtBms1s4e6OFJyeSdBuVhmbTDZk', '2025-01-12 11:23:54', '2025-01-12 12:03:06'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-12 13:16:04', '2025-01-12 14:15:50'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-12 13:16:49', '2025-01-12 14:15:50'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-12 13:16:52', '2025-01-12 14:15:50'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-12 13:16:57', '2025-01-12 14:15:50'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-12 13:17:00', '2025-01-12 14:15:50'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg1NjkzOSwiZXhwIjoxNzM2ODYwNTM5fQ.1sCFmhVyS541mG_T-Gyll2QXvgjrtAZW7KDDilvL8Co', '2025-01-14 12:15:44', '2025-01-14 13:15:39'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-14 12:15:54', '2025-01-12 14:15:50'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-14 12:15:58', '2025-01-12 14:15:50'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg1NzAwMiwiZXhwIjoxNzM2ODYwNjAyfQ.jvNCKhZzI1d9olyalsqB92Y8QdJ1_LgNXsJkGCS_OaE', '2025-01-14 12:16:45', '2025-01-14 13:16:42'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg1NzA1MCwiZXhwIjoxNzM2ODYwNjUwfQ.zvSCQTLfjTvVw_-H9wk7mwk7sJQOi1plwMPFToarYL0', '2025-01-14 12:17:33', '2025-01-14 13:17:30'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg1NzE0OSwiZXhwIjoxNzM2ODYwNzQ5fQ.5h1fiMUiKpvJF8-qQST7inKTVzfaJGIWSRQpQbHPY3I', '2025-01-14 12:19:11', '2025-01-14 13:19:09'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg1NzIwMCwiZXhwIjoxNzM2ODYwODAwfQ.OgLlsVWDzn_RPYQbLLTAq04_juzSTcjUlmFZHWHo3TU', '2025-01-14 12:20:02', '2025-01-14 13:20:00'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg1NzMzMiwiZXhwIjoxNzM2ODYwOTMyfQ.pe8RNOcpZybw5TjjDYCqAv1HVeKHDTW8o7yeFgLqYv8', '2025-01-14 12:22:14', '2025-01-14 13:22:12'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg1OTk4MCwiZXhwIjoxNzM2ODYzNTgwfQ.iaU1XrSWspYc5BO45UCeV69p6p2RkPNRqKOZk_hZj60', '2025-01-14 13:06:22', '2025-01-14 14:06:20'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-14 13:07:04', '2025-01-12 14:15:50'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjY4Nzc1MCwiZXhwIjoxNzM2NjkxMzUwfQ.NPD73M2eZL-PfavqnoMNX4XBxMMJMMoariN9B35M6Wg', '2025-01-14 13:07:04', '2025-01-12 14:15:50'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg2MDA0MCwiZXhwIjoxNzM2ODYzNjQwfQ.A06--ToA1f9Vs3h6IMNDlLuD5IsyZp2cAXNbKr3Ei_4', '2025-01-14 13:07:22', '2025-01-14 14:07:20'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg2MDA0OCwiZXhwIjoxNzM2ODYzNjQ4fQ.bc6JPKFstI6cbqVtl94Y-uI-ZdqgQFvKNQxJO62yMe4', '2025-01-14 13:07:31', '2025-01-14 14:07:28'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg2MDI4OSwiZXhwIjoxNzM2ODYzODg5fQ.lRiY-0Iz2DVb613skGiPjbR5EvXwABNgmOA_kftUwIo', '2025-01-14 13:11:33', '2025-01-14 14:11:29'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg2MTYzMSwiZXhwIjoxNzM2ODY1MjMxfQ.dzvfR_d1pSSRNbOCt1LNWaWXgslF3fjY_jRJEvpn9so', '2025-01-14 13:34:06', '2025-01-14 14:33:51'),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNjg2MTY0OCwiZXhwIjoxNzM2ODY1MjQ4fQ.zTxRH--LtRhvADae_klLYwcKONFvcXzdwDtvmAV6cSM', '2025-01-14 13:34:12', '2025-01-14 14:34:08'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzM3MjAxMSwiZXhwIjoxNzM3Mzc1NjExfQ.LYWHHsUlTzkhJHswro3iwD-Eri-Qmx5UwUO0igRjEZY', '2025-01-20 11:21:38', '2025-01-20 12:20:11'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzM3MzMyNSwiZXhwIjoxNzM3Mzc2OTI1fQ._KSs3lno9JN-re0mzuxa736vtPZMJRm5P8ZQfnlGpbM', '2025-01-20 11:43:18', '2025-01-20 12:42:05'),
(25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzM3MzQwMCwiZXhwIjoxNzM3Mzc3MDAwfQ.EdiPnWaMabqojBtpgxc9-thxJgnFwp6kZOrjgJpby8o', '2025-01-20 11:43:27', '2025-01-20 12:43:20'),
(26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzM3MzQxNCwiZXhwIjoxNzM3Mzc3MDE0fQ.gLoKz4IpCIfB24kjG5RSbjVR17ZvH051xdV8oYd3f8A', '2025-01-20 11:43:38', '2025-01-20 12:43:34'),
(27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzM3MzY0OCwiZXhwIjoxNzM3Mzc3MjQ4fQ.OssxgzQxnWe2pxmAg1PfXN_EF_2MV8KqsG6CmLlvVpQ', '2025-01-20 12:48:41', '2025-01-20 12:47:28'),
(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzM3NzMyMiwiZXhwIjoxNzM3MzgwOTIyfQ.umrL4aMiQ7-b9GN9TIbLWposqcJD4Yu9vjrsmvtUmUI', '2025-01-20 13:55:11', '2025-01-20 13:48:42'),
(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzM4MTMxMiwiZXhwIjoxNzM3Mzg0OTEyfQ.czWvHN-vuflCP9uzTUgME8792xHKJ-apMDYXJlSTyGQ', '2025-01-21 13:32:14', '2025-01-20 14:55:12'),
(30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczNzQ2NjMzNSwiZXhwIjoxNzM3NDY5OTM1fQ.yh-5Vkp-ucwHsF95wRg9Gv5XvzTWfcv-5R3w-s9VL-I', '2025-01-21 13:56:19', '2025-01-21 14:32:15'),
(31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoiMTIiLCJpYXQiOjE3Mzc1NDk1MzcsImV4cCI6MTczNzU1MzEzN30.eurwHEzfGM_tL57TvU2Z7qtGdzpI_AmyE24nPf-Jl0Q', '2025-01-24 11:48:04', '2025-01-22 13:38:57'),
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczODIzODk4NSwiZXhwIjoxNzM4MjQyNTg1fQ.LTnNzfqAhbBPT6Ul3rCKzuvNaNXeqzSt_DgqlG-9xoY', '2025-01-31 11:33:15', '2025-01-30 13:09:45'),
(33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJpYXQiOjE3Mzg1OTMwODUsImV4cCI6MTczODU5NjY4NX0.nstAT1D2e-BPYMHj4iqDwBi4hy-nMFkqg3D-1_4S6DM', '2025-02-04 09:29:28', '2025-02-03 15:31:25');

-- --------------------------------------------------------

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
CREATE TABLE IF NOT EXISTS `campus` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CampusId` varchar(10) NOT NULL,
  `CampusName` varchar(255) NOT NULL,
  `CampusAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `CampusId` (`CampusId`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `campus`
--

INSERT INTO `campus` (`Id`, `CampusId`, `CampusName`, `CampusAddress`) VALUES
(1, 'C-0001', 'Main Campus', '123 Main St, City A'),
(2, 'C-0002', 'North Campus', '456 North St, City B'),
(3, 'C-0003', 'Main Campus', '123 Main St, City A'),
(4, 'C-0004', 'Main Campus', '123 Main St, City A'),
(5, 'C-0005', 'Main Campus', '123 Main St, City A'),
(6, 'C-0006', 'Main Campus', '123 Main St, City A');

--
-- Triggers `campus`
--
DROP TRIGGER IF EXISTS `BeforeInsertCampus`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertCampus` BEFORE INSERT ON `campus` FOR EACH ROW BEGIN
    IF NEW.CampusId IS NULL THEN
        SET NEW.CampusId = CONCAT('C-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Campus), 4, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DepartmentId` varchar(10) NOT NULL,
  `CampusId` int NOT NULL,
  `DepartmentName` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `DepartmentId` (`DepartmentId`),
  KEY `CampusId` (`CampusId`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Id`, `DepartmentId`, `CampusId`, `DepartmentName`) VALUES
(1, 'D-0001', 1, 'cc'),
(2, 'D-0002', 2, 'cc'),
(3, 'D-0003', 1, 'ccc'),
(4, 'D-0004', 1, 'ccc'),
(5, 'D-0005', 1, 'ccc'),
(6, 'D-0006', 1, 'ccc'),
(7, 'D-0007', 1, 'ccc');

--
-- Triggers `department`
--
DROP TRIGGER IF EXISTS `BeforeInsertDepartment`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertDepartment` BEFORE INSERT ON `department` FOR EACH ROW BEGIN
    IF NEW.DepartmentId IS NULL THEN
        SET NEW.DepartmentId = CONCAT('D-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Department), 4, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `evaluator`
--

DROP TABLE IF EXISTS `evaluator`;
CREATE TABLE IF NOT EXISTS `evaluator` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EvaluatorId` varchar(10) NOT NULL,
  `CampusId` int NOT NULL,
  `DepartmentId` int NOT NULL,
  `OfficeId` int NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Signature` blob,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `EvaluatorId` (`EvaluatorId`),
  UNIQUE KEY `Email` (`Email`),
  KEY `CampusId` (`CampusId`),
  KEY `DepartmentId` (`DepartmentId`),
  KEY `OfficeId` (`OfficeId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `evaluator`
--

INSERT INTO `evaluator` (`Id`, `EvaluatorId`, `CampusId`, `DepartmentId`, `OfficeId`, `FullName`, `Email`, `Password`, `Signature`, `CreatedAt`) VALUES
(1, 'E-0001', 1, 1, 1, 'Alice Evaluator', 'evaluator1@example.com', 'hashed_password1', NULL, '2025-01-12 01:33:29'),
(2, 'E-0002', 2, 2, 2, 'Bob Evaluator', 'evaluator2@example.com', 'hashed_password2', NULL, '2025-01-12 01:33:29'),
(3, 'EV-0003', 1, 1, 1, 'Alice Evaluator', 'evaluator3@example.com', 'hashed_password1', NULL, '2025-01-12 03:12:35'),
(4, 'EV-0004', 1, 1, 1, 'Alice Evaluator', 'evaluator4@example.com', 'hashed_password1', NULL, '2025-01-12 03:12:39');

--
-- Triggers `evaluator`
--
DROP TRIGGER IF EXISTS `BeforeInsertEvaluator`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertEvaluator` BEFORE INSERT ON `evaluator` FOR EACH ROW BEGIN
    IF NEW.EvaluatorId IS NULL THEN
        SET NEW.EvaluatorId = CONCAT('E-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Evaluator), 4, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
CREATE TABLE IF NOT EXISTS `office` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `OfficeId` varchar(10) NOT NULL,
  `CampusId` int NOT NULL,
  `DepartmentId` int NOT NULL,
  `OfficeName` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `OfficeId` (`OfficeId`),
  KEY `CampusId` (`CampusId`),
  KEY `DepartmentId` (`DepartmentId`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`Id`, `OfficeId`, `CampusId`, `DepartmentId`, `OfficeName`) VALUES
(1, 'O-0001', 1, 1, 'Office of IT'),
(2, 'O-0002', 2, 2, 'Office of Research'),
(3, 'O-0003', 1, 1, 'Office of educ'),
(4, 'O-0004', 1, 1, 'Office of educ'),
(5, 'O-0005', 1, 1, 'Office of educ');

--
-- Triggers `office`
--
DROP TRIGGER IF EXISTS `BeforeInsertOffice`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertOffice` BEFORE INSERT ON `office` FOR EACH ROW BEGIN
    IF NEW.OfficeId IS NULL THEN
        SET NEW.OfficeId = CONCAT('O-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Office), 4, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `proponents`
--

DROP TABLE IF EXISTS `proponents`;
CREATE TABLE IF NOT EXISTS `proponents` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProponentId` varchar(10) NOT NULL,
  `DepartmentId` int DEFAULT NULL,
  `OfficeId` int DEFAULT NULL,
  `ProponentType` enum('Inside','Outside') NOT NULL,
  `ProponentStatus` enum('Pending','Approved','Rejected') NOT NULL,
  `FullName` varchar(60) NOT NULL,
  `UserName` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IsDeleted` tinyint NOT NULL DEFAULT '0',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `ProponentId` (`ProponentId`),
  UNIQUE KEY `UserName_UNIQUE` (`UserName`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `DepartmentId` (`DepartmentId`),
  KEY `OfficeId` (`OfficeId`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `proponents`
--

INSERT INTO `proponents` (`Id`, `ProponentId`, `DepartmentId`, `OfficeId`, `ProponentType`, `ProponentStatus`, `FullName`, `UserName`, `Email`, `Password`, `IsDeleted`, `CreatedAt`) VALUES
(1, 'IN-0001', 1, 1, 'Inside', 'Approved', 'Marlo Barua', 'mrl', 'mlbarua@gmail.com', 'hashed_password3', 0, '2025-01-12 01:33:36'),
(2, 'OUT-0002', 2, 2, 'Outside', 'Rejected', 'Diana Proponent', '2', 'b@gmail.com', 'hashed_password4', 0, '2025-01-12 01:33:36'),
(6, 'IN-0006', 1, 2, 'Inside', 'Rejected', 'Charlie Proponent', '3', 'c@gmail.com', 'hashed_password3', 0, '2025-01-12 02:24:21'),
(5, 'OUT-0005', 2, 2, 'Outside', 'Approved', 'Diana Proponent', '4', 'd@gmail.com', 'hashed_password4', 0, '2025-01-12 02:23:49'),
(7, 'A-0007', 1, NULL, 'Inside', 'Rejected', 'Charlie Paroponent', '5', 'e@gmail.com', 'hasheda_password3', 0, '2025-01-12 02:27:22'),
(8, 'A-0008', 1, NULL, 'Inside', 'Rejected', 'Charlie Paroponent', '6', 'f@gmail.com', 'hasheda_password3', 0, '2025-01-12 02:27:29'),
(9, 'A-0009', 1, NULL, 'Inside', 'Approved', 'Charlie Paroponent', '7', 'g@gmail.com', 'hasheda_password3', 0, '2025-01-12 02:27:42'),
(10, 'A-0010', 1, NULL, 'Inside', 'Rejected', 'Charlie Paroponent', '8', 'h@gmail.com', 'hasheda_password3', 0, '2025-01-12 02:27:50'),
(11, 'IN-0011', 1, NULL, 'Inside', 'Rejected', 'Charlie Paroponent', '9', 'i@gmail.com', 'hasheda_password3', 0, '2025-01-12 02:30:53'),
(12, 'OUT-0012', 1, NULL, 'Outside', 'Approved', 'Charlie Paroponent', '10', 'j@gmail.com', 'hasheda_password3', 0, '2025-01-12 02:31:04'),
(13, 'OUT-0013', 1, NULL, 'Outside', 'Approved', 'Charlie Paroponent', '11', 'k@gmail.com', 'hasheda_password3', 0, '2025-01-12 02:32:45'),
(14, 'OUT-0014', 1, NULL, 'Outside', 'Approved', 'Charlie Paroponent', 'test', 'l@gmail.com', '$2a$10$qC4pCbw8K22JvvJreC0h..OPHqHGctpfJuqbiUwH6qSSM14RYYI/2', 0, '2025-01-12 10:45:09'),
(15, 'IN-0015', 1, NULL, 'Inside', 'Approved', 'Charlie Paroponent', '13', 'm@gmail.com', '$2a$10$eDU5k85MqondlZMdFjEt1O4FO.5B7hxA2LKsiuTWDbsX00lfbKPhi', 0, '2025-01-12 11:06:49'),
(16, 'OUT-0016', 1, NULL, 'Outside', 'Approved', 'Charlie Paroponent', 'ac2a', 's@gmail.com', 'hasheda_password3', 0, '2025-01-26 11:17:49'),
(17, 'IN-0017', 1, NULL, 'Inside', 'Approved', 'Charlie Paropo31nent', 'Marls', 'mlbarua@usep.edu.ph', '$2a$10$3oju9zdVHxrFsx0.hZfOwu4qdjDBZNgi6u8EO8NrQzIEVNAlKQkAC', 0, '2025-01-31 12:08:59');

--
-- Triggers `proponents`
--
DROP TRIGGER IF EXISTS `BeforeInsertProponents`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertProponents` BEFORE INSERT ON `proponents` FOR EACH ROW BEGIN
    IF NEW.ProponentId IS NULL THEN
        SET NEW.ProponentId = CONCAT(
            CASE WHEN NEW.ProponentType = 'Inside' THEN 'IN-' ELSE 'OUT-' END,
            LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Proponents), 4, '0')
        );
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `remarks`
--

DROP TABLE IF EXISTS `remarks`;
CREATE TABLE IF NOT EXISTS `remarks` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RemarksId` varchar(10) NOT NULL,
  `Remarks` text NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RemarksId` (`RemarksId`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `remarks`
--

INSERT INTO `remarks` (`Id`, `RemarksId`, `Remarks`) VALUES
(1, 'R-0001', 'Well-written proposal, pending minor revisions'),
(2, 'R-0002', 'Approved for further evaluation.'),
(3, 'R-0003', 'Well-written proposal, pending minor revisions'),
(4, 'R-0004', 'Well-written proposal, pending minor revisions'),
(5, 'R-0005', 'Well-written proposal, pending minor revisions'),
(6, 'R-0006', 'Well-written proposal, pending minor revisions');

--
-- Triggers `remarks`
--
DROP TRIGGER IF EXISTS `BeforeInsertRemarks`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertRemarks` BEFORE INSERT ON `remarks` FOR EACH ROW BEGIN
    IF NEW.RemarksId IS NULL THEN
        SET NEW.RemarksId = CONCAT('R-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Remarks), 4, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
CREATE TABLE IF NOT EXISTS `submission` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SubmissionId` varchar(10) NOT NULL,
  `ProponentId` int NOT NULL,
  `EvaluatorId` int DEFAULT NULL,
  `FileType` enum('Link','File') NOT NULL,
  `ProposalTitle` text NOT NULL,
  `ProposalDescription` text,
  `ResourcesLink` text,
  `SubmissionStatus` enum('OnHold','Evaluation','Completed','ForCorrection') NOT NULL,
  `RemarksId` int DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `SubmissionId` (`SubmissionId`),
  KEY `ProponentId` (`ProponentId`),
  KEY `EvaluatorId` (`EvaluatorId`),
  KEY `RemarksId` (`RemarksId`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `submission`
--

INSERT INTO `submission` (`Id`, `SubmissionId`, `ProponentId`, `EvaluatorId`, `FileType`, `ProposalTitle`, `ProposalDescription`, `ResourcesLink`, `SubmissionStatus`, `RemarksId`, `CreatedAt`) VALUES
(1, 'SUB-0001', 1, 1, 'File', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-25 12:56:56'),
(2, 'SUB-0002', 1, 1, 'File', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'Evaluation', NULL, '2025-01-25 23:26:48'),
(3, 'SUB-0003', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'Completed', NULL, '2025-01-25 23:27:05'),
(4, 'SUB-0004', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'ForCorrection', NULL, '2025-01-26 11:03:58'),
(5, 'SUB-0005', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-26 11:04:50'),
(6, 'SUB-0006', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:34'),
(7, 'SUB-0007', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:36'),
(8, 'SUB-0008', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:37'),
(9, 'SUB-0009', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:37'),
(10, 'SUB-0010', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:38'),
(11, 'SUB-0011', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:39'),
(12, 'SUB-0012', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:39'),
(13, 'SUB-0013', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:40'),
(14, 'SUB-0014', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:41'),
(15, 'SUB-0015', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:41'),
(16, 'SUB-0016', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:42'),
(17, 'SUB-0017', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-29 02:00:43'),
(18, 'SUB-0018', 1, 1, 'Link', 'Proposal 1 Title', 'This is the description of proposal 1.', 'https://resources-link.com/proposal1', 'OnHold', NULL, '2025-01-30 11:48:26'),
(19, 'SUB-0019', 1, 1, 'File', 'Proposal 1 Title', 'This is the description of proposal 1.', NULL, 'OnHold', NULL, '2025-01-30 11:48:50');

--
-- Triggers `submission`
--
DROP TRIGGER IF EXISTS `BeforeInsertSubmission`;
DELIMITER $$
CREATE TRIGGER `BeforeInsertSubmission` BEFORE INSERT ON `submission` FOR EACH ROW BEGIN
    IF NEW.SubmissionId IS NULL THEN
        SET NEW.SubmissionId = CONCAT('S-', LPAD((SELECT IFNULL(MAX(Id), 0) + 1 FROM Submission), 4, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `submissionproponents`
--

DROP TABLE IF EXISTS `submissionproponents`;
CREATE TABLE IF NOT EXISTS `submissionproponents` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SubmissionId` int NOT NULL,
  `ProponentId` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `SubmissionId` (`SubmissionId`,`ProponentId`),
  KEY `ProponentId` (`ProponentId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `submissionproponents`
--

INSERT INTO `submissionproponents` (`Id`, `SubmissionId`, `ProponentId`) VALUES
(1, 1, 1),
(2, 2, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
