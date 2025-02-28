import { Sequelize, DataTypes } from 'sequelize';
import { define } from '../database/db';

const User = define('Users', {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  User_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  User_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  User_skintype: {
    type: DataTypes.STRING,
  },
  UserType: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;