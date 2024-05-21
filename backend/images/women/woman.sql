-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jan 16. 13:08
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
-- Tábla szerkezet ehhez a táblához `woman`
--

DROP TABLE IF EXISTS `woman`;
CREATE TABLE `woman` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `woman`
--

INSERT INTO `woman` (`id`, `name`, `size`, `color`, `price`, `img`) VALUES
(1, 'ZW 2-IN-1 TECHNICAL JACKET - LIMITED EDITION ', 'S,M,L', 'BLACK ', '59,99$', 'woman1p1.jpg'),
(2, 'SHORT TRENCH-STYLE FAUX SUEDE JACKET', 'XS,S,M,L,XL.XXL ', 'CAMEL', '44,12$  ', 'woman2p1.jpg'),
(3, 'ZW COLLECTION MANTECO WOOL JACKET', 'XS,S,M,L ', 'ANTHRACITE GREY ', ' 48,65$', 'woman3p1.jpg'),
(4, 'DISTRESSED-EFFECT NYLON BOMBER JACKET', 'XS,S,M,L,XL,XXL', ' KHAKI', ' 36,56$', 'woman4p1.jpg'),
(5, 'WORN EFFECT LEATHER EFFECT BOMBER JACKET', 'XS,S,M,L,XL,XXL', 'BLACK', ' 47,99$', 'woman5p1.jpg'),
(6, 'FAUX SHEARLING JACKET WITH HOOD', 'XS,S,M,L', 'ECRU ', '35,75$', 'woman6p1.jpg'),
(7, 'ZW CONTRAST DENIM BOMBER JACKET', 'XS,S,M,L,XL', ' BLUE ', '49,99$', 'woman7p1.jpg'),
(8, 'ORGANZA BOMBER JACKET', 'XS,S,M,L,XL', ' BLACK ', ' 34,55$', 'woman8p1.jpg'),
(9, 'ZW COLLECTION SHORT BOMBER JACKET', 'XS,S,M,L,XL ', 'KHAKI ', '47,66$', 'woman9p1.jpg'),
(10, 'CROPPED COTTON WAXED JACKET', 'S,M,L,XL,XXL', 'BROWN ', ' 36,88$', 'woman10p1.jpg'),
(11, 'SATIN CROPPED BOMBER JACKET', 'XS,S,M,L,XL', ' BLUE ', '29,59$', 'woman11p1.jpg'),
(12, 'ZW COLLECTION SHORT BOMBER JACKET', 'XS,S,M,L,XL', 'NAVY BLUE', ' 45,99$ ', 'woman12p1.jpg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `woman`
--
ALTER TABLE `woman`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `woman`
--
ALTER TABLE `woman`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
