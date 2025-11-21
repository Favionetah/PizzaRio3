-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: pizzeria_db
-- ------------------------------------------------------
-- Server version	8.0.43


----------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------
--
-- AQUI YA ESTAN AGREGADOS UN ADMIN, UN CLIENTE Y UN CAJERO, APARTE DE SUS DEPENDENCIAS BASICAS PARA QUE EXISTAN
--
----------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tcategoriaspizza`
--

DROP TABLE IF EXISTS `tcategoriaspizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tcategoriaspizza` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombreCategoria` enum('Normal','Bordes Rellenos','Mitad-Mitad') NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tcategoriaspizza`
--

LOCK TABLES `tcategoriaspizza` WRITE;
/*!40000 ALTER TABLE `tcategoriaspizza` DISABLE KEYS */;
/*!40000 ALTER TABLE `tcategoriaspizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tciudades`
--

DROP TABLE IF EXISTS `tciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tciudades` (
  `idCiudad` varchar(10) NOT NULL,
  `idDepartamento` varchar(5) NOT NULL,
  `nombreCiudad` varchar(100) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCiudad`),
  KEY `idx_ciudades_depto` (`idDepartamento`),
  CONSTRAINT `tciudades_ibfk_1` FOREIGN KEY (`idDepartamento`) REFERENCES `tdepartamentos` (`idDepartamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tciudades`
--

LOCK TABLES `tciudades` WRITE;
/*!40000 ALTER TABLE `tciudades` DISABLE KEYS */;
INSERT INTO `tciudades` VALUES ('LP-01','LP','La Paz (Ciudad)',NULL,1,'2025-11-10 17:19:00','system_init');
/*!40000 ALTER TABLE `tciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tclientes`
--

DROP TABLE IF EXISTS `tclientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tclientes` (
  `CICliente` varchar(20) NOT NULL,
  `nombre1` varchar(50) NOT NULL,
  `nombre2` varchar(50) DEFAULT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CICliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tclientes`
--

LOCK TABLES `tclientes` WRITE;
/*!40000 ALTER TABLE `tclientes` DISABLE KEYS */;
INSERT INTO `tclientes` VALUES ('7778889','Martin',NULL,'Tejeda',NULL,'77712345','cliente_ana@pizzeria.com',NULL,NULL,1,'2025-11-18 03:20:48','system_init');
/*!40000 ALTER TABLE `tclientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tdepartamentos`
--

DROP TABLE IF EXISTS `tdepartamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tdepartamentos` (
  `idDepartamento` varchar(5) NOT NULL,
  `nombreDepartamento` varchar(25) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tdepartamentos`
--

LOCK TABLES `tdepartamentos` WRITE;
/*!40000 ALTER TABLE `tdepartamentos` DISABLE KEYS */;
INSERT INTO `tdepartamentos` VALUES ('LP','La Paz',NULL,1,'2025-11-10 17:19:00','system_init');
/*!40000 ALTER TABLE `tdepartamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tdetallepedidos`
--

DROP TABLE IF EXISTS `tdetallepedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tdetallepedidos` (
  `idDetallePedido` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `idPizza` varchar(10) DEFAULT NULL,
  `idProducto` varchar(10) DEFAULT NULL,
  `cantidad` int NOT NULL,
  `precioUnitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idDetallePedido`),
  KEY `idPedido` (`idPedido`),
  KEY `idPizza` (`idPizza`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `tdetallepedidos_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `tpedidos` (`idPedido`),
  CONSTRAINT `tdetallepedidos_ibfk_2` FOREIGN KEY (`idPizza`) REFERENCES `tpizza` (`idPizza`),
  CONSTRAINT `tdetallepedidos_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `tproductos` (`idProducto`),
  CONSTRAINT `tdetallepedidos_chk_1` CHECK ((((`idPizza` is not null) and (`idProducto` is null)) or ((`idPizza` is null) and (`idProducto` is not null))))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tdetallepedidos`
--

LOCK TABLES `tdetallepedidos` WRITE;
/*!40000 ALTER TABLE `tdetallepedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tdetallepedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tdetalleventas`
--

DROP TABLE IF EXISTS `tdetalleventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tdetalleventas` (
  `idDetalleVenta` int NOT NULL AUTO_INCREMENT,
  `idVenta` int NOT NULL,
  `idMetodoPago` int NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idDetalleVenta`),
  KEY `idVenta` (`idVenta`),
  KEY `idMetodoPago` (`idMetodoPago`),
  CONSTRAINT `tdetalleventas_ibfk_1` FOREIGN KEY (`idVenta`) REFERENCES `tventas` (`idVenta`),
  CONSTRAINT `tdetalleventas_ibfk_2` FOREIGN KEY (`idMetodoPago`) REFERENCES `tmetodospago` (`idMetodoPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tdetalleventas`
--

LOCK TABLES `tdetalleventas` WRITE;
/*!40000 ALTER TABLE `tdetalleventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tdetalleventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templeados`
--

DROP TABLE IF EXISTS `templeados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templeados` (
  `CIEmpleado` varchar(20) NOT NULL,
  `idUsuario` varchar(50) NOT NULL,
  `idSucursal` varchar(10) NOT NULL,
  `nombre1` varchar(50) NOT NULL,
  `nombre2` varchar(50) DEFAULT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `fechaContratacion` date DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CIEmpleado`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idx_empleados_sucursal` (`idSucursal`),
  CONSTRAINT `templeados_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `tusuarios` (`idUsuario`),
  CONSTRAINT `templeados_ibfk_2` FOREIGN KEY (`idSucursal`) REFERENCES `tsucursales` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templeados`
--

LOCK TABLES `templeados` WRITE;
/*!40000 ALTER TABLE `templeados` DISABLE KEYS */;
INSERT INTO `templeados` VALUES ('1234567','admin','SC-01','Admin',NULL,'User',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-11-10 17:19:00','system_init'),('8888888','cajero01','SC-01','Felipe',NULL,'Neduro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-11-18 03:15:14','system_init');
/*!40000 ALTER TABLE `templeados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tfacturas`
--

DROP TABLE IF EXISTS `tfacturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tfacturas` (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `numeroFactura` varchar(50) NOT NULL,
  `nit` varchar(20) DEFAULT NULL,
  `razonSocial` varchar(200) DEFAULT NULL,
  `fechaEmision` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `subtotal` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) DEFAULT '0.00',
  `totalFactura` decimal(10,2) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idFactura`),
  UNIQUE KEY `idPedido` (`idPedido`),
  UNIQUE KEY `numeroFactura` (`numeroFactura`),
  KEY `idx_facturas_pedido` (`idPedido`),
  CONSTRAINT `tfacturas_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `tpedidos` (`idPedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tfacturas`
--

LOCK TABLES `tfacturas` WRITE;
/*!40000 ALTER TABLE `tfacturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tfacturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thorarios`
--

DROP TABLE IF EXISTS `thorarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thorarios` (
  `idHorario` int NOT NULL AUTO_INCREMENT,
  `nombreHorario` varchar(50) NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFin` time NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idHorario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thorarios`
--

LOCK TABLES `thorarios` WRITE;
/*!40000 ALTER TABLE `thorarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `thorarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thorariosempleados`
--

DROP TABLE IF EXISTS `thorariosempleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thorariosempleados` (
  `idHorarioEmpleado` int NOT NULL AUTO_INCREMENT,
  `CIEmpleado` varchar(20) NOT NULL,
  `idHorario` int NOT NULL,
  `diaSemana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idHorarioEmpleado`),
  KEY `CIEmpleado` (`CIEmpleado`),
  KEY `idHorario` (`idHorario`),
  CONSTRAINT `thorariosempleados_ibfk_1` FOREIGN KEY (`CIEmpleado`) REFERENCES `templeados` (`CIEmpleado`),
  CONSTRAINT `thorariosempleados_ibfk_2` FOREIGN KEY (`idHorario`) REFERENCES `thorarios` (`idHorario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thorariosempleados`
--

LOCK TABLES `thorariosempleados` WRITE;
/*!40000 ALTER TABLE `thorariosempleados` DISABLE KEYS */;
/*!40000 ALTER TABLE `thorariosempleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tingredientes`
--

DROP TABLE IF EXISTS `tingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tingredientes` (
  `idIngrediente` int NOT NULL AUTO_INCREMENT,
  `nombreIngrediente` varchar(100) NOT NULL,
  `unidadMedida` varchar(20) DEFAULT NULL,
  `precioUnitario` decimal(10,2) DEFAULT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idIngrediente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tingredientes`
--

LOCK TABLES `tingredientes` WRITE;
/*!40000 ALTER TABLE `tingredientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tinventario`
--

DROP TABLE IF EXISTS `tinventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tinventario` (
  `idInventario` int NOT NULL AUTO_INCREMENT,
  `idSucursal` varchar(10) NOT NULL,
  `idIngrediente` int DEFAULT NULL,
  `idProducto` varchar(10) DEFAULT NULL,
  `cantidadDisponible` decimal(10,2) NOT NULL,
  `stockMinimo` decimal(10,2) DEFAULT NULL,
  `stockMaximo` decimal(10,2) DEFAULT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idInventario`),
  KEY `idSucursal` (`idSucursal`),
  KEY `idIngrediente` (`idIngrediente`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `tinventario_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `tsucursales` (`idSucursal`),
  CONSTRAINT `tinventario_ibfk_2` FOREIGN KEY (`idIngrediente`) REFERENCES `tingredientes` (`idIngrediente`),
  CONSTRAINT `tinventario_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `tproductos` (`idProducto`),
  CONSTRAINT `tinventario_chk_1` CHECK ((((`idIngrediente` is not null) and (`idProducto` is null)) or ((`idIngrediente` is null) and (`idProducto` is not null))))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinventario`
--

LOCK TABLES `tinventario` WRITE;
/*!40000 ALTER TABLE `tinventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `tinventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tmetodospago`
--

DROP TABLE IF EXISTS `tmetodospago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmetodospago` (
  `idMetodoPago` int NOT NULL AUTO_INCREMENT,
  `nombreMetodo` enum('Tarjeta','QR','Efectivo') NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idMetodoPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmetodospago`
--

LOCK TABLES `tmetodospago` WRITE;
/*!40000 ALTER TABLE `tmetodospago` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmetodospago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpedidos`
--

DROP TABLE IF EXISTS `tpedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpedidos` (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `CICliente` varchar(20) NOT NULL,
  `idSucursal` varchar(10) NOT NULL,
  `CIEmpleado` varchar(20) NOT NULL,
  `idPromocion` varchar(10) DEFAULT NULL,
  `fechaPedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipoPedido` enum('Local','Para llevar') NOT NULL,
  `estadoPedido` enum('Pendiente','En preparación','En camino','Entregado','Cancelado') DEFAULT 'Pendiente',
  `totalPedido` decimal(10,2) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `CIEmpleado` (`CIEmpleado`),
  KEY `idPromocion` (`idPromocion`),
  KEY `idx_pedidos_cliente` (`CICliente`),
  KEY `idx_pedidos_sucursal` (`idSucursal`),
  KEY `idx_pedidos_fecha` (`fechaPedido`),
  CONSTRAINT `tpedidos_ibfk_1` FOREIGN KEY (`CICliente`) REFERENCES `tclientes` (`CICliente`),
  CONSTRAINT `tpedidos_ibfk_2` FOREIGN KEY (`idSucursal`) REFERENCES `tsucursales` (`idSucursal`),
  CONSTRAINT `tpedidos_ibfk_3` FOREIGN KEY (`CIEmpleado`) REFERENCES `templeados` (`CIEmpleado`),
  CONSTRAINT `tpedidos_ibfk_4` FOREIGN KEY (`idPromocion`) REFERENCES `tpromociones` (`idPromocion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpedidos`
--

LOCK TABLES `tpedidos` WRITE;
/*!40000 ALTER TABLE `tpedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpizza`
--

DROP TABLE IF EXISTS `tpizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpizza` (
  `idPizza` varchar(10) NOT NULL,
  `idCategoria` int NOT NULL,
  `nombrePizza` varchar(100) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idPizza`),
  KEY `idCategoria` (`idCategoria`),
  CONSTRAINT `tpizza_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `tcategoriaspizza` (`idCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpizza`
--

LOCK TABLES `tpizza` WRITE;
/*!40000 ALTER TABLE `tpizza` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpizzaingredientes`
--

DROP TABLE IF EXISTS `tpizzaingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpizzaingredientes` (
  `idPizzaIngrediente` int NOT NULL AUTO_INCREMENT,
  `idPizza` varchar(10) NOT NULL,
  `idIngrediente` int NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idPizzaIngrediente`),
  KEY `idPizza` (`idPizza`),
  KEY `idIngrediente` (`idIngrediente`),
  CONSTRAINT `tpizzaingredientes_ibfk_1` FOREIGN KEY (`idPizza`) REFERENCES `tpizza` (`idPizza`),
  CONSTRAINT `tpizzaingredientes_ibfk_2` FOREIGN KEY (`idIngrediente`) REFERENCES `tingredientes` (`idIngrediente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpizzaingredientes`
--

LOCK TABLES `tpizzaingredientes` WRITE;
/*!40000 ALTER TABLE `tpizzaingredientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpizzaingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tproductos`
--

DROP TABLE IF EXISTS `tproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tproductos` (
  `idProducto` varchar(10) NOT NULL,
  `nombreProducto` varchar(100) NOT NULL,
  `tipoProducto` enum('Bebida','Complemento','Postre','Otros') NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tproductos`
--

LOCK TABLES `tproductos` WRITE;
/*!40000 ALTER TABLE `tproductos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpromociones`
--

DROP TABLE IF EXISTS `tpromociones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpromociones` (
  `idPromocion` varchar(10) NOT NULL,
  `nombrePromocion` varchar(100) NOT NULL,
  `descuentoPorcentaje` decimal(5,2) DEFAULT NULL,
  `descuentoMonto` decimal(10,2) DEFAULT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idPromocion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpromociones`
--

LOCK TABLES `tpromociones` WRITE;
/*!40000 ALTER TABLE `tpromociones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpromociones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `troles`
--

DROP TABLE IF EXISTS `troles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `troles` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(50) NOT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE KEY `nombreRol` (`nombreRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `troles`
--

LOCK TABLES `troles` WRITE;
/*!40000 ALTER TABLE `troles` DISABLE KEYS */;
INSERT INTO `troles` VALUES (1,'Administrador','Rol con permisos totales del sistema',1,'2025-11-10 17:19:00','system_init'),(2,'Cajero','Rol para gestionar cobros y caja en sucursal',1,'2025-11-18 03:15:14','system_init'),(3,'Cliente','Rol para clientes que realizan y consultan pedidos',1,'2025-11-18 03:20:48','system_init');
/*!40000 ALTER TABLE `troles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsucursales`
--

DROP TABLE IF EXISTS `tsucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsucursales` (
  `idSucursal` varchar(10) NOT NULL,
  `idCiudad` varchar(10) NOT NULL,
  `nombreSucursal` varchar(50) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idSucursal`),
  KEY `idx_sucursales_ciudad` (`idCiudad`),
  CONSTRAINT `tsucursales_ibfk_1` FOREIGN KEY (`idCiudad`) REFERENCES `tciudades` (`idCiudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsucursales`
--

LOCK TABLES `tsucursales` WRITE;
/*!40000 ALTER TABLE `tsucursales` DISABLE KEYS */;
INSERT INTO `tsucursales` VALUES ('SC-01','LP-01','Sucursal Central','Av. Principal 123',NULL,NULL,1,'2025-11-10 17:19:00','system_init');
/*!40000 ALTER TABLE `tsucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tusuarios`
--

DROP TABLE IF EXISTS `tusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tusuarios` (
  `idUsuario` varchar(50) NOT NULL,
  `idRol` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_usuarios_rol` (`idRol`),
  CONSTRAINT `tusuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `troles` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tusuarios`
--

LOCK TABLES `tusuarios` WRITE;
/*!40000 ALTER TABLE `tusuarios` DISABLE KEYS */;
INSERT INTO `tusuarios` VALUES ('7778889',3,'$2b$10$i9h5azepX2GP4ZVsgeAfteRXKRImuXATReT/S44XTu.CuaHOZmoF.','cliente1@pizzeria.com',NULL,1,'2025-11-18 03:20:48','system_init'),('admin',1,'$2b$10$hkf/YKJUTo4114zoRWX6m.NgsKM07cQbsa99dTneevCUD2TFDdplu','admin@pizzeria.com',NULL,1,'2025-11-10 17:19:00','system_init'),('cajero01',2,'$2b$10$vDmMEg09XmVyc30dhR3rd.jtgeUtPPWE6.VLBPjJinZHdOI7NK5rG','cajero1@pizzeria.com',NULL,1,'2025-11-18 03:15:14','system_init');
/*!40000 ALTER TABLE `tusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tventas`
--

DROP TABLE IF EXISTS `tventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tventas` (
  `idVenta` int NOT NULL AUTO_INCREMENT,
  `idFactura` int NOT NULL,
  `idMetodoPago` int NOT NULL,
  `montoPagado` decimal(10,2) NOT NULL,
  `montoCambio` decimal(10,2) DEFAULT NULL,
  `fechaVenta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` text,
  `estadoA` tinyint(1) DEFAULT '1',
  `fechaA` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idVenta`),
  KEY `idFactura` (`idFactura`),
  KEY `idMetodoPago` (`idMetodoPago`),
  KEY `idx_ventas_fecha` (`fechaVenta`),
  CONSTRAINT `tventas_ibfk_1` FOREIGN KEY (`idFactura`) REFERENCES `tfacturas` (`idFactura`),
  CONSTRAINT `tventas_ibfk_2` FOREIGN KEY (`idMetodoPago`) REFERENCES `tmetodospago` (`idMetodoPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tventas`
--

LOCK TABLES `tventas` WRITE;
/*!40000 ALTER TABLE `tventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 12:01:36
