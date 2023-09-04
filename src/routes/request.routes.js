import e, { Router } from 'express';

import {
  InsertRequest,
  InsertRequestRN,
  DeleteRequestRN,
  DeleteRequest,
} from '../controllers/request.controller';

const router = Router();

router.post('/InsertRequest', InsertRequest);
router.post('/InsertRequestRn', InsertRequestRN);
router.post('/DeleteRequest', DeleteRequest);
router.post('/DeleteRequestRn', DeleteRequestRN);

export default router;
