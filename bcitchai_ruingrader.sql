-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 15, 2021 at 06:29 PM
-- Server version: 5.7.33-log-cll-lve
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bcitchai_ruingrader`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `api_keys` (
  `key_id` int(11) NOT NULL,
  `key_actual` varchar(25) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `api_keys`
--

INSERT INTO `api_keys` (`key_id`, `key_actual`, `user_id`) VALUES
(27, 'SUOuRwC6llGACxUMeyf6tzGlN', 2),
(28, '3PHnEslzbyqpOikV0pCpkyx5H', 2),
(29, 'OdIApulgePKF0MGifwIPzTO7l', 2),
(30, 'CNbGVgqV2iIxRPfgNPZkJGQD9', 7),
(31, '9TXOLnhp6aPYfRdeR23iL3GsU', 7),
(32, '7zon8wwlFX7q4qoPMpFUMu5kk', 7),
(33, 'PJShr4AGKIPHjEmNUqMNqW0YE', 7),
(34, 'Hu0gpA7H7tJvFXeopkljnnUs7', 7),
(35, 'yiyzEr0XWuW2hrAuD7GurjzE0', 7),
(36, 'kOa0xTb1FoUwo4PvqynYLnmDb', 7),
(37, 'SPbrZKeDHTUaEKPybt9wWk4AF', 7),
(38, 'wIjeuJ7pr8mNKxmb8itqUoV8O', 7),
(39, 'OITSiNi9hYqh4GkJKkS2EKSVb', 7),
(40, 'yeLL917LllRsdt0pBf8G5iYc1', 7),
(41, 'JJiEK6doQA22BETvMmKsYNe0K', 7),
(42, 'NnfymIm0mIw96pQIoUW7PCMwD', 7),
(43, 'S7tPpabpEdpbGEKViyBIplhTI', 7),
(44, 'fEhKK9k3SyHWBCI6d6ahcq0Sl', 7),
(45, 'CynXc5sDliAJ73rYKsDWxVL64', 7),
(46, 'rai4kaJYHrCk1lhqv2kLmL2hW', 7),
(47, 'orSUzpyAoJdugCLoxerXZBtc9', 7),
(48, 'HbfvsgCB9qxLkv0zQNwbl0apV', 7),
(49, 'BVNEoIAzL6aQMKLIfVTrO9Jt0', 7),
(50, 'onO2cXaghHgdZ7P3nGwY7VmeE', 7),
(51, 'qmxdLjjm2ZZYO6VrT9kMEHDJm', 7),
(52, 'JbctrHaOJgFyPYwlPN9ppTvaW', 7),
(53, 'K5l81R491BcKUAyboKcWCwQ9q', 7),
(54, 'ikpiVnWQlRizVj2YLY4HxPh69', 7),
(55, 'e10CUln2fyq8wNXVb7nsBQIZb', 7),
(56, 'hAdRpVHxl6Koz7FnYx8YvS7BV', 7),
(57, 'EaADyOgNfzBjgKZD5OKZJB45X', 7),
(58, 'SRK4vGiC63vwzDuSsW71GCmt2', 7),
(59, 'hEtC4zW4lEhTyB8MzIFBTDfzR', 7),
(60, 'IfOhvePgxZrPXVTE7R2omCMFN', 7),
(61, 'YFNldBRrO3YHh7GsT75YVN21C', 7),
(62, '1aaNIIZeBLg05EDszc3HuEKra', 7),
(63, 'nYBxj26bW61cyEHpjBxmHQoPP', 7),
(64, 'L1SGXrcmci4ag5DOMKmG889oy', 7),
(65, '6nT7dmaNPe4ilmOI0IlVxadhZ', 7),
(66, 'eSSWmhOzLx2vv7N3BRKodFioZ', 7),
(67, '2oylQNYl5nSRy2ZNgpHOBs5on', 7),
(68, '6zU6swO3vpOIKD4H2NgaO7MfA', 7),
(69, 'iD6u0LOcIBfetlcS5jFU97C1V', 7),
(70, 'AeR9vnSoq3ZNCRtgjfdm4bePH', 7),
(71, '3J4tvH0VFXTFWm5r9e0dbHogN', 7),
(72, 'mndePcMqOyniMbLtVHMjKHveO', 10),
(73, 'VErPymPbfsbhfSUmpk765jFUJ', 7),
(74, 'Cs4N5QQK5o8vj9DOnlOKA7eCr', 7),
(75, 'O27fiqtLcemvHJ2VvbX9HFEtn', 7),
(76, 'bZkdHApsLCdaToyOee5DcTGzh', 7),
(77, 'bdMnwdcchM3GR9c8VkSxFLeiw', 2),
(78, 'AM2YFzdCHuoLOlewdS396l8ze', 7),
(79, 'p91jz3HsVlFLj5aOvQUBWMQkl', 7),
(80, 'IPqCteFsZ9uTcPKqxMPYZ3dLl', 7),
(81, 'ALOtwWu92WHauOJ5L2fFfadqZ', 7),
(82, 'GliqM18Tdu4iYVemzlGaNbIiv', 7),
(83, 'KqnTWWsoo2hAhAAHjXdQ9e7fJ', 7),
(84, 'i1SjUHmO0YKk7ulZY5SB5MEv0', 7),
(85, 'PEYOcvbYzp6DwZg415Vnd9OfC', 7),
(86, 'OQh3r5N8xx6VbePYa09UpfQRi', 7),
(87, 'j9vV26Diejz58Q7X5tV4cQuZ4', 7),
(88, '8p6f39Rn9cK7Uc2fgHmPcLZvH', 7),
(89, 'RDlHE2WLRPpxzoJte3nMPOQyS', 7),
(90, '3xf7vlPpC0xoZpONiTKsmDQTF', 7),
(91, '2CUCu0oBvQhzq9l51Gy8YEWkr', 7),
(92, 'bG5BU19oBO6sLrAg0vd5GcBv1', 7),
(93, 'xvHb6XaifO6hjxDci17HjtCc0', 7),
(94, '3s1zMezc4GR1DzgTyZ4geyHdY', 7),
(95, 'ZijdR915Vut6JqaqojYjIWU6t', 7),
(96, 'DZV62ytQM36jKNTVLgHjryXUC', 7),
(97, 'qQeipYkAF1SF81vPLqwYXw29m', 7),
(98, 'GcVKePKgIlXNPpNhp8KsdLPKk', 7),
(99, 'iB5zwh6xEkEH8a0qY0XyEgJso', 7),
(100, 'xU4TszHWPEssCDW7sC3oSBAOs', 7),
(101, 'zQwr5PwkXbhNkRk3hlAh31oa1', 7),
(102, 'IPbjPqxsSl1KDZXfUBDYyWpAb', 7),
(103, 'x435JRCUvWeiltnYwkLQssBeW', 7),
(104, '0ADdakDn5saAq1qFIDQzZSoZS', 7),
(105, '50vR9ClyipUlsJOK95A2jmpoA', 7),
(106, 'V7uQmqe6l88qRZmtDABDuQkZM', 11),
(107, 'FKSTnnXBeRRydRTTGKj9eBzAL', 11),
(108, 'qdHh8VFtB3ylmHG1XTTA7VJBp', 11),
(109, '97jbLTeaD6CEUg5PsAp3vPXxw', 11),
(110, 'KTIq3U8oV5fDqrsEYaSP2Wrw7', 7),
(111, 'L2awCC8SGmePgTkZ0Ii7ltLz0', 11),
(112, 'hucBzEV2OE2BeWx14f5G0ksab', 11),
(113, 'mJCpkVJxpGR2RXtF9JH1ZsocR', 11),
(114, 'FtKNh4JkvXdgRc6nOhWuvKfmb', 7),
(115, 'lHxfYpude2kXUhHzYisHrxQgB', 7),
(116, 'GZOXcVVfwLG2UgNGvNWDDbIK1', 7),
(117, 'JI9IbxfxyvPSg1sGSIURm03cS', 7),
(118, 'PNUvViNqHMyAKm4TpkYe1QT0W', 7),
(119, 'neXJuD21SZ6dC7c3Jfcmomz3x', 7),
(120, 'ibT0c2CZ2HxCNvUgr22EI4NIM', 7),
(121, 'UkzwBgjCK4IAUKhvaJil0MiUl', 12),
(122, 'SDKlcjiuBZqInESFqU33M8Vyq', 12),
(123, 'y8TT9FAmJcTo6Zhwgj6jPqKC1', 12),
(124, 'CnaIalSDp7L7onPgU9OPohVqk', 12),
(125, '9j10iiim22wajubTKSyHBq6DT', 13),
(126, 'Q54BMEvBIvqPN7DWlWKfcGvFm', 14);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `user_id`, `name`) VALUES
(1, 2, 'test'),
(8, 7, 'TestClass'),
(14, 7, 'Magic'),
(15, 7, 'Web Design'),
(20, 11, 'PirateClass'),
(21, 7, 'Economics'),
(22, 12, 'App Dev'),
(24, 12, 'Chemistry'),
(25, 13, 'COMP1111'),
(26, 14, 'Demon Killing'),
(27, 13, 'COMP2020');

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `grade_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grade`
--

INSERT INTO `grade` (`grade_id`, `class_id`, `name`, `score`) VALUES
(1, 1, 'poggers', 99),
(2, 1, 'yeet', 65),
(3, 8, 'Lab 1', 75),
(4, 8, 'Lab 2', 100),
(5, 8, 'Lab 3', 80),
(6, 8, 'Test 1', 56),
(7, 8, 'Test 2', 68),
(8, 14, 'Acid Lab', 10),
(9, 20, 'Dragon Slaying', 100),
(10, 20, 'Claymore Wielding', 95),
(11, 8, 'Test3', 15),
(16, 22, 'Lab 2', 12),
(17, 24, 'Lab 5', 13),
(18, 25, 'Dumb', 100),
(19, 25, 'Silly', 95),
(20, 27, 'Another', 33),
(21, 26, 'Shotgun Shooting', 100);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password_hashed` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `fname`, `lname`, `username`, `password_hashed`) VALUES
(1, 'a', 'b', 'c', 'd'),
(2, 'F', 'L', 'test', 'password'),
(3, 'carrot', 'darrot', 'apple', 'banana'),
(4, 'null', 'null', 'null', '1234'),
(5, 'cccccarrot', 'ddddarrot', 'aaaaaaaaaapple', 'bbbbbbbanana'),
(6, 'null', 'null', 'null', '123456'),
(7, 'Ning', 'Guang', 'tianquan', '1234'),
(8, 'Client', 'Test', 'clienttest', '123456'),
(9, 'newbie', 'user', 'newuser', '123456'),
(10, 'admin', 'user', 'admin', '123456'),
(11, 'undefined', 'undefined', 'undefined', 'undefined'),
(12, 'Kibum', 'Park', 'Syka', 'undefined'),
(13, 'paolo', 'delrio', 'chair', 'undefined'),
(14, 'Demon', 'Slayer', 'Mars', 'undefined');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`key_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `fkey` (`user_id`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`grade_id`),
  ADD KEY `fkey2` (`class_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `key_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `fkey2` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
