import { DataTypes } from 'sequelize';
import sequelize from '../db.mjs';

export const UserQuestionMail = sequelize.define(
  'userQuestionMail',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
