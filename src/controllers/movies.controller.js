import { Pelicula } from '../models/Pelicula.js';

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
