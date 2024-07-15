SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `Bills` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Description` text NOT NULL,
  `Amount` float NOT NULL,
  `PaymentType` enum('Cash','Card','PayPal','SEPA','Bar/Karte') NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;


ALTER TABLE `Bills`
  ADD PRIMARY KEY (`ID`);


ALTER TABLE `Bills`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
