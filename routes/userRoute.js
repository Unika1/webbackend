
import { Router } from 'express';

const router = Router();

import { login, signup, getUser, createUser, updateUser, deleteUser } from '../controllers/userController';

router.post('/login',login)
router.post('/register',signup)
router.get('/view_users',getUser)
router.post('/create_users',createUser)

router.put('/:id',updateUser)
router.delete('/:id',deleteUser)

export default router;