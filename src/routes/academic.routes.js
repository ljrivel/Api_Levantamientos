//Porpuse: academic routes to call academic controllers
import { Router } from 'express';

import {
  getPlanesEstudio,
  getListaCursos,
  getListaSedes,
  insertarPlanEstudios,
  ReadPeriodo,
  ReadPeriodos,
  InsertarSede,
  GetSedePorId,
  UpdateSede,
  DeleteSede,
  getPlanesEstudioPorId,
  UpdatePlanEstudio,
  DeletePlanEstudio,
  insertCurso,
  getCursoPorId,
  DeleteCurso,
  insertCursoDesdeJson,
  insertarFormulario,
  EliminarFormularioYPeriodo,
  getFormulariosPeriodo,
  ActualizarFormulario,
  DeleteFormulario,
  UpdateCurso,
  getFormularioPeriodoPorId,
} from '../controllers/academic.controller';

const router = Router();

router.get('/ListaPlanesEstudio', getPlanesEstudio);
router.get('/ListaCursos', getListaCursos);
router.get('/ListaSedes', getListaSedes);
router.get('/ReadPeriodos', ReadPeriodos);
router.post('/InsertarPlanEstudios', insertarPlanEstudios);
router.post('/ReadPeriodo', ReadPeriodo);
router.post('/InsertarSede', InsertarSede);
router.post('/GetSedePorId', GetSedePorId);
router.post('/UpdateSede', UpdateSede);
router.post('/DeleteSede', DeleteSede);
router.post('/GetPlanEstudioPorId', getPlanesEstudioPorId);
router.post('/UpdatePlanEstudio', UpdatePlanEstudio);
router.post('/DeletePlanEstudio', DeletePlanEstudio);
router.post('/InsertarCurso', insertCurso);
router.post('/GetCursoPorId', getCursoPorId);
router.post('/DeleteCurso', DeleteCurso);
router.post('/InsertarCursosDesdeJson', insertCursoDesdeJson);
router.post('/InsertarFormulario', insertarFormulario);
router.post('/EliminarFormularioYPeriodo', EliminarFormularioYPeriodo);
router.post('/GetFormulariosPeriodo', getFormulariosPeriodo);
router.post('/ActualizarFormulario', ActualizarFormulario);
router.post('/DeleteFormulario', DeleteFormulario);
router.post('/UpdateCurso', UpdateCurso);
router.post('/GetFormularioPeriodoPorId', getFormularioPeriodoPorId);

export default router;
