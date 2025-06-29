-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: gestionreparaciones
-- ------------------------------------------------------
-- Server version	8.4.5

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
-- Table structure for table `asignacionUsuarioPermisos`
--

DROP TABLE IF EXISTS `asignacionUsuarioPermisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacionUsuarioPermisos` (
  `idasignacionUsuarioPermisos` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idpermisoPerfil` int NOT NULL,
  `estadoAsignacionUsuarioPermisos` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idasignacionUsuarioPermisos`),
  KEY `fk_asignacionUsuarioPermisos_usuarios1_idx` (`idUsuario`),
  KEY `fk_asignacionUsuarioPermisos_permisosDePerfiles1_idx` (`idpermisoPerfil`),
  CONSTRAINT `fk_asignacionUsuarioPermisos_permisosDePerfiles1` FOREIGN KEY (`idpermisoPerfil`) REFERENCES `permisoPerfil` (`idpermisoPerfil`),
  CONSTRAINT `fk_asignacionUsuarioPermisos_usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacionUsuarioPermisos`
--

LOCK TABLES `asignacionUsuarioPermisos` WRITE;
/*!40000 ALTER TABLE `asignacionUsuarioPermisos` DISABLE KEYS */;
INSERT INTO `asignacionUsuarioPermisos` VALUES (3,28,323,1),(4,28,324,1),(5,28,325,1),(6,28,326,1),(7,28,327,1),(8,28,328,1),(9,28,329,1),(10,28,330,1),(11,28,331,1),(16,28,336,1),(18,28,338,1),(19,28,339,1),(21,28,341,1),(22,28,342,1),(23,28,343,1),(24,28,344,1),(25,28,345,1),(26,28,346,1),(27,28,347,1),(28,28,348,1),(29,28,349,1),(30,28,350,1),(31,28,351,1),(32,28,352,1),(33,28,353,1),(34,28,354,1),(35,28,355,1),(36,28,356,1),(37,28,70,1),(38,28,71,1),(39,28,72,1),(40,28,73,1),(41,28,74,1),(42,28,75,1),(43,28,76,1),(44,28,77,1),(45,28,78,1),(46,28,79,1),(51,28,165,1),(52,28,166,1),(53,28,167,1),(54,28,168,1),(55,28,169,1),(56,28,170,1),(57,28,171,1),(58,28,172,1),(59,28,173,1),(60,28,174,1),(61,29,70,1),(62,29,71,1),(63,29,72,1),(64,29,73,1),(65,29,74,1),(66,29,75,1),(67,29,76,1),(68,29,77,1),(69,29,78,1),(70,29,79,1),(75,29,165,1),(76,29,166,1),(77,29,167,1),(78,29,168,1),(79,29,169,1),(80,29,170,1),(81,29,171,1),(82,29,172,1),(83,29,173,1),(84,29,174,1),(89,28,390,1),(90,28,391,1),(91,28,392,1),(92,28,393,1),(93,28,394,1),(94,28,395,1),(95,28,396,1),(96,28,397,1),(97,30,366,1),(98,30,367,1),(99,30,368,1),(100,30,369,1),(101,30,370,1),(102,30,371,1),(103,30,372,1),(104,30,373,1),(105,30,374,1),(106,30,375,1),(107,30,376,1),(108,30,377,1),(109,30,378,1),(110,30,379,1),(111,30,380,1),(112,30,381,1),(113,30,382,1),(114,30,383,1),(115,30,384,1),(116,30,385,1),(117,30,386,1),(118,30,387,1),(119,30,388,1),(120,30,389,1),(121,28,398,1),(122,29,398,1),(123,28,399,1),(124,29,399,1),(125,28,400,1),(126,29,400,1),(127,28,401,1),(128,29,401,1),(129,28,402,1),(130,29,402,1),(131,28,403,1),(132,29,403,1),(133,28,404,1),(134,29,404,1),(135,28,405,1),(136,29,405,1),(137,28,406,1),(138,29,406,1),(139,31,323,1),(140,31,324,1),(141,31,325,1),(142,31,326,1),(143,31,327,1),(144,31,328,1),(145,31,329,1),(146,31,330,1),(147,31,331,1),(148,31,336,1),(149,31,338,1),(150,31,339,1),(151,31,341,1),(152,31,342,1),(153,31,343,1),(154,31,344,1),(155,31,345,1),(156,31,346,1),(157,31,347,1),(158,31,348,1),(159,31,349,1),(160,31,350,1),(161,31,351,1),(162,31,352,1),(163,31,353,1),(164,31,354,1),(165,31,355,1),(166,31,356,1),(167,31,357,1),(168,31,390,1),(169,31,391,1),(170,31,392,1),(171,31,393,1),(172,31,394,1),(173,31,395,1),(174,31,396,1),(175,31,397,1),(176,31,366,1),(177,31,367,1),(178,31,368,1),(179,31,369,1),(180,31,370,1),(181,31,371,1),(182,31,372,1),(183,31,373,1),(184,31,374,1),(185,31,375,1),(186,31,376,1),(187,31,377,1),(188,31,378,1),(189,31,379,1),(190,31,380,1),(191,31,381,1),(192,31,382,1),(193,31,383,1),(194,31,384,1),(195,31,385,1),(196,31,386,1),(197,31,387,1),(198,31,388,1),(199,31,389,1);
/*!40000 ALTER TABLE `asignacionUsuarioPermisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `observaciones` varchar(255) DEFAULT NULL,
  `idPersona` int NOT NULL,
  PRIMARY KEY (`idCliente`),
  KEY `fk_cliente_persona1_idx` (`idPersona`),
  CONSTRAINT `fk_cliente_persona1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (17,'cliente dario',62),(18,'cliente marcelo',79);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacto`
--

DROP TABLE IF EXISTS `contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacto` (
  `idContacto` int NOT NULL AUTO_INCREMENT,
  `descripcionContacto` varchar(45) NOT NULL,
  `idtipoContacto` int NOT NULL,
  `idPersona` int NOT NULL,
  `esPrimario` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idContacto`),
  KEY `fk_contacto_tipoContacto1_idx` (`idtipoContacto`),
  KEY `fk_contacto_personas1_idx` (`idPersona`),
  CONSTRAINT `fk_contacto_personas1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`),
  CONSTRAINT `fk_contacto_tipoContacto1` FOREIGN KEY (`idtipoContacto`) REFERENCES `tipoContacto` (`idtipoContacto`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (25,'+5493704259037',3,62,1),(28,'abrilzacaria15@gmail.com',2,65,1),(29,'+5492616862550',3,65,1),(30,'abrilzacarias6@gmail.com',2,67,1),(31,'+5492616862552',3,67,1),(32,'abrilzacaria5@gmail.com',2,68,1),(33,'+5492616862551',3,68,1),(34,'abrilzacarias15@gmail.com',2,69,1),(35,'+5492616862522',3,69,1),(36,'abbz1504@gmail.com',2,71,1),(37,'+5492616862220',3,71,1),(38,'consortiumsolutionsarg@gmail.com',2,72,1),(39,'+5492616862228',3,72,1),(40,'abrilzacari9@gmail.com',2,73,1),(41,'+5492616832220',3,73,1),(42,'pauladvillalba@gmail.com',2,74,1),(43,'+5492616862500',3,74,1),(44,'nazab@gmail.com',2,75,1),(45,'+5492616762228',3,75,1),(46,'consortiusmsolutionsarg@gmail.com',2,76,1),(47,'+5492643362221',3,76,1),(48,'ppaulitaaaa2904@gmail.com',2,77,1),(49,'+5492643362226',3,77,1),(50,'victoriavmcortitrabajos@gmail.com',2,78,1),(51,'+5493704030415',3,78,1),(52,'marcelo@acosta.com',2,79,1),(53,'+5493704546716',3,79,1);
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debug_trigger`
--

DROP TABLE IF EXISTS `debug_trigger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debug_trigger` (
  `mensaje` varchar(100) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debug_trigger`
--

LOCK TABLES `debug_trigger` WRITE;
/*!40000 ALTER TABLE `debug_trigger` DISABLE KEYS */;
/*!40000 ALTER TABLE `debug_trigger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleDiagnostico`
--

DROP TABLE IF EXISTS `detalleDiagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleDiagnostico` (
  `idDetalleDiagnostico` int NOT NULL AUTO_INCREMENT,
  `valorDiagnostico` varchar(150) NOT NULL,
  `idDiagnostico` int NOT NULL,
  `idTipoDispositivoSegunPregunta` int NOT NULL,
  PRIMARY KEY (`idDetalleDiagnostico`),
  KEY `fk_detalleDiagnostico_diagnostico1_idx` (`idDiagnostico`),
  CONSTRAINT `fk_detalleDiagnostico_diagnostico1` FOREIGN KEY (`idDiagnostico`) REFERENCES `diagnostico` (`idDiagnostico`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleDiagnostico`
--

LOCK TABLES `detalleDiagnostico` WRITE;
/*!40000 ALTER TABLE `detalleDiagnostico` DISABLE KEYS */;
INSERT INTO `detalleDiagnostico` VALUES (36,'true',19,20),(37,'false',20,22),(38,'No prende',20,24),(39,'false',21,22),(40,'no prende',21,24),(41,'false',22,22),(42,'apagado',22,24),(43,'false',23,22),(44,'gewgwgew',23,24),(45,'false',24,22),(46,'no prende',24,24),(47,'No enciende al presionar el botón de encendido',26,22),(48,'true',27,22),(49,'gwegwgew',27,24),(50,'false',28,25),(51,'false',29,25),(52,'false',30,22),(53,'no prende',30,24),(54,'false',31,22),(55,'no prende',31,24),(56,'false',32,25),(57,'true',33,25),(58,'{\"tipo\":\"Patron\",\"valor\":\"0-3-6-7-8\"}',33,26),(59,'false',34,25),(60,'{\"tipo\":\"Patron\",\"valor\":\"2-1-0-3-6-7-8\"}',34,26),(61,'true',35,25),(62,'{\"tipo\":\"Patron\",\"valor\":\"6-3-0-4-2-5-8\"}',35,26);
/*!40000 ALTER TABLE `detalleDiagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleReparacion`
--

DROP TABLE IF EXISTS `detalleReparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleReparacion` (
  `idDetalleReparacion` int NOT NULL AUTO_INCREMENT,
  `montoTotalDetalleReparacion` decimal(10,0) NOT NULL,
  `manoObra` decimal(10,0) NOT NULL,
  `precioRepuesto` decimal(10,0) NOT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `idReparacion` int NOT NULL,
  `idTipoReparacion` int NOT NULL,
  `idRepuesto` int NOT NULL COMMENT 'PARA QUE DESCUENTE DEL ALMACEN',
  PRIMARY KEY (`idDetalleReparacion`),
  KEY `fk_detalleReparacion_reparacion1_idx` (`idReparacion`),
  KEY `fk_detalleReparacion_tipoReparacion1_idx` (`idTipoReparacion`),
  KEY `fk_detalleReparacion_repuestos1_idx` (`idRepuesto`),
  CONSTRAINT `fk_detalleReparacion_reparacion1` FOREIGN KEY (`idReparacion`) REFERENCES `reparacion` (`idReparacion`),
  CONSTRAINT `fk_detalleReparacion_repuestos1` FOREIGN KEY (`idRepuesto`) REFERENCES `repuesto` (`idRepuesto`),
  CONSTRAINT `fk_detalleReparacion_tipoReparacion1` FOREIGN KEY (`idTipoReparacion`) REFERENCES `tipoReparacion` (`idTipoReparacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleReparacion`
--

LOCK TABLES `detalleReparacion` WRITE;
/*!40000 ALTER TABLE `detalleReparacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalleReparacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostico`
--

DROP TABLE IF EXISTS `diagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnostico` (
  `idDiagnostico` int NOT NULL AUTO_INCREMENT,
  `fechaDiagnostico` date NOT NULL,
  `idDispositivo` int NOT NULL,
  `idEmpleado` int DEFAULT NULL,
  `descripcionDiagnostico` varchar(100) DEFAULT NULL,
  `estadoDiagnostico` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDiagnostico`),
  KEY `fk_diagnostico_dispositivo1_idx` (`idDispositivo`),
  KEY `fk_diagnostico_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_diagnostico_dispositivo1` FOREIGN KEY (`idDispositivo`) REFERENCES `dispositivo` (`idDispositivo`),
  CONSTRAINT `fk_diagnostico_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostico`
--

LOCK TABLES `diagnostico` WRITE;
/*!40000 ALTER TABLE `diagnostico` DISABLE KEYS */;
INSERT INTO `diagnostico` VALUES (19,'2025-06-15',34,32,NULL,0),(20,'2025-06-16',35,32,NULL,1),(21,'2025-06-16',36,31,NULL,0),(22,'2025-06-16',37,31,NULL,1),(23,'2025-06-16',38,31,NULL,1),(24,'2025-06-16',39,33,NULL,1),(26,'2025-06-16',34,33,'no prende',0),(27,'2025-06-16',40,32,'si prende pero no arranca!!',0),(28,'2025-06-17',41,31,'umhuguugughy',1),(29,'2025-06-17',42,33,'LG NO PRENDE!!',1),(30,'2025-06-17',43,31,'puede ser cambio de pin',1),(31,'2025-06-17',44,33,'no prende 2.0',1),(32,'2025-06-17',54,32,'PROBANDO 50',1),(33,'2025-06-17',55,33,'patron probando',1),(34,'2025-06-17',56,32,'ultima prueba',1),(35,'2025-06-19',57,32,'NO PRENDE EL CELU',1);
/*!40000 ALTER TABLE `diagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivo`
--

DROP TABLE IF EXISTS `dispositivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivo` (
  `idDispositivo` int NOT NULL AUTO_INCREMENT,
  `idModeloDispositivo` int NOT NULL,
  `idTipoDispositivo` int NOT NULL,
  `idCliente` int NOT NULL,
  `estadoDispositivo` tinyint NOT NULL DEFAULT '1' COMMENT 'ACTIVO O INACTIVO',
  PRIMARY KEY (`idDispositivo`),
  KEY `fk_dispositivo_tipoDispositivo1_idx` (`idTipoDispositivo`),
  KEY `fk_dispositivo_cliente1_idx` (`idCliente`),
  KEY `fk_dispositivo_modeloDispositivo1_idx` (`idModeloDispositivo`),
  CONSTRAINT `fk_dispositivo_cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `fk_dispositivo_modeloDispositivo1` FOREIGN KEY (`idModeloDispositivo`) REFERENCES `modeloDispositivo` (`idModeloDispositivo`),
  CONSTRAINT `fk_dispositivo_tipoDispositivo1` FOREIGN KEY (`idTipoDispositivo`) REFERENCES `tipoDispositivo` (`idTipoDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo`
--

LOCK TABLES `dispositivo` WRITE;
/*!40000 ALTER TABLE `dispositivo` DISABLE KEYS */;
INSERT INTO `dispositivo` VALUES (34,3,4,17,0),(35,5,3,18,1),(36,5,3,17,0),(37,3,3,18,1),(38,3,3,18,1),(39,5,3,18,1),(40,5,3,17,0),(41,5,8,18,1),(42,6,8,18,1),(43,12,3,18,1),(44,11,3,18,1),(45,6,8,18,1),(46,6,8,18,1),(47,6,8,18,1),(48,6,8,18,1),(49,6,8,18,1),(50,6,8,18,1),(51,3,8,18,1),(52,3,8,18,1),(53,3,8,18,1),(54,3,8,18,1),(55,6,8,18,1),(56,6,8,18,1),(57,5,8,18,1);
/*!40000 ALTER TABLE `dispositivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilio`
--

DROP TABLE IF EXISTS `domicilio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domicilio` (
  `idDomicilio` int NOT NULL AUTO_INCREMENT,
  `codigoPostal` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `provincia` varchar(45) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `barrio` varchar(45) DEFAULT NULL,
  `calle` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `departamento` varchar(45) DEFAULT NULL,
  `idtipoDomicilio` int NOT NULL,
  `idPersona` int NOT NULL,
  PRIMARY KEY (`idDomicilio`),
  KEY `fk_domicilio_personas1_idx` (`idPersona`),
  KEY `fk_domicilio_tipoDomicilio1_idx` (`idtipoDomicilio`),
  CONSTRAINT `fk_domicilio_personas1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`),
  CONSTRAINT `fk_domicilio_tipoDomicilio1` FOREIGN KEY (`idtipoDomicilio`) REFERENCES `tipoDomicilio` (`idtipoDomicilio`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilio`
--

LOCK TABLES `domicilio` WRITE;
/*!40000 ALTER TABLE `domicilio` DISABLE KEYS */;
INSERT INTO `domicilio` VALUES (3,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',1,65),(4,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',2,67),(5,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',1,68),(6,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',1,69),(7,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',2,71),(8,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',1,72),(9,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',2,73),(10,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',1,74),(11,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',1,75),(12,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',1,76),(13,'3600','Argentina','Formosa','Formosa','Federacion','joaquin de los santos','1398','Formosa',2,77),(14,'3600','Argentina','Formosa','Formosa','Federacion','Centro','1398','Formosa',2,78),(15,'3600','argentina','formosa','formosa editado','simon','constituyente','30','',2,79);
/*!40000 ALTER TABLE `domicilio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `fechaContratacion` date NOT NULL,
  `fechaFinalizacion` date DEFAULT NULL,
  `idpuestoLaboral` int NOT NULL,
  `idPersona` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  KEY `fk_empleado_puestoLaboral1_idx` (`idpuestoLaboral`),
  KEY `fk_empleado_persona1_idx` (`idPersona`),
  KEY `fk_empleado_usuario1_idx` (`idUsuario`),
  CONSTRAINT `fk_empleado_persona1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`),
  CONSTRAINT `fk_empleado_puestoLaboral1` FOREIGN KEY (`idpuestoLaboral`) REFERENCES `puestoLaboral` (`idpuestoLaboral`),
  CONSTRAINT `fk_empleado_usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (29,'2025-06-10','2025-06-16',7,61,23),(31,'2025-06-13',NULL,7,72,28),(32,'2025-06-13',NULL,7,74,29),(33,'2025-06-13',NULL,7,77,30),(34,'2025-06-13','2025-06-16',8,78,31);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadoReparacion`
--

DROP TABLE IF EXISTS `estadoReparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadoReparacion` (
  `idEstadoReparacion` int NOT NULL AUTO_INCREMENT,
  `descripcionEstadoReparacion` varchar(70) NOT NULL,
  PRIMARY KEY (`idEstadoReparacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoReparacion`
--

LOCK TABLES `estadoReparacion` WRITE;
/*!40000 ALTER TABLE `estadoReparacion` DISABLE KEYS */;
INSERT INTO `estadoReparacion` VALUES (2,'Presupuestado'),(3,'En Curso'),(4,'Pendiente'),(5,'Entregado');
/*!40000 ALTER TABLE `estadoReparacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionSistema`
--

DROP TABLE IF EXISTS `funcionSistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionSistema` (
  `idfuncionSistema` int NOT NULL AUTO_INCREMENT,
  `descripcionFuncionSistema` varchar(45) NOT NULL,
  `estadoFuncionSistema` tinyint NOT NULL COMMENT 'ACTIVO O NO',
  PRIMARY KEY (`idfuncionSistema`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionSistema`
--

LOCK TABLES `funcionSistema` WRITE;
/*!40000 ALTER TABLE `funcionSistema` DISABLE KEYS */;
INSERT INTO `funcionSistema` VALUES (2,'Visualizar Repuesto',1),(3,'Crear Repuesto',1),(4,'Modificar Repuesto',1),(5,'Eliminar Repuesto',1),(6,'Agregar Tipo de Repuesto',1),(7,'Modificar Tipo de Repuesto',1),(8,'Eliminar Tipo de Repuesto',1),(9,'Visualizar Tipo de Repuesto',1),(10,'Visualizar Cliente',1),(11,'Agregar Cliente',1),(12,'Modificar Cliente',1),(13,'Eliminar Cliente',1),(14,'Visualizar Reparación',1),(15,'Agregar Reparación',1),(16,'Modificar Reparación',1),(17,'Eliminar Reparación',1),(18,'Visualizar Tipo de Reparación',1),(19,'Agregar Tipo de Reparación',1),(20,'Modificar Tipo de Reparación',1),(21,'Eliminar Tipo de Reparación',1),(22,'Visualizar Empleado',1),(23,'Agregar Empleado',1),(24,'Modificar Empleado',1),(25,'Eliminar Empleado',1),(26,'Visualizar Perfiles',1),(27,'Agregar Perfiles',1),(28,'Modificar Perfiles',1),(29,'Eliminar Perfiles',1),(30,'Visualizar Módulos',1),(31,'Modificar Módulos',1),(32,'Visualizar Funciones',1),(33,'Visualizar Diagnóstico',1),(34,'Agregar Diagnóstico',1),(35,'Modificar Diagnóstico',1),(36,'Eliminar Diagnóstico',1),(37,'Ver Reporte Repuesto',1),(38,'Ver Reporte Cliente',1),(39,'Ver Reporte Reparación',1),(40,'Ver Reporte Empleado',1),(41,'Ver Reporte Perfiles',1),(42,'Ver Reporte Diagnóstico',1),(43,'Visualizar Dashboard',1);
/*!40000 ALTER TABLE `funcionSistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialAsignacionDiagnostico`
--

DROP TABLE IF EXISTS `historialAsignacionDiagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialAsignacionDiagnostico` (
  `idHistorialAsignacionDiagnostico` int NOT NULL AUTO_INCREMENT,
  `fechaInicioAsignacionDiagnostico` datetime NOT NULL,
  `fechaFinAsignacionDiagnostico` datetime DEFAULT NULL,
  `idDiagnostico` int NOT NULL,
  `idEmpleado` int NOT NULL,
  PRIMARY KEY (`idHistorialAsignacionDiagnostico`),
  KEY `fk_historialAsignacionDiagnostico_diagnostico1_idx` (`idDiagnostico`),
  KEY `fk_historialAsignacionDiagnostico_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_historialAsignacionDiagnostico_diagnostico1` FOREIGN KEY (`idDiagnostico`) REFERENCES `diagnostico` (`idDiagnostico`),
  CONSTRAINT `fk_historialAsignacionDiagnostico_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialAsignacionDiagnostico`
--

LOCK TABLES `historialAsignacionDiagnostico` WRITE;
/*!40000 ALTER TABLE `historialAsignacionDiagnostico` DISABLE KEYS */;
INSERT INTO `historialAsignacionDiagnostico` VALUES (3,'2025-06-15 00:00:00','2025-06-15 00:00:00',19,32),(4,'2025-06-15 00:00:00','2025-06-15 00:00:00',19,33),(5,'2025-06-15 00:00:00','2025-06-15 00:00:00',19,32),(6,'2025-06-15 00:00:00','2025-06-15 00:00:00',19,31),(7,'2025-06-15 00:00:00',NULL,19,33),(8,'2025-06-15 00:00:00',NULL,19,34),(9,'2025-06-16 00:00:00',NULL,19,31),(10,'2025-06-16 00:00:00',NULL,19,34),(11,'2025-06-16 00:00:00',NULL,19,31),(12,'2025-06-16 00:00:00',NULL,19,32),(13,'2025-06-16 00:00:00',NULL,20,32),(14,'2025-06-16 01:45:35',NULL,20,31),(15,'2025-06-16 01:45:40',NULL,20,32),(16,'2025-06-16 01:49:31',NULL,20,33),(17,'2025-06-16 01:57:57',NULL,20,32),(18,'2025-06-15 22:57:38',NULL,21,31),(19,'2025-06-16 02:32:55',NULL,22,31),(20,'2025-06-16 02:39:23',NULL,19,32),(21,'2025-06-16 02:40:01',NULL,23,31),(22,'2025-06-16 14:19:17',NULL,24,33),(23,'2025-06-16 14:26:36',NULL,26,33),(24,'2025-06-16 14:40:33',NULL,27,32),(25,'2025-06-16 14:40:52',NULL,27,32),(26,'2025-06-16 23:47:31',NULL,28,31),(27,'2025-06-16 23:48:22',NULL,29,33),(28,'2025-06-16 23:48:34',NULL,29,33),(29,'2025-06-17 00:36:32',NULL,30,31),(30,'2025-06-17 00:42:11',NULL,31,33),(31,'2025-06-17 08:45:01',NULL,32,32),(32,'2025-06-17 10:06:46',NULL,33,33),(33,'2025-06-17 10:18:49',NULL,34,32),(34,'2025-06-19 08:57:19',NULL,35,32);
/*!40000 ALTER TABLE `historialAsignacionDiagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialAsignacionReparacion`
--

DROP TABLE IF EXISTS `historialAsignacionReparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialAsignacionReparacion` (
  `idHistorialAsignacionReparacion` int NOT NULL AUTO_INCREMENT,
  `fechaInicioAsignacionReparacion` date NOT NULL,
  `fechaFinAsignacionReparacion` date DEFAULT NULL,
  `idReparacion` int NOT NULL,
  `idEmpleado` int NOT NULL,
  PRIMARY KEY (`idHistorialAsignacionReparacion`),
  KEY `fk_historialAsignacionReparacion_reparacion1_idx` (`idReparacion`),
  KEY `fk_historialAsignacionReparacion_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_historialAsignacionReparacion_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`),
  CONSTRAINT `fk_historialAsignacionReparacion_reparacion1` FOREIGN KEY (`idReparacion`) REFERENCES `reparacion` (`idReparacion`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialAsignacionReparacion`
--

LOCK TABLES `historialAsignacionReparacion` WRITE;
/*!40000 ALTER TABLE `historialAsignacionReparacion` DISABLE KEYS */;
INSERT INTO `historialAsignacionReparacion` VALUES (2,'2025-06-15',NULL,6,31),(3,'2025-06-17',NULL,7,31),(4,'2025-06-17','2025-06-19',8,31),(5,'2025-06-19',NULL,10,31),(6,'2025-06-19',NULL,8,32);
/*!40000 ALTER TABLE `historialAsignacionReparacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcaDispositivo`
--

DROP TABLE IF EXISTS `marcaDispositivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcaDispositivo` (
  `idMarcaDispositivo` int NOT NULL AUTO_INCREMENT,
  `descripcionMarcaDispositivo` varchar(45) NOT NULL,
  `estadoMarcaDispositivo` tinyint NOT NULL DEFAULT '1' COMMENT 'ACTIVO O INACTIVO',
  PRIMARY KEY (`idMarcaDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcaDispositivo`
--

LOCK TABLES `marcaDispositivo` WRITE;
/*!40000 ALTER TABLE `marcaDispositivo` DISABLE KEYS */;
INSERT INTO `marcaDispositivo` VALUES (10,'Samsung',1),(11,'LG',1),(12,'HP',1);
/*!40000 ALTER TABLE `marcaDispositivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modeloDispositivo`
--

DROP TABLE IF EXISTS `modeloDispositivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modeloDispositivo` (
  `idModeloDispositivo` int NOT NULL AUTO_INCREMENT,
  `descripcionModeloDispositivo` varchar(100) NOT NULL,
  `estadoModeloDispositivo` tinyint(1) NOT NULL DEFAULT '1',
  `idMarcaDispositivo` int NOT NULL,
  `idTipoDispositivo` int DEFAULT NULL,
  PRIMARY KEY (`idModeloDispositivo`),
  KEY `fk_dispositivo_marcaDispositivo1_idx` (`idMarcaDispositivo`),
  KEY `fk_modelo_tipo` (`idTipoDispositivo`),
  CONSTRAINT `fk_dispositivo_marcaDispositivo1` FOREIGN KEY (`idMarcaDispositivo`) REFERENCES `marcaDispositivo` (`idMarcaDispositivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_modelo_tipo` FOREIGN KEY (`idTipoDispositivo`) REFERENCES `tipoDispositivo` (`idTipoDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modeloDispositivo`
--

LOCK TABLES `modeloDispositivo` WRITE;
/*!40000 ALTER TABLE `modeloDispositivo` DISABLE KEYS */;
INSERT INTO `modeloDispositivo` VALUES (3,'Galaxy A15',1,10,8),(5,'Galaxy S22',1,10,8),(6,'LG 04',1,11,8),(7,'Notebook HP 15 fc0008la',1,12,3),(8,'Notebook HP 15 fc0008la',1,12,3),(9,'Notebook HP 15 fc0008la',1,12,3),(10,'Notebook HP 15 ',1,12,3),(11,'Notebook HP R6',1,12,3),(12,'Not Hp Book',1,12,3);
/*!40000 ALTER TABLE `modeloDispositivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moduloFuncionSistema`
--

DROP TABLE IF EXISTS `moduloFuncionSistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moduloFuncionSistema` (
  `idmoduloFuncionSistema` int NOT NULL AUTO_INCREMENT,
  `idmoduloSistema` int NOT NULL,
  `idfuncionSistema` int NOT NULL,
  `rutaModuloFuncionSistema` varchar(45) NOT NULL,
  `estadoModuloFuncionSistema` tinyint NOT NULL,
  PRIMARY KEY (`idmoduloFuncionSistema`),
  KEY `fk_moduloFuncionSistema_moduloSistema1_idx` (`idmoduloSistema`),
  KEY `fk_moduloFuncionSistema_funcionSistema1_idx` (`idfuncionSistema`),
  CONSTRAINT `fk_moduloFuncionSistema_funcionSistema1` FOREIGN KEY (`idfuncionSistema`) REFERENCES `funcionSistema` (`idfuncionSistema`),
  CONSTRAINT `fk_moduloFuncionSistema_moduloSistema1` FOREIGN KEY (`idmoduloSistema`) REFERENCES `moduloSistema` (`idmoduloSistema`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moduloFuncionSistema`
--

LOCK TABLES `moduloFuncionSistema` WRITE;
/*!40000 ALTER TABLE `moduloFuncionSistema` DISABLE KEYS */;
INSERT INTO `moduloFuncionSistema` VALUES (3,1,39,'reparacion/ver-reporte-reparacion',0),(5,1,38,'reparacion/ver-reporte-cliente',0),(6,1,14,'reparacion/visualizar-reparación',0),(7,1,15,'reparacion/agregar-reparación',0),(8,1,16,'reparacion/modificar-reparación',0),(9,1,17,'reparacion/eliminar-reparación',0),(10,1,18,'reparacion/visualizar-tipo-de-reparación',0),(11,1,19,'reparacion/agregar-tipo-de-reparación',0),(12,1,20,'reparacion/modificar-tipo-de-reparación',0),(13,1,21,'reparacion/eliminar-tipo-de-reparación',0),(14,2,33,'diagnóstico/visualizar-diagnóstico',0),(15,2,34,'diagnóstico/agregar-diagnóstico',0),(16,2,35,'diagnóstico/modificar-diagnóstico',0),(17,2,36,'diagnóstico/eliminar-diagnóstico',0),(18,2,42,'diagnóstico/ver-reporte-diagnóstico',0),(19,3,22,'empleados/visualizar-empleado',0),(20,3,23,'empleados/agregar-empleado',0),(21,3,40,'empleados/ver-reporte-empleado',0),(22,3,24,'empleados/modificar-empleado',0),(23,3,25,'empleados/eliminar-empleado',0),(24,4,38,'clientes/ver-reporte-cliente',1),(25,4,10,'clientes/visualizar-cliente',0),(26,4,11,'clientes/agregar-cliente',0),(27,4,12,'clientes/modificar-cliente',0),(28,4,13,'clientes/eliminar-cliente',0),(29,5,2,'repuestos/visualizar-repuesto',1),(30,5,3,'repuestos/crear-repuesto',1),(31,5,4,'repuestos/modificar-repuesto',1),(32,5,37,'repuestos/ver-reporte-repuesto',1),(33,5,5,'repuestos/eliminar-repuesto',1),(34,5,7,'repuestos/modificar-tipo-de-repuesto',1),(35,5,8,'repuestos/eliminar-tipo-de-repuesto',1),(36,5,9,'repuestos/visualizar-tipo-de-repuesto',1),(37,5,6,'repuestos/agregar-tipo-de-repuesto',1),(38,6,41,'perfiles/ver-reporte-perfiles',1),(39,6,26,'perfiles/visualizar-perfiles',1),(40,6,27,'perfiles/agregar-perfiles',1),(41,6,28,'perfiles/modificar-perfiles',1),(42,6,29,'perfiles/eliminar-perfiles',1),(43,7,43,'/dashboard',1);
/*!40000 ALTER TABLE `moduloFuncionSistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moduloSistema`
--

DROP TABLE IF EXISTS `moduloSistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moduloSistema` (
  `idmoduloSistema` int NOT NULL AUTO_INCREMENT,
  `descripcionModuloSistema` varchar(45) NOT NULL,
  `estadoModuloSistema` tinyint NOT NULL,
  PRIMARY KEY (`idmoduloSistema`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moduloSistema`
--

LOCK TABLES `moduloSistema` WRITE;
/*!40000 ALTER TABLE `moduloSistema` DISABLE KEYS */;
INSERT INTO `moduloSistema` VALUES (1,'Reparaciones',1),(2,'Diagnóstico',1),(3,'Empleados',1),(4,'Clientes',1),(5,'Repuestos',1),(6,'Perfiles',1),(7,'Inicio',1);
/*!40000 ALTER TABLE `moduloSistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil` (
  `idPerfil` int NOT NULL AUTO_INCREMENT,
  `nombrePerfil` varchar(45) NOT NULL,
  `estadoPerfil` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idPerfil`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'Administrador',1),(2,'Supervisor',0),(3,'Supervisor Oficial',0),(4,'Recepcionista',1),(5,'Temporal',0),(6,'Supervisoraa',0),(7,'Temporal2',0),(8,'Técnico',1);
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisoPerfil`
--

DROP TABLE IF EXISTS `permisoPerfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisoPerfil` (
  `idpermisoPerfil` int NOT NULL AUTO_INCREMENT,
  `idPerfil` int NOT NULL,
  `estadoPermisoPerfil` tinyint NOT NULL DEFAULT '1',
  `idmoduloFuncionSistema` int NOT NULL,
  PRIMARY KEY (`idpermisoPerfil`),
  KEY `fk_permisosDePerfiles_perfiles1_idx` (`idPerfil`),
  KEY `fk_permisoPerfil_moduloFuncionSistema1_idx` (`idmoduloFuncionSistema`),
  CONSTRAINT `fk_permisoPerfil_moduloFuncionSistema1` FOREIGN KEY (`idmoduloFuncionSistema`) REFERENCES `moduloFuncionSistema` (`idmoduloFuncionSistema`),
  CONSTRAINT `fk_permisosDePerfiles_perfiles1` FOREIGN KEY (`idPerfil`) REFERENCES `perfil` (`idPerfil`)
) ENGINE=InnoDB AUTO_INCREMENT=407 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisoPerfil`
--

LOCK TABLES `permisoPerfil` WRITE;
/*!40000 ALTER TABLE `permisoPerfil` DISABLE KEYS */;
INSERT INTO `permisoPerfil` VALUES (3,2,0,3),(5,2,0,5),(6,2,0,6),(7,2,0,7),(8,2,0,8),(9,2,0,9),(10,2,0,10),(11,2,0,11),(12,2,0,12),(13,2,0,13),(22,2,0,14),(23,2,0,15),(24,2,0,16),(25,2,0,17),(26,2,0,18),(32,2,0,3),(33,2,0,5),(34,2,0,6),(35,2,0,7),(36,2,0,8),(37,2,0,9),(38,2,0,10),(39,2,0,11),(40,2,0,12),(41,2,0,13),(42,2,0,14),(43,2,0,15),(44,2,0,16),(45,2,0,17),(46,2,0,19),(47,2,0,20),(48,2,0,21),(49,2,0,22),(50,2,0,23),(51,2,0,3),(52,2,0,5),(53,2,0,6),(54,2,0,7),(55,2,0,8),(56,2,0,9),(57,2,0,10),(58,2,0,11),(59,2,0,12),(60,2,0,13),(61,2,0,14),(62,2,0,15),(63,2,0,16),(64,2,0,17),(65,2,0,19),(66,2,0,20),(67,2,0,21),(68,2,0,22),(69,2,0,23),(70,4,1,3),(71,4,1,5),(72,4,1,6),(73,4,1,7),(74,4,1,8),(75,4,1,9),(76,4,1,10),(77,4,1,11),(78,4,1,12),(79,4,1,13),(84,2,0,3),(85,2,0,5),(86,2,0,6),(87,2,0,7),(88,2,0,8),(89,2,0,9),(90,2,0,10),(91,2,0,11),(92,2,0,12),(93,2,0,13),(94,2,0,14),(95,2,0,15),(96,2,0,16),(97,2,0,17),(98,2,0,18),(99,2,0,3),(100,2,0,5),(101,2,0,6),(102,2,0,7),(103,2,0,8),(104,2,0,9),(105,2,0,10),(106,2,0,11),(107,2,0,12),(108,2,0,13),(109,2,0,16),(110,2,0,17),(111,2,0,18),(112,2,0,19),(113,2,0,20),(114,2,0,21),(115,2,0,22),(116,2,0,23),(117,2,0,3),(118,2,0,5),(119,2,0,6),(120,2,0,7),(121,2,0,8),(122,2,0,9),(123,2,0,10),(124,2,0,11),(125,2,0,12),(126,2,0,13),(127,2,0,16),(128,2,0,18),(129,2,0,19),(130,2,0,20),(131,2,0,21),(132,2,0,22),(133,2,0,23),(134,2,0,3),(135,2,0,5),(136,2,0,6),(137,2,0,7),(138,2,0,8),(139,2,0,9),(140,2,0,10),(141,2,0,11),(142,2,0,12),(143,2,0,13),(144,2,0,14),(145,2,0,19),(146,2,0,20),(147,2,0,21),(148,2,0,22),(149,2,0,23),(150,2,0,3),(151,2,0,5),(152,2,0,6),(153,2,0,7),(154,2,0,8),(155,2,0,9),(156,2,0,10),(157,2,0,11),(158,2,0,12),(159,2,0,13),(160,2,0,19),(161,2,0,20),(162,2,0,21),(163,2,0,22),(164,2,0,23),(165,4,1,3),(166,4,1,5),(167,4,1,6),(168,4,1,7),(169,4,1,8),(170,4,1,9),(171,4,1,10),(172,4,1,11),(173,4,1,12),(174,4,1,13),(175,2,0,3),(176,2,0,5),(177,2,0,6),(178,2,0,7),(179,2,0,8),(180,2,0,9),(181,2,0,10),(182,2,0,11),(183,2,0,12),(184,2,0,13),(185,2,0,19),(186,2,0,20),(187,2,0,21),(188,2,0,22),(189,2,0,23),(190,2,0,19),(194,3,0,3),(200,5,0,25),(201,5,0,26),(202,5,0,27),(203,5,0,28),(204,6,0,14),(205,6,0,15),(206,6,0,16),(207,6,0,17),(208,6,0,18),(210,7,0,3),(211,7,0,7),(323,1,1,3),(324,1,1,6),(325,1,1,7),(326,1,1,8),(327,1,1,9),(328,1,1,10),(329,1,1,11),(330,1,1,12),(331,1,1,13),(336,1,1,19),(338,1,1,21),(339,1,1,22),(341,1,1,25),(342,1,1,28),(343,1,1,29),(344,1,1,30),(345,1,1,31),(346,1,1,32),(347,1,1,33),(348,1,1,34),(349,1,1,35),(350,1,1,37),(351,1,1,38),(352,1,1,39),(353,1,1,40),(354,1,1,41),(355,1,1,42),(356,1,1,27),(357,1,1,26),(366,8,1,3),(367,8,1,5),(368,8,1,6),(369,8,1,7),(370,8,1,8),(371,8,1,9),(372,8,1,10),(373,8,1,11),(374,8,1,12),(375,8,1,13),(376,8,1,14),(377,8,1,15),(378,8,1,16),(379,8,1,17),(380,8,1,18),(381,8,1,29),(382,8,1,30),(383,8,1,31),(384,8,1,32),(385,8,1,33),(386,8,1,34),(387,8,1,35),(388,8,1,36),(389,8,1,37),(390,1,1,43),(391,1,1,14),(392,1,1,15),(393,1,1,16),(394,1,1,17),(395,1,1,18),(396,1,1,20),(397,1,1,23),(398,4,1,14),(399,4,1,15),(400,4,1,16),(401,4,1,17),(402,4,1,18),(403,4,1,25),(404,4,1,26),(405,4,1,27),(406,4,1,28);
/*!40000 ALTER TABLE `permisoPerfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `idPersona` int NOT NULL AUTO_INCREMENT,
  `cuit` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `estadoPersona` tinyint NOT NULL DEFAULT '1' COMMENT 'ACTIVO O INACTIVO',
  PRIMARY KEY (`idPersona`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (61,'20-12345678-9','brenda','cano','1990-05-21',0),(62,'20-41013872-9','Miguel Dario','Coronel','1995-08-07',0),(63,'205891452360','Martina','Cano','2025-03-26',1),(64,'26003268859','Abril','Zacaria','2004-04-15',1),(65,'37104155812','Abril','Zacaria','2004-04-15',1),(66,'21412242','Lali','Esposito','2000-02-15',1),(67,'214122421','Lali','Esposito','2000-02-15',1),(68,'11111111111','Karina','Milei','2004-04-15',1),(69,'111111111113','Victoria','Villaruel','2004-04-15',1),(70,'12421421412','Agustin','Zeballos','2004-04-15',1),(71,'124214214','Agustin','Zeballos','2004-04-15',1),(72,'141211','Mauro','Lopez','2000-03-12',1),(73,'12424','Walter','Ruiz','2007-06-15',1),(74,'21412412','Cristina','Sosa','2003-02-15',1),(75,'12412412412','Nazareno','Bareiro','2025-06-13',1),(76,'124222232','Mauro','Lopez','2025-06-13',1),(77,'45878799455','Luciana','Zacaria','2025-06-13',1),(78,'74520389124','Victoria','Maidana','2002-02-18',0),(79,'27258894990','Marcelo editado','Acosta ','2023-05-25',1);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `baja_logica_dispositivos_por_baja_persona` AFTER UPDATE ON `persona` FOR EACH ROW BEGIN
  IF NEW.estadoPersona = 0 THEN

    BEGIN
      DECLARE var_idCliente INT;

      -- Obtener el cliente vinculado a la persona
      SELECT idCliente INTO var_idCliente
      FROM cliente
      WHERE idPersona = NEW.idPersona
      LIMIT 1;

      -- Si existe un cliente asociado
      IF var_idCliente IS NOT NULL THEN

        -- Baja lógica de dispositivos
        UPDATE dispositivo
        SET estadoDispositivo = 0
        WHERE idCliente = var_idCliente;

        -- Baja lógica de diagnósticos
        UPDATE diagnostico
        SET estadoDiagnostico = 0
        WHERE idDispositivo IN (
            SELECT idDispositivo FROM dispositivo WHERE idCliente = var_idCliente
        );

        -- Baja lógica de reparaciones
        UPDATE reparacion
        SET estadoReparacion = 0
        WHERE idDiagnostico IN (
            SELECT d.idDiagnostico
            FROM diagnostico d
            JOIN dispositivo dp ON dp.idDispositivo = d.idDispositivo
            WHERE dp.idCliente = var_idCliente
        );

      END IF;
    END;

  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `actualizar_fecha_finalizacion` AFTER UPDATE ON `persona` FOR EACH ROW BEGIN
    DECLARE v_idEmpleado INT;

    -- Solo ejecutar si la persona fue desactivada
    IF OLD.estadoPersona = 1 AND NEW.estadoPersona = 0 THEN

        -- Obtener el idEmpleado correspondiente a la persona
        SELECT idEmpleado INTO v_idEmpleado
        FROM empleado
        WHERE idPersona = NEW.idPersona
        LIMIT 1;

        -- Actualizar la fecha de finalización del empleado
        UPDATE empleado
        SET fechaFinalizacion = CURRENT_DATE
        WHERE idEmpleado = v_idEmpleado;

        -- Establecer idEmpleado en NULL en los diagnósticos
        UPDATE diagnostico
        SET idEmpleado = NULL
        WHERE idEmpleado = v_idEmpleado;

        -- Establecer idEmpleado en NULL en las reparaciones
        UPDATE reparacion
        SET idEmpleado = NULL
        WHERE idEmpleado = v_idEmpleado;

    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `preguntaDiagnostico`
--

DROP TABLE IF EXISTS `preguntaDiagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntaDiagnostico` (
  `idPreguntaDiagnostico` int NOT NULL AUTO_INCREMENT COMMENT 'preguntasDiagnostico  (define las "preguntas" o Ã­tems para el diagnostico segun dispositivo)\nEs la tabla que define quÃ© cosas se le deben preguntar o revisar a un dispositivo cuando llega al local para hacerle un diagnÃ³stico.\nEstas preguntas son parametrizables, lo que significa que el administrador puede crearlas, modificarlas o asignarlas a distintos tipos de dispositivos, sin tocar la base de datos.\nâ€¢	idPreguntasDiagnostico (PK)\nâ€¢	descripcionPregunta (Ej: Â¿Prende?, Â¿EstÃ¡ mojado?, Â¿Tiene cargador?...)\nâ€¢	tipoDatoPregunta (Ej: boolean, texto, nÃºmero, opciÃ³n mÃºltiple)',
  `descripcionPreguntaDiagnostico` varchar(90) NOT NULL,
  `idTipoDatoPreguntaDiagnostico` int NOT NULL,
  `opcionesPregunta` json DEFAULT NULL COMMENT '4	Â¿QuÃ© tan sucio estÃ¡?	opcion	["Limpio", "Sucio", "Muy sucio"]',
  `estadoPreguntaDiagnostico` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idPreguntaDiagnostico`),
  KEY `fk_preguntaDiagnostico_tipoDatoPreguntaDiagnostico1_idx` (`idTipoDatoPreguntaDiagnostico`),
  CONSTRAINT `fk_preguntaDiagnostico_tipoDatoPreguntaDiagnostico1` FOREIGN KEY (`idTipoDatoPreguntaDiagnostico`) REFERENCES `tipoDatoPreguntaDiagnostico` (`idTipoDatoPreguntaDiagnostico`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntaDiagnostico`
--

LOCK TABLES `preguntaDiagnostico` WRITE;
/*!40000 ALTER TABLE `preguntaDiagnostico` DISABLE KEYS */;
INSERT INTO `preguntaDiagnostico` VALUES (19,'¿Enciende?',2,'null',0),(20,'¿Enciende?',2,'null',1),(21,'¿Carga?',2,'null',0),(22,'¿Enciende?',1,'null',1),(23,'¿Qué tipo de problema tiene el dispositivo?',2,'null',0),(24,'tiene bloque?',3,'[\"PIN\", \"contraseña\", \"patron\"]',1),(25,'¿Enciende?',1,'null',1),(26,'tiene bloque?',3,'[\"Patron\", \"PIN\", \"contraseña\"]',1);
/*!40000 ALTER TABLE `preguntaDiagnostico` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `tr_baja_preguntaDiagnostico` AFTER UPDATE ON `preguntaDiagnostico` FOR EACH ROW BEGIN
  IF OLD.estadoPreguntaDiagnostico = TRUE AND NEW.estadoPreguntaDiagnostico = FALSE THEN
    UPDATE tipoDispositivoSegunPregunta
    SET estadoTipoDispositivoSegunPregunta = FALSE
    WHERE idPreguntaDiagnostico = NEW.idPreguntaDiagnostico;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `puestoLaboral`
--

DROP TABLE IF EXISTS `puestoLaboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puestoLaboral` (
  `idpuestoLaboral` int NOT NULL AUTO_INCREMENT,
  `nombrepuestoLaboral` varchar(45) NOT NULL,
  `estadoPuestoLaboral` tinyint NOT NULL DEFAULT '1' COMMENT 'ACTIVO O INACTIVO',
  PRIMARY KEY (`idpuestoLaboral`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestoLaboral`
--

LOCK TABLES `puestoLaboral` WRITE;
/*!40000 ALTER TABLE `puestoLaboral` DISABLE KEYS */;
INSERT INTO `puestoLaboral` VALUES (7,'Tecnico',1),(8,'Recepcionista',1),(9,'Administrador',1);
/*!40000 ALTER TABLE `puestoLaboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registroEstadoReparacion`
--

DROP TABLE IF EXISTS `registroEstadoReparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registroEstadoReparacion` (
  `idRegistroEstadoReparacion` int NOT NULL AUTO_INCREMENT,
  `idReparacion` int NOT NULL,
  `idEstadoReparacion` int NOT NULL,
  `fechaHoraRegistroEstadoReparacion` datetime NOT NULL COMMENT 'fecha y hora en la que se registró el cambio de estado',
  `idEmpleado` int NOT NULL COMMENT 'empleado que hizo el cambio',
  PRIMARY KEY (`idRegistroEstadoReparacion`),
  KEY `fk_registro_reparacion` (`idReparacion`),
  KEY `fk_registro_estado_reparacion` (`idEstadoReparacion`),
  KEY `fk_registro_empleado` (`idEmpleado`),
  CONSTRAINT `fk_registro_empleado` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`),
  CONSTRAINT `fk_registro_estado_reparacion` FOREIGN KEY (`idEstadoReparacion`) REFERENCES `estadoReparacion` (`idEstadoReparacion`),
  CONSTRAINT `fk_registro_reparacion` FOREIGN KEY (`idReparacion`) REFERENCES `reparacion` (`idReparacion`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registroEstadoReparacion`
--

LOCK TABLES `registroEstadoReparacion` WRITE;
/*!40000 ALTER TABLE `registroEstadoReparacion` DISABLE KEYS */;
INSERT INTO `registroEstadoReparacion` VALUES (24,6,2,'2025-06-15 06:08:35',31),(25,7,2,'2025-06-17 08:56:37',31),(26,7,3,'2025-06-17 09:01:53',31),(27,7,4,'2025-06-17 09:03:02',31),(28,7,3,'2025-06-17 09:06:21',31),(29,7,4,'2025-06-17 09:17:31',31),(30,7,3,'2025-06-17 09:19:56',31),(31,7,2,'2025-06-17 09:21:17',31),(32,7,3,'2025-06-17 09:32:12',31),(33,7,4,'2025-06-17 09:36:37',31),(34,7,3,'2025-06-17 09:44:34',31),(35,7,4,'2025-06-17 09:48:43',31),(36,7,5,'2025-06-17 09:49:28',31),(37,7,3,'2025-06-17 09:50:19',31),(38,8,2,'2025-06-17 09:51:20',31),(39,8,3,'2025-06-17 09:51:30',31),(40,7,4,'2025-06-17 09:54:27',31),(41,8,4,'2025-06-17 09:57:43',31),(42,8,3,'2025-06-17 10:09:01',31),(43,7,5,'2025-06-18 19:20:22',31),(44,8,4,'2025-06-18 19:33:14',31),(45,8,3,'2025-06-19 08:39:39',31),(46,8,4,'2025-06-19 08:40:32',31),(47,8,3,'2025-06-19 08:41:11',31),(48,7,4,'2025-06-19 08:41:29',31),(49,10,2,'2025-06-19 08:48:28',31),(50,10,3,'2025-06-19 08:48:46',31),(51,9,2,'2025-06-19 08:49:01',31),(52,7,3,'2025-06-19 09:21:50',31);
/*!40000 ALTER TABLE `registroEstadoReparacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparacion`
--

DROP TABLE IF EXISTS `reparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reparacion` (
  `idReparacion` int NOT NULL AUTO_INCREMENT,
  `fechaIngreso` datetime DEFAULT NULL,
  `fechaEgreso` datetime DEFAULT NULL,
  `montoTotalReparacion` decimal(10,0) DEFAULT NULL,
  `idDiagnostico` int NOT NULL,
  `idEmpleado` int NOT NULL COMMENT 'puede ser que un empleado haga el diagnostico y otro la reparacion',
  `fechaEstimadaEntrega` datetime DEFAULT NULL,
  `estadoReparacion` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idReparacion`),
  KEY `fk_reparacion_diagnostico1_idx` (`idDiagnostico`),
  KEY `fk_reparacion_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_reparacion_diagnostico1` FOREIGN KEY (`idDiagnostico`) REFERENCES `diagnostico` (`idDiagnostico`),
  CONSTRAINT `fk_reparacion_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparacion`
--

LOCK TABLES `reparacion` WRITE;
/*!40000 ALTER TABLE `reparacion` DISABLE KEYS */;
INSERT INTO `reparacion` VALUES (6,'2025-06-15 00:00:00',NULL,NULL,19,31,NULL,0),(7,'2025-06-17 11:56:31',NULL,NULL,32,31,NULL,1),(8,'2025-06-17 12:51:14',NULL,NULL,28,32,NULL,1),(9,'2025-06-19 11:45:56',NULL,NULL,23,31,NULL,1),(10,'2025-06-19 11:48:24',NULL,NULL,28,31,NULL,1);
/*!40000 ALTER TABLE `reparacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repuesto`
--

DROP TABLE IF EXISTS `repuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repuesto` (
  `idRepuesto` int NOT NULL AUTO_INCREMENT,
  `nombreRepuesto` varchar(80) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `cantidadRepuesto` int NOT NULL,
  `idMarcaDispositivo` int NOT NULL,
  `idTipoRepuesto` int NOT NULL,
  `estadoRepuesto` tinyint NOT NULL DEFAULT '1' COMMENT 'ACTIVO O INACTIVO',
  `stockMinimo` int DEFAULT NULL,
  PRIMARY KEY (`idRepuesto`),
  KEY `fk_repuestos_marca1_idx` (`idMarcaDispositivo`),
  KEY `fk_respuestos_tipoRepuesto1_idx` (`idTipoRepuesto`),
  CONSTRAINT `fk_repuestos_marca1` FOREIGN KEY (`idMarcaDispositivo`) REFERENCES `marcaDispositivo` (`idMarcaDispositivo`),
  CONSTRAINT `fk_respuestos_tipoRepuesto1` FOREIGN KEY (`idTipoRepuesto`) REFERENCES `tipoRepuesto` (`idTipoRepuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repuesto`
--

LOCK TABLES `repuesto` WRITE;
/*!40000 ALTER TABLE `repuesto` DISABLE KEYS */;
INSERT INTO `repuesto` VALUES (3,'Pantalla premium',200,9,10,2,1,5);
/*!40000 ALTER TABLE `repuesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoContacto`
--

DROP TABLE IF EXISTS `tipoContacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoContacto` (
  `idtipoContacto` int NOT NULL AUTO_INCREMENT,
  `descripcionTipoContacto` varchar(45) NOT NULL,
  PRIMARY KEY (`idtipoContacto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoContacto`
--

LOCK TABLES `tipoContacto` WRITE;
/*!40000 ALTER TABLE `tipoContacto` DISABLE KEYS */;
INSERT INTO `tipoContacto` VALUES (2,'email'),(3,'telefono');
/*!40000 ALTER TABLE `tipoContacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoDatoPreguntaDiagnostico`
--

DROP TABLE IF EXISTS `tipoDatoPreguntaDiagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoDatoPreguntaDiagnostico` (
  `idTipoDatoPreguntaDiagnostico` int NOT NULL AUTO_INCREMENT,
  `descripcionTipoDatoPreguntaDiagnostico` varchar(45) NOT NULL COMMENT '(ej: "texto", "nÃºmero", "opciÃ³n", etc.)',
  PRIMARY KEY (`idTipoDatoPreguntaDiagnostico`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDatoPreguntaDiagnostico`
--

LOCK TABLES `tipoDatoPreguntaDiagnostico` WRITE;
/*!40000 ALTER TABLE `tipoDatoPreguntaDiagnostico` DISABLE KEYS */;
INSERT INTO `tipoDatoPreguntaDiagnostico` VALUES (1,'Booleano'),(2,'Texto'),(3,'Opcion'),(5,'Número');
/*!40000 ALTER TABLE `tipoDatoPreguntaDiagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoDispositivo`
--

DROP TABLE IF EXISTS `tipoDispositivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoDispositivo` (
  `idTipoDispositivo` int NOT NULL AUTO_INCREMENT,
  `nombreTipoDispositivo` varchar(80) NOT NULL,
  `estadoDispositivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idTipoDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDispositivo`
--

LOCK TABLES `tipoDispositivo` WRITE;
/*!40000 ALTER TABLE `tipoDispositivo` DISABLE KEYS */;
INSERT INTO `tipoDispositivo` VALUES (3,'Laptop',1),(4,'Telefono',0),(5,'Televisor',0),(8,'Telefono',1);
/*!40000 ALTER TABLE `tipoDispositivo` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `tr_baja_tipoDispositivo` AFTER UPDATE ON `tipoDispositivo` FOR EACH ROW BEGIN
  IF OLD.estadoDispositivo = TRUE AND NEW.estadoDispositivo = FALSE THEN
    UPDATE tipoDispositivoSegunPregunta
    SET estadoTipoDispositivoSegunPregunta = FALSE
    WHERE idTipoDispositivo = NEW.idTipoDispositivo;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tipoDispositivoSegunPregunta`
--

DROP TABLE IF EXISTS `tipoDispositivoSegunPregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoDispositivoSegunPregunta` (
  `idTipoDispositivoSegunPregunta` int NOT NULL AUTO_INCREMENT,
  `idTipoDispositivo` int NOT NULL COMMENT 'idTipoDispositivo (FK): Especifica a quÃ© tipo de dispositivo se le asigna un campo de diagnÃ³stico.\n\nidCampoDiagnostico (FK): Define quÃ© campo de diagnÃ³stico estÃ¡ disponible para ese tipo de dispositivo.\n\nPor ejemplo:\n\nSi idTipoDispositivo = 1 (TelÃ©fono), y idCampoDiagnostico = 1 (Â¿Prende?), entonces para los telÃ©fonos, el campo "Â¿Prende?" se muestra en el formulario de diagnÃ³stico.\n\nSi idTipoDispositivo = 2 (Horno), y idCampoDiagnostico = 2 (Â¿Funciona el termostato?), ese campo estarÃ¡ disponible solo para hornos.',
  `idPreguntaDiagnostico` int NOT NULL,
  `estadoTipoDispositivoSegunPregunta` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idTipoDispositivoSegunPregunta`),
  KEY `fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagno_idx` (`idPreguntaDiagnostico`),
  KEY `fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo_idx` (`idTipoDispositivo`),
  CONSTRAINT `fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagnost1` FOREIGN KEY (`idPreguntaDiagnostico`) REFERENCES `preguntaDiagnostico` (`idPreguntaDiagnostico`),
  CONSTRAINT `fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo1` FOREIGN KEY (`idTipoDispositivo`) REFERENCES `tipoDispositivo` (`idTipoDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDispositivoSegunPregunta`
--

LOCK TABLES `tipoDispositivoSegunPregunta` WRITE;
/*!40000 ALTER TABLE `tipoDispositivoSegunPregunta` DISABLE KEYS */;
INSERT INTO `tipoDispositivoSegunPregunta` VALUES (20,4,20,0),(22,3,22,1),(24,3,24,0),(25,8,25,1),(26,8,26,1);
/*!40000 ALTER TABLE `tipoDispositivoSegunPregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoDomicilio`
--

DROP TABLE IF EXISTS `tipoDomicilio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoDomicilio` (
  `idtipoDomicilio` int NOT NULL AUTO_INCREMENT,
  `descripciontipoDomicilio` varchar(45) NOT NULL,
  PRIMARY KEY (`idtipoDomicilio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDomicilio`
--

LOCK TABLES `tipoDomicilio` WRITE;
/*!40000 ALTER TABLE `tipoDomicilio` DISABLE KEYS */;
INSERT INTO `tipoDomicilio` VALUES (1,'Laboral'),(2,'Personal');
/*!40000 ALTER TABLE `tipoDomicilio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoReparacion`
--

DROP TABLE IF EXISTS `tipoReparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoReparacion` (
  `idTipoReparacion` int NOT NULL AUTO_INCREMENT,
  `descripcionTipoReparacion` varchar(80) NOT NULL,
  PRIMARY KEY (`idTipoReparacion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoReparacion`
--

LOCK TABLES `tipoReparacion` WRITE;
/*!40000 ALTER TABLE `tipoReparacion` DISABLE KEYS */;
INSERT INTO `tipoReparacion` VALUES (1,'Reparacion de Pantalla');
/*!40000 ALTER TABLE `tipoReparacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoRepuesto`
--

DROP TABLE IF EXISTS `tipoRepuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoRepuesto` (
  `idTipoRepuesto` int NOT NULL AUTO_INCREMENT,
  `descripcionTipoRepuesto` varchar(80) NOT NULL,
  PRIMARY KEY (`idTipoRepuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoRepuesto`
--

LOCK TABLES `tipoRepuesto` WRITE;
/*!40000 ALTER TABLE `tipoRepuesto` DISABLE KEYS */;
INSERT INTO `tipoRepuesto` VALUES (2,'Pantalla'),(3,'Bateria'),(4,'Display');
/*!40000 ALTER TABLE `tipoRepuesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `needs_password_change` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (23,'admin','$2b$12$EF91DBXtJ8z85.SjXP7fLes/vQMUxcnx6N4rXaiXcZJzHrwFQ3xOS','admin@admin.com',0),(24,'abrilzacarias15','$2b$12$tITGiERylyQ4DCz1UNkMT.6xirtGKWpmJafMyQ/m6t4DYwBgfwZGW','abrilzacarias15@gmail.com',1),(25,'abrilzacaria15','$2b$12$QZywH6EVy62OdObQd2GESuBsPCjGSKgs12q9OlfVoCMHhfLDAIKT2','abrilzacaria15@gmail.com',1),(26,'abrilzacarias6','$2b$12$ba2Rjia/zqW1tz4u6hVJDO1.rshbo0nkkz8XDzMkkxtNMn5pdviOG','abrilzacarias6@gmail.com',1),(27,'abbz1504','$2b$12$T3K8FVZu3MuYohr80hd8vuKWcCGK9o2aqDOt9cSTiMM7fqD0O6k4i','abbz1504@gmail.com',1),(28,'consortiumsolutionsarg','$2b$12$9FTqnVbRXpX8OxMsQKzv6eR8P7aaWPdzJ71kx8786cDpyie6f2Uba','consortiumsolutionsarg@gmail.com',0),(29,'pauladvillalba','$2b$12$P8cppfLP3wfAQXjAusP07u6REX8KF1ka1Ruz1Ktgp1GwrQWQv7oD2','pauladvillalba@gmail.com',0),(30,'ppaulitaaaa2904','$2b$12$/NX6.XU3ZfWM4eciqwh8yOSRDjYYJbFuvNk9HlY6MlDZz8MAt7BPq','ppaulitaaaa2904@gmail.com',0),(31,'victoriavmcortitrabajos','$2b$12$YSDGJgLmfao5PHcRorKr7ufuNCg4Ypg39mZdTzLtEXCTH1z0ltS9.','victoriavmcortitrabajos@gmail.com',0),(32,'mari','$2b$12$wCgNUNkHdAt.5..6AOytDu5NcUhT1KY9ssW1EzRH5ZS3/EPcmTnCS','acostagm6@gmail.com',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_notificaciones`
--

DROP TABLE IF EXISTS `vista_notificaciones`;
/*!50001 DROP VIEW IF EXISTS `vista_notificaciones`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_notificaciones` AS SELECT 
 1 AS `idActividad`,
 1 AS `tipo`,
 1 AS `mensaje`,
 1 AS `fecha`,
 1 AS `accion`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'gestionreparaciones'
--

--
-- Dumping routines for database 'gestionreparaciones'
--

--
-- Final view structure for view `vista_notificaciones`
--

/*!50001 DROP VIEW IF EXISTS `vista_notificaciones`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_notificaciones` AS select row_number() OVER (ORDER BY `subconsulta`.`fecha` desc )  AS `idActividad`,`subconsulta`.`tipo` AS `tipo`,`subconsulta`.`mensaje` AS `mensaje`,`subconsulta`.`fecha` AS `fecha`,`subconsulta`.`accion` AS `accion` from (select 'Alta empleado' AS `tipo`,concat('Empleado agregado: ',`p`.`nombre`,' ',`p`.`apellido`) AS `mensaje`,`e`.`fechaContratacion` AS `fecha`,'Ver empleado' AS `accion` from (`empleado` `e` join `persona` `p` on((`e`.`idPersona` = `p`.`idPersona`))) where ((`e`.`fechaContratacion` is not null) and (`e`.`fechaFinalizacion` is null)) union all select 'Baja empleado' AS `tipo`,concat('Empleado dado de baja: ',`p`.`nombre`,' ',`p`.`apellido`) AS `mensaje`,`e`.`fechaFinalizacion` AS `fecha`,'Ver empleado' AS `accion` from (`empleado` `e` join `persona` `p` on((`e`.`idPersona` = `p`.`idPersona`))) where (`e`.`fechaFinalizacion` is not null) union all select 'Nuevo diagnóstico' AS `tipo`,concat('Se diagnosticó el dispositivo ',`m`.`descripcionMarcaDispositivo`,' ',`mo`.`descripcionModeloDispositivo`) AS `mensaje`,`d`.`fechaDiagnostico` AS `fecha`,'Ver diagnóstico' AS `accion` from (((`diagnostico` `d` join `dispositivo` `dis` on((`d`.`idDispositivo` = `dis`.`idDispositivo`))) join `modeloDispositivo` `mo` on((`dis`.`idModeloDispositivo` = `mo`.`idModeloDispositivo`))) join `marcaDispositivo` `m` on((`mo`.`idMarcaDispositivo` = `m`.`idMarcaDispositivo`)))) `subconsulta` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19  9:30:38
