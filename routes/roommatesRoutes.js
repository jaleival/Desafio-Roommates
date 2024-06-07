import { Router } from 'express';
import { createRoommate, getAllRoommates, getRoommateById } from '../controllers/roommatesController.js';

const router = Router();

router.get('/', getAllRoommates);
router.get('/:id', getRoommateById);
router.post('/', createRoommate);

export default router;