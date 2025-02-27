import { DataTypes } from "sequelize";
import { sequelize } from '../database/db.js'; 

export const Review = sequelize.define("Review2", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  remedyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "remedy_id"  //  Fix: Ensure correct column name in DB
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id"  // Fix: Ensure correct column name in DB
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "username"
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: "comment"
  },
}, {
  timestamps: true,
  createdAt: "created_at",  //  Fix: Ensure correct createdAt column name
  updatedAt: "updated_at",  //  Fix: Ensure correct updatedAt column name
  tableName: "review2"  //  Ensure Sequelize maps to correct DB table
});

//  Sync model with DB
await Review.sync();
