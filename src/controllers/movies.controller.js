import { Pelicula } from '../models/Pelicula.js';
import { Comentario } from '../models/Comentarios.js'
import { sequelize } from '../database/connection.js';
import { Involucrado } from '../models/Involucrado.js';
import { PeliculaInvolucrado } from '../models/PeliculaInvolucrado.js';
import { Rol } from '../models/Roles.js'

export const getTop5RecentMovies = async (req, res) => {
  try {
    const [result] = await sequelize.query('CALL ObtenerIdTop5PeliculasMasRecientes()', {
      type: sequelize.QueryTypes.SELECT,
    });
    
    // Get ids from the result object.
    const movieIDs = Object.values(result).map(item => item.peliculaID);
  
    if (movieIDs.length === 0) {
      res.status(404).json({message:"No se han encontrado peliculas..."});
      return;
    }

    const movieInfoPromises = [];

    for (let i = 0; i < movieIDs.length; i++) {
      const movieInfoPromise = getMovieInfo(movieIDs[i]);
      movieInfoPromises.push(movieInfoPromise);
    }

    const moviesInfo = await Promise.all(movieInfoPromises);

    res.status(200).json(moviesInfo);

  } catch (error) {
    console.log(`An error has occurred while getting movies: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const getMovieInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    const fullMovieInfo = await getMovieInfo(id);

    if (fullMovieInfo) {
      res.status(200).json(fullMovieInfo);
    } else {
      res.status(404).json({ message: "No se ha encontrado la película." });
    }
  } catch (error) {
    console.error(`Ha ocurrido un error al obtener información de la película: ${error}`);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};


export const createMovie = async (req, res) => {
  try {
    const { nombre, resena, califiacionID, poster, fecha, involucrados } = req.body;

    const pelicula = await Pelicula.create({
      nombre,
      resena,
      califiacionID,
      poster,
      fecha
    });

    for (let i = 0; i < involucrados.length; i++) {
      // Crear el involucrado.
      const involucrado = await Involucrado.create({
        nombre: involucrados[i].nombre,
        paginaWeb: involucrados[i].paginaWeb,
        facebook: involucrados[i].facebook,
        instagram: involucrados[i].instagram,
        twitter: involucrados[i].twitter,
      });
      
      // Enlazar el involucrado a la pelicula.
      await PeliculaInvolucrado.create({
        peliculaID: pelicula.peliculaID,
        involucradoID: involucrado.involucradoID,
        rolID: involucrados[i].rolID,
        ordenAparicion: involucrados[i].ordenAparicion,
      });
    }
    res.status(201).json({ message: 'Película creada exitósamente!', pelicula: pelicula });
  } catch (error) {
    console.log(`An error has occurred while creating a movie. ${error}`);
    res.status(500).json({ error: 'Error creating movie' });
  }
}


export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, resena, calificacionID, poster, fecha } = req.body;

    const movie = await Pelicula.findByPk(id);

    if (!movie) {
        res.status(404).json({ message: 'La película a modificar no existe.' });
        return;
    }

    movie.nombre = nombre;
    movie.resena = resena;
    movie.calificacionID = calificacionID;
    movie.poster = poster;
    movie.fecha = fecha;

    movie.save();

    res.status(200).json({message: 'Película actualizada correctamente!'})

  } catch (error) {
    console.log(`An error has ocurred while updating movie: ${error}`);
  }
}


export const deleteMovie = async (req, res) => {
  try {
    // Get id from the url parameters.
    const { id } = req.params;

    const movie = await Pelicula.findByPk(id);
    if (!movie) {
        res.status(404).json({ message: 'La película a eliminar no existe.' });
        return;
    }
    
    // Delete user.
    await Pelicula.destroy({
      where: {
        peliculaID: id
      }
    });
    res.status(200).json({message: 'Película eliminada exitósamente!'});
  } catch (error) {
    console.log(`An error has ocurred while getting movies: ${error}`);
    res.status(500).json({message: error.message});
  }
};


export const createComment = async (req, res) => {
  try {
    const { usuarioID, peliculaID, contenido, comentarioPadreID, fecha } = req.body;

    await Comentario.create({
      peliculaID,
      usuarioID,
      contenido,
      comentarioPadreID,
      fecha
    });

    res.status(201).json({ message: 'Comentario creado exitósamente!' });
  } catch (error) {
    console.log(`An error has ocurred while creating the comment: ${error}`);
    res.status(500).json({message: error.message});
  }
}


export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioID, peliculaID, contenido, comentarioPadreID, fecha } = req.body;

    const comment = await Comentario.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'El comentario a modificar no existe.' });
      return;
    }

    comment.usuarioID = usuarioID;
    comment.peliculaID = peliculaID;
    comment.contenido = contenido;
    comment.comentarioPadreID = comentarioPadreID;
    comment.fecha = fecha;

    comment.save();

    res.status(200).json({message: 'Comentario actualizada correctamente!'})

  } catch (error) {
    console.log(`An error has ocurred while updating the comment: ${error}`);
  }
}


export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comentario.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'El comentario a eliminar no existe.' });
      return;
  }

    await Comentario.destroy({
      where: {
        comentarioID: id
      }
    });

    res.status(200).json({message: 'Comentario eliminado exitósamente!'});
  } catch (error) {
    console.log(`An error has ocurred while deleting the comment: ${error}`);
    res.status(500).json({message: error.message});
  }
}


// Functions
const isEmpty = (obj) => Object.keys(obj).length === 0;

async function getMovieInfo(id) {
  const movieInfo = await sequelize.query('CALL ObtenerInformacionPelicula(:peliculaID)', {
    replacements: { peliculaID: id },
    type: sequelize.QueryTypes.SELECT,
  });

  // Validar que encuentra la pelicula.
  if (isEmpty(movieInfo[0])) return null;

  const calificacionesResults = await sequelize.query('CALL ObtenerCalificacionesPelicula(:peliculaID)', {
    replacements: { peliculaID: id },
    type: sequelize.QueryTypes.SELECT,
  });

  const involucradosResults = await sequelize.query('CALL ObtenerInvolucradosPelicula(:peliculaID)', {
    replacements: { peliculaID: id },
    type: sequelize.QueryTypes.SELECT,
  });

  const comentariosResults = await sequelize.query('CALL ObtenerComentariosPelicula(:peliculaID)', {
    replacements: { peliculaID: id },
    type: sequelize.QueryTypes.SELECT,
  });

  const calificaciones = calificacionesResults[0] ? calificacionesResults[0]['0'] : null;
  const involucrados = involucradosResults[0] ? Object.values(involucradosResults[0]) : [];
  const comentarios = comentariosResults[0] ? Object.values(comentariosResults[0]) : [];

  const formattedInvolucrados = involucrados.map((involucrado) => {
    return {
      involucradoID: involucrado.involucradoID,
      nombre: involucrado.nombre,
      rol: involucrado.rol,
      ordenAparicion: involucrado.ordenAparicion,
      paginaWeb: involucrado.paginaWeb,
      facebook: involucrado.facebook,
      instagram: involucrado.instagram,
      twitter: involucrado.twitter,
    };
  });

  const formattedComentarios = comentarios.map((comentario) => {
    return {
      comentarioID: comentario.comentarioID,
      usuarioID: comentario.usuarioID,
      contenido: comentario.contenido,
      fecha: comentario.fecha,
    };
  });

  const formattedCalificaciones = calificaciones
    ? {
        calificacion: calificaciones.calificacion,
        nombre_experto: calificaciones.nombre_experto,
      }
    : null;

  const fullMovieInfo = {
    ...movieInfo[0]['0'],
    calificaciones: formattedCalificaciones,
    involucrados: formattedInvolucrados,
    comentarios: formattedComentarios,
  };

  return fullMovieInfo;
}
