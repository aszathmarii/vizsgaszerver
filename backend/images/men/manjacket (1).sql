-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jan 16. 13:10
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
-- Tábla szerkezet ehhez a táblához `manjacket`
--

DROP TABLE IF EXISTS `manjacket`;
CREATE TABLE `manjacket` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `manjacket`
--

INSERT INTO `manjacket` (`id`, `name`, `size`, `color`, `price`, `img`) VALUES
(1, 'WATER-REPELLENT DOWN PUFFER JACKET  ', 'S, M, L ', 'LIGHT BLUE', '45,19$ ', 'manjacket1p1.jpg\r\n'),
(2, 'DENIM BIKER JACKET', 'M,L,XL, ', 'BLUE', '45,19$ ', 'manjacket2p2.jpg'),
(3, 'FAUX SUEDE BOXY FIT JACKET', 'S, M, L ,XL', 'GREY', '44,99$', 'manjacket3p1.jpg'),
(4, 'BOXY FIT PADDED JACKET', 'S, M, L ', 'BLUE MARL', '25,55$', 'manjacket4p1.jpg'),
(5, '100% LINEN JACKET', 'S,M,L,XL', 'TOBACCO', '30,99$', 'manjacket5p1.jpg'),
(6, 'HOODED RIPSTOP JACKET', 'S,M,L,XL', 'DARK RED', '25,99$', 'manjacket6p1.jpg'),
(7, 'WATER-REPELLENT DOWN PUFFER JACKET  ', 'S, M, L', 'LIGHT BLUE', '19$', 'manjacket7p1.jpg'),
(8, 'DENIM JACKET - LIMITED EDITION', 'S,M,L,XL', 'CHOCOLATE', '45,19$', 'manjacket8p1.jpg'),
(9, 'CROPPED PUFFER JACKET', 'S,M,L,XL', 'BEIGE ', '45,19$', 'manjacket9p1.jpg'),
(10, 'FAUX LEATHER PUFFER JACKET', 'S,M,L,XL', 'BLACK', '45,19$', 'manjacket10p1.jpg'),
(11, 'QUILTED BOMBER JACKET', 'S,M,L,XL', 'LIGHT GREY', '40,29$', 'manjacket11p1.jpg'),
(12, 'PUFFER JACKET', 'S,M,L,XL', 'TAUPE GREY', '40,99$', 'manjacket12p1.jpg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `manjacket`
--
ALTER TABLE `manjacket`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `manjacket`
--
ALTER TABLE `manjacket`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
