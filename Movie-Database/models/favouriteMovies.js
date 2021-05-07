module.exports = (sequelize, DataTypes) => {

  var Favourite_movies = sequelize.define("favourite_movies", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      },
    },
  });

  Favourite_movies.associate = models => {
    Favourite_movies.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Favourite_movies
}
