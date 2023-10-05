import { Pelicula } from '../models/Pelicula.js';
import { Comentario } from '../models/Comentarios.js'
import { sequelize } from '../database/connection.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await Pelicula.findAll();
    res.json(movies);
  } catch (error) {
    console.log(`An error has ocurred while getting movies: ${error}`);
    res.status(500).json({message: error.message});
  }
};

export const createMovie = async (req, res) => {
  try {
    const { nombre, resena, califiacionID, poster, fecha } = req.body;

    await Pelicula.create({
      nombre,
      resena,
      califiacionID,
      poster,
      fecha
    });

    res.status(201).json({ message: 'Película creada exitósamente!' });
  } catch (error) {
    console.log(`An error has occurred while creating a movie. ${error}`);
    res.status(500).json({ error: 'Error creating movie' });
  }
}

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, resena, calificacionID, poster, fecha } = req.body;

    console.log(id, calificacionID);

    const movie = await Pelicula.findByPk(id);

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

export const getMovieInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const movieInfo = await sequelize.query('CALL ObtenerInformacionPelicula(:peliculaID)', {
      replacements: { peliculaID: id },
      type: sequelize.QueryTypes.SELECT,
    });

    const calificaciones = await sequelize.query('CALL ObtenerCalificacionesPelicula(:peliculaID)', {
      replacements: { peliculaID: id },
      type: sequelize.QueryTypes.SELECT,
    });

    const involucrados = await sequelize.query('CALL ObtenerInvolucradosPelicula(:peliculaID)', {
      replacements: { peliculaID: id },
      type: sequelize.QueryTypes.SELECT,
    });

    const fullMovieInfo = {
      movieInfo: movieInfo[0]['0'],
      calificaciones: calificaciones[0]['0'], 
      involucrados: involucrados[0]
    }

    res.status(200).json(fullMovieInfo);

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
    console.log(id);

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