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
  `estadoAsignacionUsuarioPermisos` tinyint NOT NULL,
  PRIMARY KEY (`idasignacionUsuarioPermisos`),
  KEY `fk_asignacionUsuarioPermisos_usuarios1_idx` (`idUsuario`),
  KEY `fk_asignacionUsuarioPermisos_permisosDePerfiles1_idx` (`idpermisoPerfil`),
  CONSTRAINT `fk_asignacionUsuarioPermisos_permisosDePerfiles1` FOREIGN KEY (`idpermisoPerfil`) REFERENCES `permisoPerfil` (`idpermisoPerfil`),
  CONSTRAINT `fk_asignacionUsuarioPermisos_usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacionUsuarioPermisos`
--

LOCK TABLES `asignacionUsuarioPermisos` WRITE;
/*!40000 ALTER TABLE `asignacionUsuarioPermisos` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (17,'cliente dario',62);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (25,'+5493704259037',3,62,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleDiagnostico`
--

LOCK TABLES `detalleDiagnostico` WRITE;
/*!40000 ALTER TABLE `detalleDiagnostico` DISABLE KEYS */;
INSERT INTO `detalleDiagnostico` VALUES (1,'1',9,1),(2,'false',11,1),(3,'true',11,2),(4,'23532532',11,3),(5,'Pantalla',11,4),(6,'false',12,1),(7,'true',12,2),(8,'44923092',12,3),(9,'Software',12,4),(10,'false',13,1),(11,'true',13,2),(12,'44923092',13,3),(13,'Software',13,4),(14,'false',14,1),(15,'true',14,2),(16,'44923092',14,3),(17,'Software',14,4),(18,'false',15,1),(19,'true',15,2),(20,'29706151',15,3),(21,'Otro',15,4),(22,'false',16,1),(23,'true',16,2),(24,'35346346346',16,3),(25,'Batería',16,4),(26,'true',17,1),(27,'false',17,2),(28,'523523532',17,3),(29,'Pantalla',17,4),(30,'0-3-6-7-8',17,5),(31,'false',18,1),(32,'true',18,2),(33,'5235235',18,3),(34,'Pantalla',18,4),(35,'{\"tipo\":\"PIN\",\"valor\":\"1234\"}',18,5);
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
  `idEmpleado` int NOT NULL,
  `descripcionDiagnostico` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idDiagnostico`),
  KEY `fk_diagnostico_dispositivo1_idx` (`idDispositivo`),
  KEY `fk_diagnostico_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_diagnostico_dispositivo1` FOREIGN KEY (`idDispositivo`) REFERENCES `dispositivo` (`idDispositivo`),
  CONSTRAINT `fk_diagnostico_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostico`
--

LOCK TABLES `diagnostico` WRITE;
/*!40000 ALTER TABLE `diagnostico` DISABLE KEYS */;
INSERT INTO `diagnostico` VALUES (3,'2025-06-10',3,29,NULL),(4,'2025-06-10',3,29,NULL),(5,'2025-06-10',3,29,NULL),(6,'2025-06-10',3,29,NULL),(7,'2025-06-10',3,29,NULL),(8,'2025-06-10',3,29,NULL),(9,'2025-06-10',3,29,NULL),(10,'2025-06-12',25,29,NULL),(11,'2025-06-12',26,29,NULL),(12,'2025-06-12',27,29,NULL),(13,'2025-06-12',28,29,NULL),(14,'2025-06-12',29,29,NULL),(15,'2025-06-12',30,29,NULL),(16,'2025-06-12',31,29,NULL),(17,'2025-06-12',32,29,NULL),(18,'2025-06-12',33,29,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo`
--

