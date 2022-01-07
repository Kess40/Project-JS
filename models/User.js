const { Model, DataTypes } = require("sequelize");
const connection = require("../lib/db");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    isAdmin: DataTypes.BOOLEAN,
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

function encodePassword(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
}

connection.sync().then(() => {
  console.log("Database synced");
});
module.exports = User;