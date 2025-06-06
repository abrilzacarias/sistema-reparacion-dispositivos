-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
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
USE gestionreparaciones
DROP TABLE IF EXISTS `asignacionUsuarioPermisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacionUsuarioPermisos` (
  `idasignacionUsuarioPermisos` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idpermisoPerfil` int NOT NULL,
  PRIMARY KEY (`idasignacionUsuarioPermisos`),
  KEY `fk_asignacionUsuarioPermisos_usuarios1_idx` (`idUsuario`),
  KEY `fk_asignacionUsuarioPermisos_permisosDePerfiles1_idx` (`idpermisoPerfil`),
  CONSTRAINT `fk_asignacionUsuarioPermisos_permisosDePerfiles1` FOREIGN KEY (`idpermisoPerfil`) REFERENCES `permisoPerfil` (`idpermisoPerfil`),
  CONSTRAINT `fk_asignacionUsuarioPermisos_usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `esPrimario` tinyint NOT NULL DEFAULT '0' COMMENT 'Indica si es el tipo de contacto principal del cliente. Por ejemplo, si es el correo electronico o telefono principal.',
  PRIMARY KEY (`idContacto`),
  KEY `fk_contacto_tipoContacto1_idx` (`idtipoContacto`),
  KEY `fk_contacto_personas1_idx` (`idPersona`),
  CONSTRAINT `fk_contacto_personas1` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`),
  CONSTRAINT `fk_contacto_tipoContacto1` FOREIGN KEY (`idtipoContacto`) REFERENCES `tipoContacto` (`idtipoContacto`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (2,'canobren080603@gmail.com',1,9, 1),(5,'juan.perez@gmail.com',1,44, 0),(6,'+54 911 1234 5678',2,44,0);
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
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
  PRIMARY KEY (`idDiagnostico`),
  KEY `fk_diagnostico_dispositivo1_idx` (`idDispositivo`),
  KEY `fk_diagnostico_empleado1_idx` (`idEmpleado`),
  CONSTRAINT `fk_diagnostico_dispositivo1` FOREIGN KEY (`idDispositivo`) REFERENCES `dispositivo` (`idDispositivo`),
  CONSTRAINT `fk_diagnostico_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostico`
--

LOCK TABLES `diagnostico` WRITE;
/*!40000 ALTER TABLE `diagnostico` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo`
--

LOCK TABLES `dispositivo` WRITE;
/*!40000 ALTER TABLE `dispositivo` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (11,'2024-11-09','2024-12-15',4,33,13),(12,'2023-11-16','2024-10-12',5,34,14),(13,'2025-02-20','2024-06-11',6,35,15),(14,'2025-01-21',NULL,4,36,16),(15,'2023-07-06','2024-09-25',5,37,17),(16,'2023-10-29',NULL,6,38,18),(17,'2025-04-22','2025-02-26',4,39,19),(18,'2023-10-03',NULL,5,40,20),(19,'2024-05-13','2025-03-15',6,41,21),(20,'2025-02-04',NULL,4,42,22);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoReparacion`
--

LOCK TABLES `estadoReparacion` WRITE;
/*!40000 ALTER TABLE `estadoReparacion` DISABLE KEYS */;
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
  `descripcionfuncionSistema` varchar(45) NOT NULL,
  PRIMARY KEY (`idfuncionSistema`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  PRIMARY KEY (`idmoduloFuncionSistema`),
  KEY `fk_moduloFuncionSistema_moduloSistema1_idx` (`idmoduloSistema`),
  KEY `fk_moduloFuncionSistema_funcionSistema1_idx` (`idfuncionSistema`),
  CONSTRAINT `fk_moduloFuncionSistema_funcionSistema1` FOREIGN KEY (`idfuncionSistema`) REFERENCES `funcionSistema` (`idfuncionSistema`),
  CONSTRAINT `fk_moduloFuncionSistema_moduloSistema1` FOREIGN KEY (`idmoduloSistema`) REFERENCES `moduloSistema` (`idmoduloSistema`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `descripcionmoduloSistema` varchar(45) NOT NULL,
  PRIMARY KEY (`idmoduloSistema`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'20-12345678-9','Juan','Pérez','1990-05-21',0),(2,'20-12345678-9','Juan','Pérez','1990-05-21',0),(3,'80376112282','Amor','Vázquez','1975-12-24',1),(4,'37104155812','María Cristina','Lobato','1989-10-15',1),(5,'26003268859','Ruperta','Aparicio','1998-12-10',1),(6,'78236744407','Fulgencio','Alsina','2001-12-13',1),(7,'74572647457','Godofredo','Rosell','1992-11-25',1),(8,'4365511796','Palmira','Canales','1975-12-15',1),(9,'69613662997','Geraldo','Prat','1997-07-11',1),(10,'90934524289','Florentina','Pedrero','1990-05-19',1),(11,'15853288541','Ainoa','Vallejo','2000-03-06',1),(12,'92331841371','Otilia','Pedrero','1980-02-18',1),(23,'29447290809','Ceferino','Agustí','2002-10-10',1),(24,'61038994163','Atilio','Duran','1989-04-07',1),(25,'8052158793','Domingo','Frutos','2006-03-03',1),(26,'84370569271','Heliodoro','Caparrós','1970-09-18',1),(27,'16226921106','Yaiza','Barroso','1970-03-25',1),(28,'24638333369','Cruz','Clavero','1977-08-22',1),(29,'62566823552','Esperanza','Núñez','2006-03-01',1),(30,'53475047708','Emiliana','Hierro','1980-01-10',1),(31,'38175522673','Iris','Viña','1969-08-17',1),(32,'60968348986','Amor','Luís','1974-11-10',1),(33,'9105989460','Nazaret','Artigas','1988-08-28',0),(34,'83122786506','Conrado','Nicolás','1980-06-15',1),(35,'56995308741','Asdrubal','Vives','1994-10-02',0),(36,'48821432834','Lorenzo','Salom','1990-11-23',0),(37,'15364681148','Dan','Batalla','1993-04-30',0),(38,'22923106261','Regina','Montes','1977-04-19',0),(39,'76441561586','Elena','Cuenca','1977-07-27',1),(40,'74572905444','Amancio','Mate','1987-11-04',1),(41,'36535609148','Lupe','Pizarro','2005-06-08',1),(42,'67548003613','Rufina','Bermudez','2000-01-30',1),(43,'20-12345678-9','Brenda','Cano','2003-06-08',1),(44,'20-12345678-9','Juan','Pérez','1990-05-21',1);
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
INSERT INTO `puestoLaboral` VALUES (4,'Técnico',1),(5,'Administrador',1),(6,'Vendedor',1);
/*!40000 ALTER TABLE `puestoLaboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparacion`
--

DROP TABLE IF EXISTS `reparacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reparacion` (
  `idReparacion` int NOT NULL AUTO_INCREMENT,
  `numeroReparacion` int NOT NULL,
  `idEstadoReparacion` int NOT NULL,
  `fechaIngreso` date NOT NULL,
  `fechaEgreso` date DEFAULT NULL,
  `montoTotalReparacion` decimal(10,0) NOT NULL,
  `idDiagnostico` int NOT NULL,
  `idEmpleado` int NOT NULL COMMENT 'puede ser que un empleado haga el diagnostico y otro la reparacion',
  PRIMARY KEY (`idReparacion`),
  KEY `fk_reparacion_diagnostico1_idx` (`idDiagnostico`),
  KEY `fk_reparacion_empleado1_idx` (`idEmpleado`),
  KEY `fk_reparacion_estadoReparacion1_idx` (`idEstadoReparacion`),
  CONSTRAINT `fk_reparacion_diagnostico1` FOREIGN KEY (`idDiagnostico`) REFERENCES `diagnostico` (`idDiagnostico`),
  CONSTRAINT `fk_reparacion_empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`),
  CONSTRAINT `fk_reparacion_estadoReparacion1` FOREIGN KEY (`idEstadoReparacion`) REFERENCES `estadoReparacion` (`idEstadoReparacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparacion`
--

LOCK TABLES `reparacion` WRITE;
/*!40000 ALTER TABLE `reparacion` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoDispositivo`
--

LOCK TABLES `tipoDispositivo` WRITE;
/*!40000 ALTER TABLE `tipoDispositivo` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','$2b$12$GMM2gkbAfcnbvjGrTCzuye8.GHhIE1cRcrx35DFD8mgEMC0PjV87m','admin@admin.com'),(2,'admin','$2b$12$J4DJbQJ2d8yeMKGHw6eYmuIwXEF3VERnKK78i2gWaOih1PdxzsoCu','brenda@admin.com'),(13,'aguedamarquez','hashed_password','evilla@example.org'),(14,'castelloprudencio','hashed_password','rayairene@example.com'),(15,'paulapenalver','hashed_password','gilabertjorge@example.org'),(16,'ynavarrete','hashed_password','ayusoagapito@example.org'),(17,'emiliapaz','hashed_password','jose00@example.org'),(18,'malemany','hashed_password','rocamorasabina@example.com'),(19,'lealinigo','hashed_password','jimena57@example.net'),(20,'pugagabriel','hashed_password','aguilabenigno@example.org'),(21,'dborrego','hashed_password','calixta67@example.com'),(22,'usimo','hashed_password','agustinagaliano@example.net');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-04  0:54:22
