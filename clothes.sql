-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 27. 14:40
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `clothes`
--
CREATE DATABASE IF NOT EXISTS `clothes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `clothes`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `orderingID` int(11) NOT NULL,
  `userID` int(11) NOT NULL COMMENT 'a felhasználó azonosítója',
  `productID` int(11) NOT NULL COMMENT 'a termék azonosítója',
  `stock` int(11) NOT NULL COMMENT 'a megvásárolni kívánt termék darabszáma',
  `price` int(11) NOT NULL COMMENT 'a megvásárolni kívánt termék ára'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cartsession`
--

DROP TABLE IF EXISTS `cartsession`;
CREATE TABLE `cartsession` (
  `userID` int(11) NOT NULL COMMENT 'a fehasználó azonosítója',
  `productID` int(11) NOT NULL COMMENT 'a termék azonosítója',
  `currentStock` int(11) NOT NULL COMMENT 'az adott termékből hány db van a kosárban',
  `allPrice` int(11) NOT NULL COMMENT 'az adott termék ára a darabszámmal megszorozva'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `cartsession`
--

INSERT INTO `cartsession` (`userID`, `productID`, `currentStock`, `allPrice`) VALUES
(2, 202, 4, 40),
(2, 202, 2, 20),
(2, 202, 4, 40),
(2, 202, 4, 40);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cathegory`
--

DROP TABLE IF EXISTS `cathegory`;
CREATE TABLE `cathegory` (
  `cathegoryID` int(11) NOT NULL COMMENT 'a kategória azonosítója',
  `cathegory` varchar(50) NOT NULL COMMENT 'a kategória'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `cathegory`
--

INSERT INTO `cathegory` (`cathegoryID`, `cathegory`) VALUES
(1, 'dress'),
(2, 'hoodies'),
(3, 'manjacket'),
(4, 'sweater'),
(5, 'tops'),
(6, 'woman'),
(7, 'jeans');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE `colors` (
  `colorID` int(11) NOT NULL COMMENT 'a szín azonosítója',
  `color` varchar(50) NOT NULL COMMENT 'a szín'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `colors`
--

INSERT INTO `colors` (`colorID`, `color`) VALUES
(1, 'Blue'),
(2, 'Black'),
(3, 'White'),
(4, 'Red'),
(5, 'Green'),
(6, 'asdasd');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ordering`
--

DROP TABLE IF EXISTS `ordering`;
CREATE TABLE `ordering` (
  `orderingID` int(11) NOT NULL COMMENT 'a rendelés azonosítója',
  `userID` int(11) NOT NULL COMMENT 'a felhasználó azonosítója',
  `price` int(11) NOT NULL COMMENT 'a rendelésért fizetett összeg',
  `orderDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'a rendelés dátuma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ordering`
--

INSERT INTO `ordering` (`orderingID`, `userID`, `price`, `orderDate`) VALUES
(139, 2, 60, '2024-03-27 12:35:29'),
(140, 2, 100, '2024-03-27 12:36:52'),
(141, 2, 100, '2024-03-27 12:37:26'),
(142, 2, 140, '2024-03-27 12:37:49'),
(143, 2, 140, '2024-03-27 12:38:05');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productID` int(11) NOT NULL COMMENT 'a termék azonosítója',
  `name` varchar(50) NOT NULL COMMENT 'a termék neve',
  `sizeID` int(11) NOT NULL COMMENT 'a méret azonosítója',
  `colorID` int(11) NOT NULL COMMENT 'a szín azonosítója',
  `cathegoryID` int(11) NOT NULL COMMENT 'a kategória azonosítója',
  `price` int(11) NOT NULL COMMENT 'a termék ára',
  `stock` int(11) NOT NULL COMMENT 'az elérhető darabszám',
  `img` varchar(255) NOT NULL COMMENT 'a termék képe'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`productID`, `name`, `sizeID`, `colorID`, `cathegoryID`, `price`, `stock`, `img`) VALUES
(202, 'asdasd', 2, 4, 4, 10, 6, '2024_03_26__MG_5256.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `size`
--

DROP TABLE IF EXISTS `size`;
CREATE TABLE `size` (
  `sizeID` int(11) NOT NULL COMMENT 'a méret azonosítója',
  `size` varchar(5) NOT NULL COMMENT 'a méret'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `size`
--

INSERT INTO `size` (`sizeID`, `size`) VALUES
(1, 'XS'),
(2, 'S'),
(3, 'M'),
(4, 'L'),
(5, 'XL'),
(6, 'XXL');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL COMMENT 'a felhasználó azonosítója',
  `email` varchar(50) NOT NULL COMMENT 'a felhasználó email címe',
  `username` varchar(50) NOT NULL COMMENT 'a felhasználónév',
  `password` varchar(255) NOT NULL COMMENT 'a felhasználó jelszava',
  `role` tinyint(1) NOT NULL COMMENT 'a felhasználó szerepköre',
  `userImage` varchar(255) NOT NULL COMMENT 'a profilkép',
  `birthday` date NOT NULL COMMENT 'a felhasználó születési dátuma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`userID`, `email`, `username`, `password`, `role`, `userImage`, `birthday`) VALUES
(1, 'admin@admin.hu', 'ghgh', '$2b$10$JRBalWfvaabTvOBJG1GXFOk5qhbm40JmdBc87EYzcgnxSWB6jQFSK', 1, '2024_03_26_357885172_182321131267387_143092518875458637_n.jpg', '2024-03-16'),
(2, 'teszt@teszt.hu', '123', '$2b$10$.UScPs5Sv7LLaB48Cxnaze9TkUPzKU8POACXHphlTnAsFxGHWlNXC', 0, '2024_03_05_2024_03_01_2024_02_28_2024_02_21__MG_5256.jpg', '0000-00-00'),
(5, 'asd@asd.hu', 'asd', '$2b$10$ufHjKskx9Q99gmiKCeokYeR98BjTuX8B2CDGPPpAIekwZIuJxSI4y', 0, 'no_image.png', '0000-00-00'),
(6, '123@123.hu', '123', '$2b$10$tLzG3SXjbU7nIuZH0X4CCOO9teIPtjvb/DI4oa0pj9Lg5piKghxrW', 1, 'no_image.png', '0000-00-00');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cart`
--
ALTER TABLE `cart`
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `orderingID` (`orderingID`);

--
-- A tábla indexei `cartsession`
--
ALTER TABLE `cartsession`
  ADD KEY `useriID` (`userID`),
  ADD KEY `productID` (`productID`);

--
-- A tábla indexei `cathegory`
--
ALTER TABLE `cathegory`
  ADD PRIMARY KEY (`cathegoryID`);

--
-- A tábla indexei `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`colorID`);

--
-- A tábla indexei `ordering`
--
ALTER TABLE `ordering`
  ADD PRIMARY KEY (`orderingID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `sizeID` (`sizeID`),
  ADD KEY `colodID` (`colorID`),
  ADD KEY `cathegoryID` (`cathegoryID`);

--
-- A tábla indexei `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`sizeID`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cathegory`
--
ALTER TABLE `cathegory`
  MODIFY `cathegoryID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a kategória azonosítója', AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `colors`
--
ALTER TABLE `colors`
  MODIFY `colorID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a szín azonosítója', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `ordering`
--
ALTER TABLE `ordering`
  MODIFY `orderingID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a rendelés azonosítója', AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a termék azonosítója', AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT a táblához `size`
--
ALTER TABLE `size`
  MODIFY `sizeID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a méret azonosítója', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'a felhasználó azonosítója', AUTO_INCREMENT=15;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`orderingID`) REFERENCES `ordering` (`orderingID`);

--
-- Megkötések a táblához `cartsession`
--
ALTER TABLE `cartsession`
  ADD CONSTRAINT `cartsession_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `cartsession_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `ordering`
--
ALTER TABLE `ordering`
  ADD CONSTRAINT `ordering_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`colorID`) REFERENCES `colors` (`colorID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`sizeID`) REFERENCES `size` (`sizeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`cathegoryID`) REFERENCES `cathegory` (`cathegoryID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
