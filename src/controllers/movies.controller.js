import { Pelicula } from '../models/Pelicula.js';
import { Comentario } from '../models/Comentarios.js'

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
    const { nombre, resena, califiacionID, poster, fecha } = req.body;

    const movie = await Pelicula.findByPk(id);

    movie.nombre = nombre;
    movie.resena = resena;
    movie.califiacionID = califiacionID;
    movie.poster = poster;
    movie.fecha = fecha;

    movie.save();

    res.status(200).send({message: 'Película actualizada correctamente!'})

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
    res.json({message: 'Película eliminada exitósamente!'});
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