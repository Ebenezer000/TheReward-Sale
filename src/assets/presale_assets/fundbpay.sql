-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2020 at 10:53 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fundbpay`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_investments_category`
--

CREATE TABLE `app_investments_category` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `app_investments_category`
--

INSERT INTO `app_investments_category` (`id`, `name`) VALUES
(1, 'agriculture'),
(2, 'banking'),
(3, 'education');

-- --------------------------------------------------------

--
-- Table structure for table `app_investments_details`
--

CREATE TABLE `app_investments_details` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `trade_pkgID` varchar(30) NOT NULL,
  `trade_id` varchar(30) NOT NULL,
  `trade_grp` enum('daily','weekly','monthly','yearly') NOT NULL,
  `trade_category` varchar(30) NOT NULL,
  `trade_name` varchar(50) NOT NULL,
  `trade_time` varchar(30) NOT NULL,
  `trade_duration` varchar(30) NOT NULL,
  `trade_wallet` varchar(30) NOT NULL,
  `trade_amount_crypto` double(20,8) NOT NULL DEFAULT 0.00000000,
  `trade_amount` double(20,2) NOT NULL DEFAULT 0.00,
  `trade_returns` double(20,2) NOT NULL DEFAULT 0.00,
  `trade_total_returns` double(20,2) NOT NULL DEFAULT 0.00,
  `trade_capital_back` double(20,2) NOT NULL DEFAULT 0.00,
  `trade_ppt` double(5,2) NOT NULL DEFAULT 0.00,
  `trade_status` enum('ACTIVE','EXPIRED','DISABLED') NOT NULL DEFAULT 'ACTIVE',
  `trade_token` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_investments_details`
--

INSERT INTO `app_investments_details` (`id`, `uid`, `trade_pkgID`, `trade_id`, `trade_grp`, `trade_category`, `trade_name`, `trade_time`, `trade_duration`, `trade_wallet`, `trade_amount_crypto`, `trade_amount`, `trade_returns`, `trade_total_returns`, `trade_capital_back`, `trade_ppt`, `trade_status`, `trade_token`) VALUES
(3, 450, '85efd91651c', '997fd713d381a3fa4eced4826d0bdc', 'daily', 'banking', 'Diamond', '11/19/2020 04:33:13 PM', '12/19/2020 04:33:13 PM', 'ETH', 0.00300000, 20000.00, 300.00, 9000.00, 20000.00, 1.50, 'ACTIVE', '0ffaad8de201d7d3760b9190de88f4b1');

-- --------------------------------------------------------

--
-- Table structure for table `app_investments_plans`
--

CREATE TABLE `app_investments_plans` (
  `id` int(11) NOT NULL,
  `pkgID` varchar(11) NOT NULL,
  `pkgGrp` enum('daily','weekly','monthly','yearly') NOT NULL,
  `pkgName` varchar(100) NOT NULL,
  `pkgEntry` double(20,2) NOT NULL,
  `pkgROI` double(5,2) NOT NULL,
  `pkgRC` double(5,2) NOT NULL,
  `pkgCB` enum('Y','N') NOT NULL DEFAULT 'N',
  `pkgDuration` varchar(30) NOT NULL,
  `pkgCategory` varchar(30) NOT NULL,
  `pkgDescription` text NOT NULL,
  `pkgStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_investments_plans`
--

INSERT INTO `app_investments_plans` (`id`, `pkgID`, `pkgGrp`, `pkgName`, `pkgEntry`, `pkgROI`, `pkgRC`, `pkgCB`, `pkgDuration`, `pkgCategory`, `pkgDescription`, `pkgStatus`) VALUES
(1, '85efd91651c', 'daily', 'Diamond', 20000.00, 1.50, 0.35, 'Y', '30', 'banking', 'Enter into the world of banking', 1);

-- --------------------------------------------------------

--
-- Table structure for table `app_investments_runtime`
--

CREATE TABLE `app_investments_runtime` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `aid` varchar(100) NOT NULL,
  `pid` varchar(100) NOT NULL,
  `trade_id` varchar(200) NOT NULL,
  `pAmount` double(20,2) NOT NULL,
  `pPPT` double(20,2) NOT NULL,
  `rPPT` double(20,2) NOT NULL,
  `mToAdd` int(11) NOT NULL,
  `nextDate` varchar(30) NOT NULL,
  `trade_grp` enum('daily','weekly','monthly','yearly') NOT NULL,
  `trade_name` varchar(50) NOT NULL,
  `trade_capital_back` double(20,2) NOT NULL DEFAULT 0.00,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_investments_runtime`
--

INSERT INTO `app_investments_runtime` (`id`, `uid`, `aid`, `pid`, `trade_id`, `pAmount`, `pPPT`, `rPPT`, `mToAdd`, `nextDate`, `trade_grp`, `trade_name`, `trade_capital_back`, `status`) VALUES
(3, 450, 'c98024f1fb9e61e1bd664742f638c37cdf7a24b5f6d458bab18d4f69f30e6f2a', '85efd91651c', '997fd713d381a3fa4eced4826d0bdc83', 20000.00, 1.50, 0.35, 29, '12/19/2020 04:33:13 PM', 'daily', 'Diamond', 20000.00, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_investments_category`
--
ALTER TABLE `app_investments_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_investments_details`
--
ALTER TABLE `app_investments_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_investments_plans`
--
ALTER TABLE `app_investments_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_investments_runtime`
--
ALTER TABLE `app_investments_runtime`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_investments_category`
--
ALTER TABLE `app_investments_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `app_investments_details`
--
ALTER TABLE `app_investments_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `app_investments_plans`
--
ALTER TABLE `app_investments_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `app_investments_runtime`
--
ALTER TABLE `app_investments_runtime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
