import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export class BlacklistedToken extends Model {
  public id!: number;
  public token!: string;
  public blacklistedAt!: Date;
  public expiresAt!: Date;
}

BlacklistedToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blacklistedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "blacklistedToken",
    timestamps: false,
  }
);

export default BlacklistedToken;
