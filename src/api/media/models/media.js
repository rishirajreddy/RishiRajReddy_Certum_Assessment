import { DataTypes } from "sequelize";
// const Format = require('./format')
import sequelize from "../../../../config/database.js";

const Media = sequelize.define("Media", {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  path: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    require: true,
  },
  width: {
    type: DataTypes.STRING,
    require: true,
  },
  height: {
    type: DataTypes.STRING,
    require: true,
  },
  size: {
    type: DataTypes.STRING,
    require: true,
  },
  formats: {
    type: DataTypes.JSONB,
  },
});

Media.sync();
export default Media;