LOCK TABLES `dispositivo` WRITE;
/*!40000 ALTER TABLE `dispositivo` DISABLE KEYS */;
INSERT INTO `dispositivo` VALUES (3,3,2,17,1),(4,5,2,17,1),(5,5,2,17,1),(6,5,2,17,1),(7,5,2,17,1),(8,5,2,17,1),(9,5,2,17,1),(10,5,2,17,1),(11,5,2,17,1),(12,3,2,17,1),(13,3,2,17,1),(14,3,2,17,1),(15,3,2,17,1),(16,3,2,17,1),(17,3,2,17,1),(18,3,2,17,1),(19,3,2,17,1),(20,5,2,17,1),(21,3,2,17,1),(22,3,2,17,1),(23,3,2,17,1),(24,3,2,17,1),(25,3,2,17,1),(26,3,2,17,1),(27,5,2,17,1),(28,5,2,17,1),(29,5,2,17,1),(30,5,2,17,1),(31,5,2,17,1),(32,3,2,17,1),(33,5,2,17,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilio`
--

LOCK TABLES `domicilio` WRITE;
/*!40000 ALTER TABLE `domicilio` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (29,'2025-06-10',NULL,7,61,23);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoReparacion`
--

LOCK TABLES `estadoReparacion` WRITE;
/*!40000 ALTER TABLE `estadoReparacion` DISABLE KEYS */;
INSERT INTO `estadoReparacion` VALUES (2,'Presupuestado'),(3,'En Curso'),(4,'Pendiente');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionSistema`
--

LOCK TABLES `funcionSistema` WRITE;
/*!40000 ALTER TABLE `funcionSistema` DISABLE KEYS */;
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
  `fechaInicioAsignacionDiagnostico` date NOT NULL,
  `fechaFinAsignacionDiagnostico` date DEFAULT NULL,
  `idDiagnostico` int NOT NULL,
  `idEmpleado` int NOT NULL,
  PRIMARY KEY (`idHistorialAsignacionDiagnostico`),
  KEY `fk_historialAsignacionDiagnostico_diagnostico1_idx` (`idDiagnostico`),
  KEY `fk_historialAsignacionDiagnostico_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_historialAsignacionDiagnostico_diagnostico1` FOREIGN KEY (`idDiagnostico`) REFERENCES `diagnostico` (`idDiagnostico`),
  CONSTRAINT `fk_historialAsignacionDiagnostico_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialAsignacionDiagnostico`
--

LOCK TABLES `historialAsignacionDiagnostico` WRITE;
/*!40000 ALTER TABLE `historialAsignacionDiagnostico` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialAsignacionReparacion`
--

LOCK TABLES `historialAsignacionReparacion` WRITE;
/*!40000 ALTER TABLE `historialAsignacionReparacion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcaDispositivo`
--

LOCK TABLES `marcaDispositivo` WRITE;
/*!40000 ALTER TABLE `marcaDispositivo` DISABLE KEYS */;
INSERT INTO `marcaDispositivo` VALUES (10,'Samsung',1);
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
  PRIMARY KEY (`idModeloDispositivo`),
  KEY `fk_dispositivo_marcaDispositivo1_idx` (`idMarcaDispositivo`),
  CONSTRAINT `fk_dispositivo_marcaDispositivo1` FOREIGN KEY (`idMarcaDispositivo`) REFERENCES `marcaDispositivo` (`idMarcaDispositivo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modeloDispositivo`
--

LOCK TABLES `modeloDispositivo` WRITE;
/*!40000 ALTER TABLE `modeloDispositivo` DISABLE KEYS */;
INSERT INTO `modeloDispositivo` VALUES (3,'Galaxy A15',1,10),(5,'Galaxy S22',1,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moduloFuncionSistema`
--

LOCK TABLES `moduloFuncionSistema` WRITE;
/*!40000 ALTER TABLE `moduloFuncionSistema` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moduloSistema`
--

LOCK TABLES `moduloSistema` WRITE;
/*!40000 ALTER TABLE `moduloSistema` DISABLE KEYS */;
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
  PRIMARY KEY (`idPerfil`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisoPerfil`
--

LOCK TABLES `permisoPerfil` WRITE;
/*!40000 ALTER TABLE `permisoPerfil` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (61,'20-12345678-9','brenda','cano','1990-05-21',1),(62,'20-41013872-9','Miguel Dario','Coronel','1995-08-07',1),(63,'205891452360','Martina','Cano','2025-03-26',1);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`idPreguntaDiagnostico`),
  KEY `fk_preguntaDiagnostico_tipoDatoPreguntaDiagnostico1_idx` (`idTipoDatoPreguntaDiagnostico`),
  CONSTRAINT `fk_preguntaDiagnostico_tipoDatoPreguntaDiagnostico1` FOREIGN KEY (`idTipoDatoPreguntaDiagnostico`) REFERENCES `tipoDatoPreguntaDiagnostico` (`idTipoDatoPreguntaDiagnostico`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntaDiagnostico`
--

LOCK TABLES `preguntaDiagnostico` WRITE;
/*!40000 ALTER TABLE `preguntaDiagnostico` DISABLE KEYS */;
INSERT INTO `preguntaDiagnostico` VALUES (1,'¿Enciende?',1,'null'),(2,'¿Carga?',1,'null'),(3,'IMEI',2,NULL),(4,'¿Qué tipo de problema tiene el dispositivo?',3,'[\"Pantalla\", \"Batería\", \"Software\", \"Otro\"]'),(5,'¿Tiene bloqueo?',3,'[\"PIN\", \"Contraseña\", \"Patron\", \"Ninguno\"]');
/*!40000 ALTER TABLE `preguntaDiagnostico` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestoLaboral`
--

LOCK TABLES `puestoLaboral` WRITE;
/*!40000 ALTER TABLE `puestoLaboral` DISABLE KEYS */;
INSERT INTO `puestoLaboral` VALUES (7,'Tecnico',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registroEstadoReparacion`
--

LOCK TABLES `registroEstadoReparacion` WRITE;
/*!40000 ALTER TABLE `registroEstadoReparacion` DISABLE KEYS */;
INSERT INTO `registroEstadoReparacion` VALUES (3,4,2,'2025-06-11 12:20:01',29),(4,4,2,'2025-06-11 12:20:01',29),(5,4,3,'2025-06-11 12:20:01',29),(6,4,4,'2025-06-11 12:20:01',29),(7,4,4,'2025-06-11 12:20:01',29),(8,4,4,'2025-06-11 12:20:01',29),(9,4,4,'2025-06-11 12:20:01',29),(10,4,4,'2025-06-11 12:20:01',29),(11,4,3,'2025-06-11 12:20:01',29),(12,4,4,'2025-06-11 12:20:01',29),(13,4,4,'2025-06-11 12:20:01',29),(14,4,4,'2025-06-11 12:20:01',29),(15,4,4,'2025-06-11 12:20:01',29),(17,4,2,'2025-06-11 12:20:01',29),(21,4,4,'2025-06-11 17:50:19',29);
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
  `fechaIngreso` date NOT NULL,
  `fechaEgreso` date DEFAULT NULL,
  `montoTotalReparacion` decimal(10,0) NOT NULL,
  `idDiagnostico` int NOT NULL,
  `idEmpleado` int NOT NULL COMMENT 'puede ser que un empleado haga el diagnostico y otro la reparacion',
  PRIMARY KEY (`idReparacion`),
  KEY `fk_reparacion_diagnostico1_idx` (`idDiagnostico`),
  KEY `fk_reparacion_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_reparacion_diagnostico1` FOREIGN KEY (`idDiagnostico`) REFERENCES `diagnostico` (`idDiagnostico`),
  CONSTRAINT `fk_reparacion_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparacion`
--

LOCK TABLES `reparacion` WRITE;
/*!40000 ALTER TABLE `reparacion` DISABLE KEYS */;
INSERT INTO `reparacion` VALUES (4,'2025-06-11',NULL,8900,3,29);
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
  PRIMARY KEY (`idRepuesto`),
  KEY `fk_repuestos_marca1_idx` (`idMarcaDispositivo`),
  KEY `fk_respuestos_tipoRepuesto1_idx` (`idTipoRepuesto`),
  CONSTRAINT `fk_repuestos_marca1` FOREIGN KEY (`idMarcaDispositivo`) REFERENCES `marcaDispositivo` (`idMarcaDispositivo`),
  CONSTRAINT `fk_respuestos_tipoRepuesto1` FOREIGN KEY (`idTipoRepuesto`) REFERENCES `tipoRepuesto` (`idTipoRepuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repuesto`
--

LOCK TABLES `repuesto` WRITE;
/*!40000 ALTER TABLE `repuesto` DISABLE KEYS */;
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
INSERT INTO `tipoContacto` VALUES (3,'Telefono');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDatoPreguntaDiagnostico`
--

LOCK TABLES `tipoDatoPreguntaDiagnostico` WRITE;
/*!40000 ALTER TABLE `tipoDatoPreguntaDiagnostico` DISABLE KEYS */;
INSERT INTO `tipoDatoPreguntaDiagnostico` VALUES (1,'booleano'),(2,'texto'),(3,'opcion'),(4,'patron');
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
  PRIMARY KEY (`idTipoDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDispositivo`
--

LOCK TABLES `tipoDispositivo` WRITE;
/*!40000 ALTER TABLE `tipoDispositivo` DISABLE KEYS */;
INSERT INTO `tipoDispositivo` VALUES (2,'Telefono');
/*!40000 ALTER TABLE `tipoDispositivo` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`idTipoDispositivoSegunPregunta`),
  KEY `fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagno_idx` (`idPreguntaDiagnostico`),
  KEY `fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo_idx` (`idTipoDispositivo`),
  CONSTRAINT `fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagnost1` FOREIGN KEY (`idPreguntaDiagnostico`) REFERENCES `preguntaDiagnostico` (`idPreguntaDiagnostico`),
  CONSTRAINT `fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo1` FOREIGN KEY (`idTipoDispositivo`) REFERENCES `tipoDispositivo` (`idTipoDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDispositivoSegunPregunta`
--

LOCK TABLES `tipoDispositivoSegunPregunta` WRITE;
/*!40000 ALTER TABLE `tipoDispositivoSegunPregunta` DISABLE KEYS */;
INSERT INTO `tipoDispositivoSegunPregunta` VALUES (1,2,1),(2,2,2),(3,2,3),(4,2,4),(5,2,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDomicilio`
--

LOCK TABLES `tipoDomicilio` WRITE;
/*!40000 ALTER TABLE `tipoDomicilio` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoReparacion`
--

LOCK TABLES `tipoReparacion` WRITE;
/*!40000 ALTER TABLE `tipoReparacion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoRepuesto`
--

LOCK TABLES `tipoRepuesto` WRITE;
/*!40000 ALTER TABLE `tipoRepuesto` DISABLE KEYS */;
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
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (23,'admin','$2b$12$EF91DBXtJ8z85.SjXP7fLes/vQMUxcnx6N4rXaiXcZJzHrwFQ3xOS','admin@admin.com');
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
/*!50001 VIEW `vista_notificaciones` AS select row_number() OVER (ORDER BY `subconsulta`.`fecha` desc )  AS `idActividad`,`subconsulta`.`tipo` AS `tipo`,`subconsulta`.`mensaje` AS `mensaje`,`subconsulta`.`fecha` AS `fecha`,`subconsulta`.`accion` AS `accion` from (select 'Alta empleado' AS `tipo`,concat('Empleado agregado: ',`p`.`nombre`,' ',`p`.`apellido`) AS `mensaje`,`e`.`fechaContratacion` AS `fecha`,'Ver empleado' AS `accion` from (`empleado` `e` join `persona` `p` on((`e`.`idPersona` = `p`.`idPersona`))) where ((`e`.`fechaContratacion` is not null) and (`e`.`fechaFinalizacion` is null)) union all select 'Baja empleado' AS `tipo`,concat('Empleado dado de baja: ',`p`.`nombre`,' ',`p`.`apellido`) AS `mensaje`,`e`.`fechaFinalizacion` AS `fecha`,'Ver empleado' AS `accion` from (`empleado` `e` join `persona` `p` on((`e`.`idPersona` = `p`.`idPersona`))) where (`e`.`fechaFinalizacion` is not null) union all select 'Nuevo diagnóstico' AS `tipo`,concat('Se diagnosticó el dispositivo ID ',`d`.`idDispositivo`) AS `mensaje`,`d`.`fechaDiagnostico` AS `fecha`,'Ver diagnóstico' AS `accion` from `diagnostico` `d`) `subconsulta` */;
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

-- Dump completed on 2025-06-12 13:01:59
