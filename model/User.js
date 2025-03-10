// Import necessary modules
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js'; // Import sequelize connection

// Define the User model
const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
}, {
  tableName: 'users',
  allowNull:true,
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

export default User;
