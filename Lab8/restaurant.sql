-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 04:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` enum('Starter','Main','Dessert','Drink') NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `vegetarian` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `category`, `price`, `vegetarian`) VALUES
(1, 'Tomato Soup', 'Starter', 4.50, 1),
(2, 'Grilled Chicken', 'Main', 21.00, 0),
(3, 'Vegetable Lasagna', 'Main', 10.00, 1),
(4, 'Pizza', 'Main', 10.00, 0),
(5, 'Lemonade', 'Drink', 2.50, 1),
(6, 'Taco', 'Main', 10.00, 0),
(7, 'Tiramisu', 'Dessert', 5.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `order_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `dish_id`, `customer_name`, `quantity`, `order_time`) VALUES
(22, 1, 'Olivia', 2, '2025-07-01 14:15:00'),
(23, 3, 'Marcus', 1, '2025-07-02 17:45:00'),
(24, 2, 'Priya', 3, '2025-07-02 22:30:00'),
(25, 5, 'Ethan', 1, '2025-07-03 16:00:00'),
(26, 1, 'Zoe', 1, '2025-07-04 13:05:00'),
(27, 5, 'Carlos', 2, '2025-07-04 20:50:00'),
(28, 2, 'Lina', 2, '2025-07-05 15:20:00'),
(29, 1, 'Dorsa', 2, '2025-07-14 02:13:10'),
(30, 3, 'Ali', 1, '2025-07-14 02:13:10'),
(31, 2, 'Layla', 3, '2025-07-14 02:13:10'),
(32, 4, 'Hassan', 1, '2025-07-14 02:13:10'),
(33, 1, 'Fatima', 1, '2025-07-14 02:13:10'),
(34, 5, 'Zara', 2, '2025-07-14 02:13:10'),
(35, 2, 'Omar', 2, '2025-07-14 02:13:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dish_id` (`dish_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
