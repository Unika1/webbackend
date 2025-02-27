import { Router } from 'express';

import { signup, login } from '../controllers/authController.js';
import User from '../model/User.js';
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return only relevant fields
      res.json({
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
export default router;