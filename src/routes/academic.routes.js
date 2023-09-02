import { Router } from 'express';

import {
  getPlanesEstudio,
  getListaCursos,
  getListaSedes,
} from '../controllers/academic.controller';

const router = Router();

router.get('/ListaPlanesEstudio', getPlanesEstudio);
router.get('/ListaCursos', getListaCursos);
router.get('/ListaSedes', getListaSedes);

export default router;
