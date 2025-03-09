// import { Model, DataTypes } from "sequelize";
// import sequelize from "../config/db";
// import { Submission } from "./submission";

// export class SubmissionFiles extends Model {
//   public id!: number;
//   public submissionId!: number;
//   public resourcesLink!: string;
//   public createdAt!: Date;
//   public updatedAt!: Date;
// }

// SubmissionFiles.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     submissionId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     resourcesLink: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: "submissionfiles",
//     timestamps: true,
//   }
// );

// SubmissionFiles.belongsTo(Submission, {
//   foreignKey: "submissionId",
//   as: "submission",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
