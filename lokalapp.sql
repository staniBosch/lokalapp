-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 04. Dez 2018 um 09:42
-- Server-Version: 10.1.37-MariaDB-0+deb9u1
-- PHP-Version: 7.0.30-0+deb9u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `lokalapp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `accelerometer`
--

CREATE TABLE `accelerometer` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `z` double NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `batterie`
--

CREATE TABLE `batterie` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bluetooth`
--

CREATE TABLE `bluetooth` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gps`
--

CREATE TABLE `gps` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Latitude` double NOT NULL,
  `Longitude` double NOT NULL,
  `Hoehe` double NOT NULL,
  `session_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gyroskop`
--

CREATE TABLE `gyroskop` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `z` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kompass`
--

CREATE TABLE `kompass` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `degree` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `licht`
--

CREATE TABLE `licht` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` decimal(10,0) NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `luftfeuchtigkeit`
--

CREATE TABLE `luftfeuchtigkeit` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `humidity` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `magnetometer`
--

CREATE TABLE `magnetometer` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `z` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `netzwerklokalisierung`
--

CREATE TABLE `netzwerklokalisierung` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `latitudeGPS` float NOT NULL,
  `longitudeGPS` float NOT NULL,
  `altitudeGPS` float NOT NULL,
  `speedGPS` float NOT NULL,
  `accuracyGPS` float NOT NULL,
  `latitudeNetwork` float NOT NULL,
  `longitudeNetwork` float NOT NULL,
  `altitudeNetwork` float NOT NULL,
  `speedNetwork` float NOT NULL,
  `accuracyNetwork` float NOT NULL,
  `latitudeHighAcc` float NOT NULL,
  `longitudeHighAcc` float NOT NULL,
  `altitudeHighAcc` float NOT NULL,
  `speedHighAcc` float NOT NULL,
  `accuracyHighAcc` float NOT NULL,
  `latitudeBalanced` float NOT NULL,
  `longitudeBalanced` float NOT NULL,
  `altitudeBalanced` float NOT NULL,
  `speedBalanced` float NOT NULL,
  `accuracyBalanced` float NOT NULL,
  `latitudeLowPow` float NOT NULL,
  `longitudeLowPow` float NOT NULL,
  `altitudeLowPow` float NOT NULL,
  `speedLowPow` float NOT NULL,
  `accuracyLowPow` float NOT NULL,
  `latitudeNoPow` float NOT NULL,
  `longitudeNoPow` float NOT NULL,
  `altitudeNoPow` float NOT NULL,
  `speedNoPow` float NOT NULL,
  `accuracyNoPow` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `proximity`
--

CREATE TABLE `proximity` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schrittzaehler`
--

CREATE TABLE `schrittzaehler` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` int(11) NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schwerkraft`
--

CREATE TABLE `schwerkraft` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `umgebungsluftdruck`
--

CREATE TABLE `umgebungsluftdruck` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `umgebungstemperatur`
--

CREATE TABLE `umgebungstemperatur` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `waypoint`
--

CREATE TABLE `waypoint` (
  `id` int(11) NOT NULL,
  `timestamp` date NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `altitude` float NOT NULL,
  `indoor` tinyint(1) NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `wifi`
--

CREATE TABLE `wifi` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` float NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `accelerometer`
--
ALTER TABLE `accelerometer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `batterie`
--
ALTER TABLE `batterie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `batterie_ibfk_1` (`session_id`);

--
-- Indizes für die Tabelle `bluetooth`
--
ALTER TABLE `bluetooth`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bluetooth_ibfk_1` (`session_id`);

--
-- Indizes für die Tabelle `gps`
--
ALTER TABLE `gps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`session_id`);

