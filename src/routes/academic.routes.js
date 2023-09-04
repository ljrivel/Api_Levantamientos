import { Router } from 'express';

import {
  getPlanesEstudio,
  getListaCursos,
  getListaSedes,
  insertarPlanEstudios,
} from '../controllers/academic.controller';

const router = Router();

router.get('/ListaPlanesEstudio', getPlanesEstudio);
router.get('/ListaCursos', getListaCursos);
router.get('/ListaSedes', getListaSedes);
router.post('/InsertarPlanEstudios', insertarPlanEstudios);

export default router;
