-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jan 16. 12:51
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
-- Tábla szerkezet ehhez a táblához `dress`
--

DROP TABLE IF EXISTS `dress`;
CREATE TABLE `dress` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `dress`
--

INSERT INTO `dress` (`id`, `name`, `size`, `color`, `price`, `img`) VALUES
(1, 'PRINT SHIRT DRESS', 'XS,S,M,L ', ' DARK BROWN', '16,19$', 'dress1p1.jpg'),
(2, 'STRIPED MIDI DRESS', 'XS,S,XL ', 'BLUE/WHITE', ' 19,19$', 'dress2p1.jpg'),
(3, 'LINEN BLEND MIDI DRESS', 'XS,S,M,L ', 'CHALK PINK', '19,99$', 'dress3p1.jpg'),
(4, 'DRESS WITH SHOULDER PADS', 'XS,XS', 'TAUPE GREY', '15.22$ ', 'dress4p1.jpg'),
(5, 'STRIPED MINI DRESS', 'XS,M,L ', 'WHITE', '15,99$', 'dress5p1.jpg'),
(6, 'EMBROIDERED TUNIC DRESS', 'XS,M,L', 'WHITE', '16,99$ ', 'dress6p1.jpg'),
(7, 'DRAPED SATIN DRESS', 'S,M,L', 'BLACK', '15,99$', 'dress7p1.jpg'),
(8, 'DRAPED NECK DRESS', 'S,M,L ', 'OEANGE YELLOW', '15,99$', 'dress8p1.jpg'),
(9, 'DRAPED DRESS WITH SHOULDER PADS', 'XS,M,L', 'GREEN', '17$ ', 'dress9p1.jpg'),
(10, 'ZW COLLECTION ZIP-UP DENIM DRESS', 'XS,M,L ', 'DARK BLUE', '17$ ', 'dress10p1.jpg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `dress`
--
ALTER TABLE `dress`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `dress`
--
ALTER TABLE `dress`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
