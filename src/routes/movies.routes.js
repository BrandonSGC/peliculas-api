import { Router } from 'express';
import { createMovie, getMovies, updateMovie, deleteMovie } from '../controllers/movies.controller.js';

const router = Router();

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

export default router;