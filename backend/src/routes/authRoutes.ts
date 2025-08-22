import { Router } from 'express';
import {
  createToken,
  login,
  logout
} from '../controllers/authController';

const router = Router();

router.post('/token', createToken);
router.post('/login', login);
router.delete('/logout', logout);

export default router;