--
-- Indizes für die Tabelle `gyroskop`
--
ALTER TABLE `gyroskop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `kompass`
--
ALTER TABLE `kompass`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `licht`
--
ALTER TABLE `licht`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `luftfeuchtigkeit`
--
ALTER TABLE `luftfeuchtigkeit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `magnetometer`
--
ALTER TABLE `magnetometer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `netzwerklokalisierung`
--
ALTER TABLE `netzwerklokalisierung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `proximity`
--
ALTER TABLE `proximity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `schrittzaehler`
--
ALTER TABLE `schrittzaehler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `schwerkraft`
--
ALTER TABLE `schwerkraft`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `umgebungsluftdruck`
--
ALTER TABLE `umgebungsluftdruck`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `umgebungstemperatur`
--
ALTER TABLE `umgebungstemperatur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `waypoint`
--
ALTER TABLE `waypoint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indizes für die Tabelle `wifi`
--
ALTER TABLE `wifi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `accelerometer`
--
ALTER TABLE `accelerometer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=963;
--
-- AUTO_INCREMENT für Tabelle `batterie`
--
ALTER TABLE `batterie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `bluetooth`
--
ALTER TABLE `bluetooth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `gps`
--
ALTER TABLE `gps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;
--
-- AUTO_INCREMENT für Tabelle `gyroskop`
--
ALTER TABLE `gyroskop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=448;
--
-- AUTO_INCREMENT für Tabelle `kompass`
--
ALTER TABLE `kompass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `licht`
--
ALTER TABLE `licht`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `luftfeuchtigkeit`
--
ALTER TABLE `luftfeuchtigkeit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `magnetometer`
--
ALTER TABLE `magnetometer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `netzwerklokalisierung`
--
ALTER TABLE `netzwerklokalisierung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;
--
-- AUTO_INCREMENT für Tabelle `proximity`
--
ALTER TABLE `proximity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `schrittzaehler`
--
ALTER TABLE `schrittzaehler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `schwerkraft`
--
ALTER TABLE `schwerkraft`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT für Tabelle `umgebungsluftdruck`
--
ALTER TABLE `umgebungsluftdruck`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `umgebungstemperatur`
--
ALTER TABLE `umgebungstemperatur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `waypoint`
--
ALTER TABLE `waypoint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `wifi`
--
ALTER TABLE `wifi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `accelerometer`
--
ALTER TABLE `accelerometer`
  ADD CONSTRAINT `session_id` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `batterie`
--
ALTER TABLE `batterie`
  ADD CONSTRAINT `batterie_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `bluetooth`
--
ALTER TABLE `bluetooth`
  ADD CONSTRAINT `bluetooth_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `gps`
--
ALTER TABLE `gps`
  ADD CONSTRAINT `gps_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `gyroskop`
--
ALTER TABLE `gyroskop`
  ADD CONSTRAINT `gyroskop_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `kompass`
--
ALTER TABLE `kompass`
  ADD CONSTRAINT `kompass_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `licht`
--
ALTER TABLE `licht`
  ADD CONSTRAINT `licht_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `luftfeuchtigkeit`
--
ALTER TABLE `luftfeuchtigkeit`
  ADD CONSTRAINT `luftfeuchtigkeit_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `magnetometer`
--
ALTER TABLE `magnetometer`
  ADD CONSTRAINT `magnetometer_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `netzwerklokalisierung`
--
ALTER TABLE `netzwerklokalisierung`
  ADD CONSTRAINT `netzwerklokalisierung_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `proximity`
--
ALTER TABLE `proximity`
  ADD CONSTRAINT `proximity_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `schrittzaehler`
--
ALTER TABLE `schrittzaehler`
  ADD CONSTRAINT `schrittzaehler_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `schwerkraft`
--
ALTER TABLE `schwerkraft`
  ADD CONSTRAINT `schwerkraft_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `umgebungsluftdruck`
--
ALTER TABLE `umgebungsluftdruck`
  ADD CONSTRAINT `umgebungsluftdruck_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `umgebungstemperatur`
--
ALTER TABLE `umgebungstemperatur`
  ADD CONSTRAINT `umgebungstemperatur_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `waypoint`
--
ALTER TABLE `waypoint`
  ADD CONSTRAINT `waypoint_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `wifi`
--
ALTER TABLE `wifi`
  ADD CONSTRAINT `wifi_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
