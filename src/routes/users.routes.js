import { Router } from 'express';

import { Login, InsertarAdministrador } from '../controllers/users.controller';

const router = Router();

router.post('/VerificarCredenciales', Login);
router.post('/InsertarAdministrador', InsertarAdministrador);

export default router;
