import { Router } from 'express';
import uniSearchController from '../controllers/uni-search';

const router = Router();

router.post('/', uniSearchController.post);

export default router;
