-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
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
  CONSTRAINT `fk_asignacionUsuarioPermisos_permisosDePerfiles1` FOREIGN KEY (`idpermisoPerfil`) REFERENCES `permisoPerfil` (`idpermisoPerfil`) ON DELETE CASCADE,
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (9,'2025-06-21',1),(10,'2025-05-21',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (2,'canobren080603@gmail.com',1,9,0),(5,'juan.perez@gmail.com',1,44,0),(6,'+54 911 1234 5678',2,44,0),(8,'josefranco@gmail.com',1,46,0);
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
INSERT INTO `debug_trigger` VALUES ('Trigger activado para idPersona: 26','2025-06-07 02:10:48'),('Trigger activado para idPersona: 30','2025-06-07 02:15:13');
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
  `idTipoDispositivoSegunPregunta` varchar(45) NOT NULL,
  PRIMARY KEY (`idDetalleDiagnostico`),
  KEY `fk_detalleDiagnostico_diagnostico1_idx` (`idDiagnostico`),
  KEY `fk_detalleDiagnostico_tipoDispositivoSegunPreguntas1_idx` (`idTipoDispositivoSegunPregunta`),
  CONSTRAINT `fk_detalleDiagnostico_diagnostico1` FOREIGN KEY (`idDiagnostico`) REFERENCES `diagnostico` (`idDiagnostico`),
  CONSTRAINT `fk_detalleDiagnostico_tipoDispositivoSegunPreguntas1` FOREIGN KEY (`idTipoDispositivoSegunPregunta`) REFERENCES `tipoDispositivoSegunPregunta` (`idTipoDispositivoSegunPregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleDiagnostico`
--

LOCK TABLES `detalleDiagnostico` WRITE;
/*!40000 ALTER TABLE `detalleDiagnostico` DISABLE KEYS */;
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
  `montoTotalDetalleReparacion` decimal(10,0) DEFAULT NULL,
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
  PRIMARY KEY (`idDiagnostico`),
  KEY `fk_diagnostico_dispositivo1_idx` (`idDispositivo`),
  KEY `fk_diagnostico_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_diagnostico_dispositivo1` FOREIGN KEY (`idDispositivo`) REFERENCES `dispositivo` (`idDispositivo`),
  CONSTRAINT `fk_diagnostico_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostico`
--

LOCK TABLES `diagnostico` WRITE;
/*!40000 ALTER TABLE `diagnostico` DISABLE KEYS */;
INSERT INTO `diagnostico` VALUES (1,'2025-06-07',1,11),(2,'2025-06-07',1,28);
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
  `descripcionDispositivo` varchar(80) NOT NULL,
  `modeloDispositivo` varchar(45) NOT NULL,
  `idMarcaDispositivo` int NOT NULL,
  `idTipoDispositivo` int NOT NULL,
  `idCliente` int NOT NULL,
  `estadoDispositivo` tinyint NOT NULL DEFAULT '1' COMMENT 'ACTIVO O INACTIVO',
  PRIMARY KEY (`idDispositivo`),
  KEY `fk_dispositivo_marca1_idx` (`idMarcaDispositivo`),
  KEY `fk_dispositivo_tipoDispositivo1_idx` (`idTipoDispositivo`),
  KEY `fk_dispositivo_cliente1_idx` (`idCliente`),
  CONSTRAINT `fk_dispositivo_cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `fk_dispositivo_marca1` FOREIGN KEY (`idMarcaDispositivo`) REFERENCES `marcaDispositivo` (`idMarcaDispositivo`),
  CONSTRAINT `fk_dispositivo_tipoDispositivo1` FOREIGN KEY (`idTipoDispositivo`) REFERENCES `tipoDispositivo` (`idTipoDispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo`
--

LOCK TABLES `dispositivo` WRITE;
/*!40000 ALTER TABLE `dispositivo` DISABLE KEYS */;
INSERT INTO `dispositivo` VALUES (1,'Samsung A70','424234532',4,1,9,1);
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
INSERT INTO `domicilio` VALUES (2,'1000','Argentina','Buenos Aires','CABA','Palermo','Av. Santa Fe',NULL,'3B',1,46);
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (11,'2024-11-09','2024-12-15',4,33,13),(12,'2023-11-16','2024-10-12',5,34,14),(13,'2025-02-20','2024-06-11',6,35,15),(14,'2025-01-21',NULL,4,36,16),(15,'2023-07-06','2024-09-25',5,37,17),(16,'2023-10-29',NULL,6,38,18),(17,'2025-04-22','2025-02-26',4,39,19),(18,'2023-10-03',NULL,5,40,20),(19,'2024-05-13','2025-03-15',6,41,21),(20,'2025-02-04',NULL,4,42,22),(23,'2025-06-07','2025-06-07',1,1,1),(25,'2025-06-07','2025-06-07',1,48,1),(26,'2025-06-07','2025-06-07',1,30,1),(27,'2025-06-07','2025-06-07',1,49,1),(28,'2025-06-07','2025-06-07',4,50,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoReparacion`
--

LOCK TABLES `estadoReparacion` WRITE;
/*!40000 ALTER TABLE `estadoReparacion` DISABLE KEYS */;
INSERT INTO `estadoReparacion` VALUES (1,'cancelado');
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionSistema`
--

LOCK TABLES `funcionSistema` WRITE;
/*!40000 ALTER TABLE `funcionSistema` DISABLE KEYS */;
INSERT INTO `funcionSistema` VALUES (2,'Visualizar Repuesto',1),(3,'Crear Repuesto',1),(4,'Modificar Repuesto',1),(5,'Eliminar Repuesto',1),(6,'Agregar Tipo de Repuesto',1),(7,'Modificar Tipo de Repuesto',1),(8,'Eliminar Tipo de Repuesto',1),(9,'Visualizar Tipo de Repuesto',1),(10,'Visualizar Cliente',1),(11,'Agregar Cliente',1),(12,'Modificar Cliente',1),(13,'Eliminar Cliente',1),(14,'Visualizar Reparación',1),(15,'Agregar Reparación',1),(16,'Modificar Reparación',1),(17,'Eliminar Reparación',1),(18,'Visualizar Tipo de Reparación',1),(19,'Agregar Tipo de Reparación',1),(20,'Modificar Tipo de Reparación',1),(21,'Eliminar Tipo de Reparación',1),(22,'Visualizar Empleado',1),(23,'Agregar Empleado',1),(24,'Modificar Empleado',1),(25,'Eliminar Empleado',1),(26,'Visualizar Perfiles',1),(27,'Agregar Perfiles',1),(28,'Modificar Perfiles',1),(29,'Eliminar Perfiles',1),(30,'Visualizar Módulos',1),(31,'Modificar Módulos',1),(32,'Visualizar Funciones',1),(33,'Visualizar Diagnóstico',1),(34,'Agregar Diagnóstico',1),(35,'Modificar Diagnóstico',1),(36,'Eliminar Diagnóstico',1),(37,'Ver Reporte Repuesto',1),(38,'Ver Reporte Cliente',1),(39,'Ver Reporte Reparación',1),(40,'Ver Reporte Empleado',1),(41,'Ver Reporte Perfiles',1),(42,'Ver Reporte Diagnóstico',1);
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
INSERT INTO `historialAsignacionDiagnostico` VALUES (1,'2025-06-07',NULL,1,11),(2,'2025-06-07','2025-06-07',2,28);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcaDispositivo`
--

LOCK TABLES `marcaDispositivo` WRITE;
/*!40000 ALTER TABLE `marcaDispositivo` DISABLE KEYS */;
INSERT INTO `marcaDispositivo` VALUES (4,'Samsung',1),(5,'LG',1),(6,'Apple',1),(7,'Xiaomi',1),(8,'Huawei',1),(9,'Motorola',1);
/*!40000 ALTER TABLE `marcaDispositivo` ENABLE KEYS */;
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
  `estadoModuloFuncionSistema` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idmoduloFuncionSistema`),
  KEY `fk_moduloFuncionSistema_moduloSistema1_idx` (`idmoduloSistema`),
  KEY `fk_moduloFuncionSistema_funcionSistema1_idx` (`idfuncionSistema`),
  CONSTRAINT `fk_moduloFuncionSistema_funcionSistema1` FOREIGN KEY (`idfuncionSistema`) REFERENCES `funcionSistema` (`idfuncionSistema`),
  CONSTRAINT `fk_moduloFuncionSistema_moduloSistema1` FOREIGN KEY (`idmoduloSistema`) REFERENCES `moduloSistema` (`idmoduloSistema`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moduloFuncionSistema`
--

LOCK TABLES `moduloFuncionSistema` WRITE;
/*!40000 ALTER TABLE `moduloFuncionSistema` DISABLE KEYS */;
INSERT INTO `moduloFuncionSistema` VALUES (3,1,39,'reparacion/ver-reporte-reparacion',0),(5,1,38,'reparacion/ver-reporte-cliente',0),(6,1,14,'reparacion/visualizar-reparación',0),(7,1,15,'reparacion/agregar-reparación',0),(8,1,16,'reparacion/modificar-reparación',0),(9,1,17,'reparacion/eliminar-reparación',0),(10,1,18,'reparacion/visualizar-tipo-de-reparación',0),(11,1,19,'reparacion/agregar-tipo-de-reparación',0),(12,1,20,'reparacion/modificar-tipo-de-reparación',0),(13,1,21,'reparacion/eliminar-tipo-de-reparación',0),(14,2,33,'diagnóstico/visualizar-diagnóstico',0),(15,2,34,'diagnóstico/agregar-diagnóstico',0),(16,2,35,'diagnóstico/modificar-diagnóstico',0),(17,2,36,'diagnóstico/eliminar-diagnóstico',0),(18,2,42,'diagnóstico/ver-reporte-diagnóstico',0),(19,3,22,'empleados/visualizar-empleado',0),(20,3,23,'empleados/agregar-empleado',0),(21,3,40,'empleados/ver-reporte-empleado',0),(22,3,24,'empleados/modificar-empleado',0),(23,3,25,'empleados/eliminar-empleado',0),(24,4,38,'clientes/ver-reporte-cliente',1),(25,4,10,'clientes/visualizar-cliente',0),(26,4,11,'clientes/agregar-cliente',0),(27,4,12,'clientes/modificar-cliente',0),(28,4,13,'clientes/eliminar-cliente',0),(29,5,2,'repuestos/visualizar-repuesto',1),(30,5,3,'repuestos/crear-repuesto',1),(31,5,4,'repuestos/modificar-repuesto',1),(32,5,37,'repuestos/ver-reporte-repuesto',1),(33,5,5,'repuestos/eliminar-repuesto',1),(34,5,7,'repuestos/modificar-tipo-de-repuesto',1),(35,5,8,'repuestos/eliminar-tipo-de-repuesto',1),(36,5,9,'repuestos/visualizar-tipo-de-repuesto',1),(37,5,6,'repuestos/agregar-tipo-de-repuesto',1),(38,6,41,'perfiles/ver-reporte-perfiles',1),(39,6,26,'perfiles/visualizar-perfiles',1),(40,6,27,'perfiles/agregar-perfiles',1),(41,6,28,'perfiles/modificar-perfiles',1),(42,6,29,'perfiles/eliminar-perfiles',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moduloSistema`
--

LOCK TABLES `moduloSistema` WRITE;
/*!40000 ALTER TABLE `moduloSistema` DISABLE KEYS */;
INSERT INTO `moduloSistema` VALUES (1,'Reparación',1),(2,'Diagnóstico',1),(3,'Empleados',1),(4,'Clientes',1),(5,'Repuestos',1),(6,'Perfiles',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'Administrador',1),(2,'Supervisor',0),(3,'Supervisor Oficial',0),(4,'Recepcionista',1),(5,'Temporal',0),(6,'Supervisoraa',0),(7,'Temporal2',0);
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
  CONSTRAINT `fk_permisoPerfil_moduloFuncionSistema1` FOREIGN KEY (`idmoduloFuncionSistema`) REFERENCES `moduloFuncionSistema` (`idmoduloFuncionSistema`) ON DELETE CASCADE,
  CONSTRAINT `fk_permisosDePerfiles_perfiles1` FOREIGN KEY (`idPerfil`) REFERENCES `perfil` (`idPerfil`)
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisoPerfil`
--

LOCK TABLES `permisoPerfil` WRITE;
/*!40000 ALTER TABLE `permisoPerfil` DISABLE KEYS */;
INSERT INTO `permisoPerfil` VALUES (3,2,0,3),(5,2,0,5),(6,2,0,6),(7,2,0,7),(8,2,0,8),(9,2,0,9),(10,2,0,10),(11,2,0,11),(12,2,0,12),(13,2,0,13),(22,2,0,14),(23,2,0,15),(24,2,0,16),(25,2,0,17),(26,2,0,18),(32,2,0,3),(33,2,0,5),(34,2,0,6),(35,2,0,7),(36,2,0,8),(37,2,0,9),(38,2,0,10),(39,2,0,11),(40,2,0,12),(41,2,0,13),(42,2,0,14),(43,2,0,15),(44,2,0,16),(45,2,0,17),(46,2,0,19),(47,2,0,20),(48,2,0,21),(49,2,0,22),(50,2,0,23),(51,2,0,3),(52,2,0,5),(53,2,0,6),(54,2,0,7),(55,2,0,8),(56,2,0,9),(57,2,0,10),(58,2,0,11),(59,2,0,12),(60,2,0,13),(61,2,0,14),(62,2,0,15),(63,2,0,16),(64,2,0,17),(65,2,0,19),(66,2,0,20),(67,2,0,21),(68,2,0,22),(69,2,0,23),(70,4,1,3),(71,4,1,5),(72,4,1,6),(73,4,1,7),(74,4,1,8),(75,4,1,9),(76,4,1,10),(77,4,1,11),(78,4,1,12),(79,4,1,13),(80,4,1,14),(81,4,1,15),(82,4,1,16),(83,4,1,17),(84,2,0,3),(85,2,0,5),(86,2,0,6),(87,2,0,7),(88,2,0,8),(89,2,0,9),(90,2,0,10),(91,2,0,11),(92,2,0,12),(93,2,0,13),(94,2,0,14),(95,2,0,15),(96,2,0,16),(97,2,0,17),(98,2,0,18),(99,2,0,3),(100,2,0,5),(101,2,0,6),(102,2,0,7),(103,2,0,8),(104,2,0,9),(105,2,0,10),(106,2,0,11),(107,2,0,12),(108,2,0,13),(109,2,0,16),(110,2,0,17),(111,2,0,18),(112,2,0,19),(113,2,0,20),(114,2,0,21),(115,2,0,22),(116,2,0,23),(117,2,0,3),(118,2,0,5),(119,2,0,6),(120,2,0,7),(121,2,0,8),(122,2,0,9),(123,2,0,10),(124,2,0,11),(125,2,0,12),(126,2,0,13),(127,2,0,16),(128,2,0,18),(129,2,0,19),(130,2,0,20),(131,2,0,21),(132,2,0,22),(133,2,0,23),(134,2,0,3),(135,2,0,5),(136,2,0,6),(137,2,0,7),(138,2,0,8),(139,2,0,9),(140,2,0,10),(141,2,0,11),(142,2,0,12),(143,2,0,13),(144,2,0,14),(145,2,0,19),(146,2,0,20),(147,2,0,21),(148,2,0,22),(149,2,0,23),(150,2,0,3),(151,2,0,5),(152,2,0,6),(153,2,0,7),(154,2,0,8),(155,2,0,9),(156,2,0,10),(157,2,0,11),(158,2,0,12),(159,2,0,13),(160,2,0,19),(161,2,0,20),(162,2,0,21),(163,2,0,22),(164,2,0,23),(165,4,1,3),(166,4,1,5),(167,4,1,6),(168,4,1,7),(169,4,1,8),(170,4,1,9),(171,4,1,10),(172,4,1,11),(173,4,1,12),(174,4,1,13),(175,2,0,3),(176,2,0,5),(177,2,0,6),(178,2,0,7),(179,2,0,8),(180,2,0,9),(181,2,0,10),(182,2,0,11),(183,2,0,12),(184,2,0,13),(185,2,0,19),(186,2,0,20),(187,2,0,21),(188,2,0,22),(189,2,0,23),(190,2,0,19),(194,3,0,3),(200,5,0,25),(201,5,0,26),(202,5,0,27),(203,5,0,28),(204,6,0,14),(205,6,0,15),(206,6,0,16),(207,6,0,17),(208,6,0,18),(210,7,0,3),(211,7,0,7),(287,1,1,3),(288,1,1,5),(289,1,1,6),(290,1,1,7),(291,1,1,8),(292,1,1,9),(293,1,1,10),(294,1,1,11),(295,1,1,12),(296,1,1,13),(297,1,1,14),(298,1,1,15),(299,1,1,16),(300,1,1,17),(301,1,1,19),(302,1,1,20),(303,1,1,21),(304,1,1,22),(305,1,1,23),(306,1,1,25),(307,1,1,26),(308,1,1,27),(309,1,1,28),(310,1,1,29),(311,1,1,30),(312,1,1,31),(313,1,1,32),(314,1,1,33),(315,1,1,34),(316,1,1,35),(317,1,1,37),(318,1,1,38),(319,1,1,39),(320,1,1,40),(321,1,1,41),(322,1,1,42);
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'20-12345678-9','Juan','Pérez','1990-05-21',0),(2,'20-12345678-9','Juan','Pérez','1990-05-21',0),(3,'80376112282','Amor','Vázquez','1975-12-24',1),(4,'37104155812','María Cristina','Lobato','1989-10-15',1),(5,'26003268859','Ruperta','Aparicio','1998-12-10',1),(6,'78236744407','Fulgencio','Alsina','2001-12-13',1),(7,'74572647457','Godofredo','Rosell','1992-11-25',1),(8,'4365511796','Palmira','Canales','1975-12-15',1),(9,'69613662997','Geraldo','Prat','1997-07-11',1),(10,'90934524289','Florentina','Pedrero','1990-05-19',1),(11,'15853288541','Ainoa','Vallejo','2000-03-06',1),(12,'92331841371','Otilia','Pedrero','1980-02-18',1),(23,'29447290809','Ceferino','Agustí','2002-10-10',1),(24,'61038994163','Atilio','Duran','1989-04-07',1),(25,'8052158793','Domingo','Frutos','2006-03-03',1),(26,'84370569271','Heliodoro','Caparrós','1970-09-18',0),(27,'16226921106','Yaiza','Barroso','1970-03-25',1),(28,'24638333369','Cruz','Clavero','1977-08-22',1),(29,'62566823552','Esperanza','Núñez','2006-03-01',1),(30,'53475047708','Emiliana','Hierro','1980-01-10',0),(31,'38175522673','Iris','Viña','1969-08-17',1),(32,'60968348986','Amor','Luís','1974-11-10',1),(33,'9105989460','Nazaret','Artigas','1988-08-28',0),(34,'83122786506','Conrado','Nicolás','1980-06-15',1),(35,'56995308741','Asdrubal','Vives','1994-10-02',0),(36,'48821432834','Lorenzo','Salom','1990-11-23',0),(37,'15364681148','Dan','Batalla','1993-04-30',0),(38,'22923106261','Regina','Montes','1977-04-19',0),(39,'76441561586','Elena','Cuenca','1977-07-27',1),(40,'74572905444','Amancio','Mate','1987-11-04',1),(41,'36535609148','Lupe','Pizarro','2005-06-08',1),(42,'67548003613','Rufina','Bermudez','2000-01-30',1),(43,'20-12345678-9','Brenda','Cano','2003-06-08',1),(44,'20-12345678-9','Juan','Pérez','1990-05-21',1),(46,'20-12345678-9','Jose','Franco','1990-06-21',1),(47,'20-12345678-9','Juan','Pérez','1990-01-01',1),(48,'20-12345678-9','Abril','Zacaria','1990-01-01',0),(49,'20-44923092-9','Martina','Cano','2013-03-21',0),(50,'20-456789043-9','Beglu','Bechir','2000-07-21',0);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntaDiagnostico`
--

LOCK TABLES `preguntaDiagnostico` WRITE;
/*!40000 ALTER TABLE `preguntaDiagnostico` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestoLaboral`
--

LOCK TABLES `puestoLaboral` WRITE;
/*!40000 ALTER TABLE `puestoLaboral` DISABLE KEYS */;
INSERT INTO `puestoLaboral` VALUES (1,'Técnico',1),(4,'Técnico',1),(5,'Administrador',1),(6,'Vendedor',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registroEstadoReparacion`
--

LOCK TABLES `registroEstadoReparacion` WRITE;
/*!40000 ALTER TABLE `registroEstadoReparacion` DISABLE KEYS */;
INSERT INTO `registroEstadoReparacion` VALUES (1,2,1,'2025-06-07 19:21:46',12),(2,2,1,'2025-06-07 19:48:13',13);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparacion`
--

LOCK TABLES `reparacion` WRITE;
/*!40000 ALTER TABLE `reparacion` DISABLE KEYS */;
INSERT INTO `reparacion` VALUES (1,'2025-06-07',NULL,4500,1,11),(2,'2025-06-07',NULL,4500,1,11);
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
INSERT INTO `repuesto` VALUES (2,'Pantalla',4500,2,4,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoContacto`
--

LOCK TABLES `tipoContacto` WRITE;
/*!40000 ALTER TABLE `tipoContacto` DISABLE KEYS */;
INSERT INTO `tipoContacto` VALUES (1,'correo'),(2,'telefono');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDatoPreguntaDiagnostico`
--

LOCK TABLES `tipoDatoPreguntaDiagnostico` WRITE;
/*!40000 ALTER TABLE `tipoDatoPreguntaDiagnostico` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDispositivo`
--

LOCK TABLES `tipoDispositivo` WRITE;
/*!40000 ALTER TABLE `tipoDispositivo` DISABLE KEYS */;
INSERT INTO `tipoDispositivo` VALUES (1,'celular');
/*!40000 ALTER TABLE `tipoDispositivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoDispositivoSegunPregunta`
--

DROP TABLE IF EXISTS `tipoDispositivoSegunPregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoDispositivoSegunPregunta` (
  `idTipoDispositivoSegunPregunta` varchar(45) NOT NULL,
  `idTipoDispositivo` int NOT NULL COMMENT 'idTipoDispositivo (FK): Especifica a quÃ© tipo de dispositivo se le asigna un campo de diagnÃ³stico.\n\nidCampoDiagnostico (FK): Define quÃ© campo de diagnÃ³stico estÃ¡ disponible para ese tipo de dispositivo.\n\nPor ejemplo:\n\nSi idTipoDispositivo = 1 (TelÃ©fono), y idCampoDiagnostico = 1 (Â¿Prende?), entonces para los telÃ©fonos, el campo "Â¿Prende?" se muestra en el formulario de diagnÃ³stico.\n\nSi idTipoDispositivo = 2 (Horno), y idCampoDiagnostico = 2 (Â¿Funciona el termostato?), ese campo estarÃ¡ disponible solo para hornos.',
  `idPreguntaDiagnostico` int NOT NULL,
  PRIMARY KEY (`idTipoDispositivoSegunPregunta`),
  KEY `fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagno_idx` (`idPreguntaDiagnostico`),
  KEY `fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo_idx` (`idTipoDispositivo`),
  CONSTRAINT `fk_tipoDispositivo_has_preguntasDiagnostico_preguntasDiagnost1` FOREIGN KEY (`idPreguntaDiagnostico`) REFERENCES `preguntaDiagnostico` (`idPreguntaDiagnostico`),
  CONSTRAINT `fk_tipoDispositivo_has_preguntasDiagnostico_tipoDispositivo1` FOREIGN KEY (`idTipoDispositivo`) REFERENCES `tipoDispositivo` (`idTipoDispositivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDispositivoSegunPregunta`
--

LOCK TABLES `tipoDispositivoSegunPregunta` WRITE;
/*!40000 ALTER TABLE `tipoDispositivoSegunPregunta` DISABLE KEYS */;
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
INSERT INTO `tipoDomicilio` VALUES (1,'domicilio real');
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
INSERT INTO `tipoRepuesto` VALUES (1,'Pantallas');
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
  `needs_password_change` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','$2b$12$GMM2gkbAfcnbvjGrTCzuye8.GHhIE1cRcrx35DFD8mgEMC0PjV87m','admin@admin.com',0),(2,'admin','$2b$12$J4DJbQJ2d8yeMKGHw6eYmuIwXEF3VERnKK78i2gWaOih1PdxzsoCu','brenda@admin.com',0),(13,'aguedamarquez','hashed_password','evilla@example.org',1),(14,'castelloprudencio','hashed_password','rayairene@example.com',1),(15,'paulapenalver','hashed_password','gilabertjorge@example.org',1),(16,'ynavarrete','hashed_password','ayusoagapito@example.org',1),(17,'emiliapaz','hashed_password','jose00@example.org',1),(18,'malemany','hashed_password','rocamorasabina@example.com',1),(19,'lealinigo','hashed_password','jimena57@example.net',1),(20,'pugagabriel','hashed_password','aguilabenigno@example.org',1),(21,'dborrego','hashed_password','calixta67@example.com',1),(22,'usimo','hashed_password','agustinagaliano@example.net',1);
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
/*!50013 DEFINER=`fastapi_user`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_notificaciones` AS select row_number() OVER (ORDER BY `subconsulta`.`fecha` desc )  AS `idActividad`,`subconsulta`.`tipo` AS `tipo`,`subconsulta`.`mensaje` AS `mensaje`,`subconsulta`.`fecha` AS `fecha`,`subconsulta`.`accion` AS `accion` from (select 'Alta empleado' AS `tipo`,concat('Empleado agregado: ',`p`.`nombre`,' ',`p`.`apellido`) AS `mensaje`,`e`.`fechaContratacion` AS `fecha`,'Ver empleado' AS `accion` from (`empleado` `e` join `persona` `p` on((`e`.`idPersona` = `p`.`idPersona`))) where ((`e`.`fechaContratacion` is not null) and (`e`.`fechaFinalizacion` is null)) union all select 'Baja empleado' AS `Baja empleado`,concat('Empleado dado de baja: ',`p`.`nombre`,' ',`p`.`apellido`) AS `CONCAT('Empleado dado de baja: ', p.nombre, ' ', p.apellido)`,`e`.`fechaFinalizacion` AS `fechaFinalizacion`,'Ver empleado' AS `Ver empleado` from (`empleado` `e` join `persona` `p` on((`e`.`idPersona` = `p`.`idPersona`))) where (`e`.`fechaFinalizacion` is not null) union all select 'Nuevo diagnóstico' AS `Nuevo diagnóstico`,concat('Se diagnosticó el dispositivo ID ',`d`.`idDispositivo`) AS `CONCAT('Se diagnosticó el dispositivo ID ', d.idDispositivo)`,`d`.`fechaDiagnostico` AS `fechaDiagnostico`,'Ver diagnóstico' AS `Ver diagnóstico` from `diagnostico` `d` union all select 'Reparación ingresada' AS `Reparación ingresada`,concat('Nueva reparación con número: ',`r`.`idReparacion`) AS `CONCAT('Nueva reparación con número: ', r.idReparacion)`,`r`.`fechaIngreso` AS `fechaIngreso`,'Ver reparación' AS `Ver reparación` from `reparacion` `r`) `subconsulta` */;
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

-- Dump completed on 2025-06-11 18:11:29
