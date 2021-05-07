const bcrypt = require("bcrypt");
var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return User = sequelize.define("User", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          },
        },
      },
        {
          instanceMethods: {
            generateHash(password) {
              return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
              return bcrypt.compare(password, this.password);
            }
          }
        });


    }
