import { Router } from 'express';
import {
  getInvolucrados,
  createInvolucrado,
  updateInvolucrado,
  deleteInvolucrado,
} from '../controllers/involucrado.controller.js';

const router = Router();

router.get('/involucrados', getInvolucrados);
router.post('/involucrados', createInvolucrado);
router.put('/involucrados/:id', updateInvolucrado);
router.delete('/involucrados/:id', deleteInvolucrado);

export default router;
