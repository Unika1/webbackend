import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/User.js';

const signup = async (req, res) => {
    console.log("Request body:", req.body);
    const { username, email, password } = req.body;
    
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: {email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        // role: 'user',
      });
  
      res.status(201).json({ message: 'Signup successful!', user });
    } catch (error) {
      res.status(500).json({ message: 'Error during signup', error: error.message });
    }
  };
  
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    try {
      console.log("Request Body:", req.body);
      const user = await User.findOne({ where: { email } });
  
      console.log("User Found:", user); // Debugging
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role }, 
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.status(200).json({
        success: true,
        data: {
          access_token: token,
          userRole: user.role,
          userId: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

export {login , signup};