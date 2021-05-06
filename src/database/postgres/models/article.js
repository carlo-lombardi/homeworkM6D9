export default (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Article;
};
