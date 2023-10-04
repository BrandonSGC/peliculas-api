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
