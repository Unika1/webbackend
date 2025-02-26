import {sequelize} from '../database/db.js';  // Import sequelize instance from db.js

import { DataTypes } from 'sequelize';  // Import DataTypes for defining model fields

// Define the Category model
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Automatically increment for new entries
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // The name cannot be null
  },
}, {
  tableName: 'categories',  // Table name in the database
  timestamps: false,  // Disable automatic timestamps (createdAt, updatedAt)
});

// Export the Category model
export default Category;
