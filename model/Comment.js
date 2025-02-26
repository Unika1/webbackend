import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js'; 
import User from './User.js'; // Import User model
import Remedy from './Remedy.js'; // Import Remedy model

// Define the Comment model
const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'comments',
  timestamps: true, // Automatically add createdAt and updatedAt fields
});



export default Comment;
