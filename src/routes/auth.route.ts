import express from'express';
import { register } from '../controllers/authController.ts';

const router = express.Router()

router.post('/api/auth/register', register)

export default router