-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jan 16. 12:53
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `chlotesvizsga`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tops`
--

DROP TABLE IF EXISTS `tops`;
CREATE TABLE `tops` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tops`
--

INSERT INTO `tops` (`id`, `name`, `size`, `color`, `price`, `img`) VALUES
(1, 'STRAPLESS TOP WITH BELT', 'XS,S,M,L,XL', 'GREY', '15,99$', 'top1p1.jpg'),
(2, 'RIBBED KNIT TOP', 'XS,S,M,L,XL ', 'GREY', '15,99$', 'top2p1.jpg'),
(3, 'RIBBED KNIT TOP', 'XS,S,M,L', 'TAUPE GREY', '11,99$', 'top3p1.jpg'),
(4, 'SOFT TURTLENECK TOP', 'XS,S,M,L', 'ECRU', '15,99$', 'top4p1.jpg'),
(5, 'TRF DENIM SURPLICE TOP', 'XS,S,M,L,XL ', 'BLUE', '16.99$ ', 'top5p1.jpg'),
(6, 'TEXTURED TOP WITH KNOT', 'XS,S,M,L,XL', 'WHITE ', '16.99$ ', 'top6p1.jpg'),
(7, 'WOOL BLEND KNIT CAPE TOP', 'S,M,L ', 'BLACK', '11,99$', 'top7p1.jpg'),
(8, 'LAYERED PLEATED TOP', 'XS,S,M,L,XL ', 'BLACK', '12$', 'top8p.jpg'),
(9, 'MINIMALIST SOFT SWEATER', 'XS,S,M,L,XL ', 'GREY MARL', '12$', 'top9p1.jpg'),
(10, 'LINEN TOP WITH RHINESTONES', 'XS,S,M,L', 'BEIGE', '15,99$', 'top10p1.jpg'),
(11, 'TRF DENIM CROP TOP WITH RHINESTONES', 'XS,S,M,L', 'LIGHT BLUE ', '15,99$', 'top11p1.jpg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tops`
--
ALTER TABLE `tops`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tops`
--
ALTER TABLE `tops`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
