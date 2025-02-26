import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import Category from './Category.js';  // Import the Category model
import Comment from './Comment.js';    // Import the Comment model

// Define the Remedy model
const Remedy = sequelize.define('Remedy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  procedure: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Store the image URL or file path
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default to 0 if not provided
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default to 1 (change as needed to a valid category ID)
    references: {
      model: 'categories', // Use the table name as reference
      key: 'id',
    },
  },
}, {
  tableName: 'remedies',  // Specify the actual table name
  timestamps: true,       // Sequelize auto-manages createdAt and updatedAt
});

// Establish relationships
Remedy.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Remedy.hasMany(Comment, { foreignKey: 'remedyId', onDelete: 'CASCADE' });

export default Remedy;
