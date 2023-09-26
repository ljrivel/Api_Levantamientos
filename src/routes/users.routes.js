// Purpose: Users routes to call users controllers
import e, { Router } from 'express';

import {
  Login,
  InsertarAdministrador,
  ListAdmin,
  ListAdminById,
  UpdateAdmin,
} from '../controllers/users.controller';

const router = Router();

router.post('/VerificarCredenciales', Login);
router.post('/InsertarAdministrador', InsertarAdministrador);
router.post('/ListaAdministradores', ListAdminById);
router.get('/ListaAdministradores', ListAdmin);
router.post('/ActualizarAdministrador', UpdateAdmin);

export default router;
