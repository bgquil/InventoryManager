

CREATE TABLE `manufacturers` (
  `manufacturerID` int(11) NOT NULL AUTO_INCREMENT,
  `manufacturerName` varchar(255) NOT NULL,
  PRIMARY KEY (`manufacturerID`),
  UNIQUE KEY `UC_manufacturer` (`manufacturerName`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


CREATE TABLE `items` (
  `itemID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `manufacturerID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `weight` decimal(6,4) DEFAULT NULL,
  `price` decimal(6,4) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`itemID`),
  KEY `items_ibfk_1` (`manufacturerID`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`manufacturerID`) REFERENCES `manufacturers` (`manufacturerID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
  `orderID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `totalQuantity` int(10) unsigned DEFAULT NULL,
  `orderTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orderFulfilled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `order_item` (
  `orderID` int(11) unsigned NOT NULL,
  `itemID` int(11) unsigned NOT NULL,
  `quantityOrdered` int(10) unsigned NOT NULL DEFAULT '0',
  KEY `orderID` (`orderID`),
  KEY `itemID` (`itemID`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`itemID`) REFERENCES `items` (`itemID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




