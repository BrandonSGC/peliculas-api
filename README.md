# API de Peliculas

## Script SQL

El siguiente script SQL se utiliza para crear la base de datos y las tablas necesarias:

```sql
-- Crear la base de datos ProyectoProgV si no existe
CREATE DATABASE IF NOT EXISTS ProyectoProgV;
USE ProyectoProgV;

-- Crear la tabla Roles si no existe
CREATE TABLE IF NOT EXISTS Roles (
    rolID INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(30) NOT NULL
);

-- Crear la tabla Involucrado si no existe
CREATE TABLE IF NOT EXISTS Involucrado (
    involucradoID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    paginaWeb VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    twitter VARCHAR(255)
);

-- Crear la tabla Experto si no existe (Primero)
CREATE TABLE IF NOT EXISTS Experto (
    ExpertoID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

-- Crear la tabla Calificaciones si no existe (Luego)
CREATE TABLE IF NOT EXISTS Calificaciones (
    calificacionID INT AUTO_INCREMENT PRIMARY KEY,
    expertoID INT NOT NULL,
    calificacion INT NOT NULL,
    FOREIGN KEY (expertoID) REFERENCES Experto(ExpertoID)
);

-- Crear la tabla Usuarios si no existe
CREATE TABLE IF NOT EXISTS Usuarios (
    usuarioID INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(30) UNIQUE,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    contrasena VARCHAR(30) NOT NULL,
    activo TINYINT NOT NULL -- 0 = False, 1 = True
);

-- Crear la tabla Pelicula si no existe
CREATE TABLE IF NOT EXISTS Pelicula (
    peliculaID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    resena VARCHAR(1000) NOT NULL,
    calificacionID INT, -- https://m.media-amazon.com/images/I/71zEeojFg5L.jpg
    poster VARCHAR(255),
    fecha DATE NOT NULL,
    FOREIGN KEY (calificacionID) REFERENCES Calificaciones(calificacionID)
);

-- Crear la tabla PeliculaInvolucrado si no existe
CREATE TABLE IF NOT EXISTS PeliculaInvolucrado (
    peliculaID INT NOT NULL,
    involucradoID INT NOT NULL,
    rolID INT NOT NULL,
    ordenAparicion INT NOT NULL,
    PRIMARY KEY (peliculaID, involucradoID),
    FOREIGN KEY (rolID) REFERENCES Roles(rolID),
    FOREIGN KEY (peliculaID) REFERENCES Pelicula(peliculaID),
    FOREIGN KEY (involucradoID) REFERENCES Involucrado(involucradoID)
);

-- Crear la tabla Comentarios si no existe
CREATE TABLE IF NOT EXISTS Comentarios (
    comentarioID INT AUTO_INCREMENT PRIMARY KEY,
    peliculaID INT NOT NULL,
    usuarioID INT NOT NULL,
    contenido TEXT NOT NULL,
    comentarioPadreID INT,
    fecha DATE NOT NULL,
    FOREIGN KEY (peliculaID) REFERENCES Pelicula(peliculaID),
    FOREIGN KEY (usuarioID) REFERENCES Usuarios(usuarioID)
);

-- Stored Procedures:

DELIMITER //
CREATE PROCEDURE LoginUsuario(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(50)
)
BEGIN
    DECLARE activoID INT;

    -- Verificar si las credenciales son correctas y obtener el ID del usuario
    SELECT activo INTO activoID
    FROM Usuarios
    WHERE nombreUsuario = p_username AND contrasena = p_password;

    -- Verificar si el usuario está activo
    IF activoID = 0 THEN
        -- Credenciales incorrectas
        SELECT 0;
    ELSEif activoID is null then
		SELECT 0;
	else
        -- Inicio de sesión exitoso
        SELECT 1;
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerIdTop5PeliculasMasRecientes()
BEGIN
  SELECT peliculaID FROM Pelicula
  ORDER BY fecha DESC
  LIMIT 5;
END //
DELIMITER ;

CALL ObtenerIdTop5PeliculasMasRecientes();

DELIMITER //
CREATE PROCEDURE ObtenerInformacionPelicula(IN peliculaID INT)
BEGIN
    SELECT
        P.peliculaID,
        P.nombre,
        P.resena,
        P.poster,
        P.fecha
    FROM Pelicula P
    WHERE P.peliculaID = peliculaID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerCalificacionesPelicula(IN peliculaIDParam INT)
BEGIN
    SELECT
        C.calificacion,
        E.nombre AS nombre_experto
    FROM Calificaciones C
    INNER JOIN Experto E ON C.expertoID = E.ExpertoID
    WHERE C.calificacionID = (SELECT calificacionID FROM Pelicula WHERE peliculaID = peliculaIDParam);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerInvolucradosPelicula(IN peliculaID INT)
BEGIN
    SELECT
        I.nombre,
        R.descripcion AS rol,
        PI.ordenAparicion,
        I.paginaWeb,
        I.facebook,
        I.instagram,
        I.twitter
    FROM PeliculaInvolucrado PI
    INNER JOIN Involucrado I ON PI.involucradoID = I.involucradoID
    INNER JOIN Roles R ON PI.rolID = R.rolID
    WHERE PI.peliculaID = peliculaID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerComentariosPelicula(IN peliculaIDParam INT)
BEGIN
    SELECT
        comentarioID,
        usuarioID,
        contenido,
        fecha
    FROM Comentarios
    WHERE peliculaID = peliculaIDParam;
END //
DELIMITER ;
