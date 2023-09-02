import { Router } from 'express';

import { getUsers } from '../controllers/users.controller';

const router = Router();

/* router.get('/getPuestos',getPuestos); */
router.get('/getUsers', getUsers);

export default router;
