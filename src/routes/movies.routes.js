import { Router } from 'express';
import { createMovie, getMovies, updateMovie } from '../controllers/movies.controller.js';

const router = Router();

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);

export default router;