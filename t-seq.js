const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("zxy", "root", "123456", {
  dialect: "mysql",
});

class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  { sequelize, moduleName: "user" }
);

sequelize
  .sync()
  .then(() =>
    // 创建一条记录
    User.create({
      username: "ccc",
      birthday: new Date(2022, 5, 17),
    })
  )
  .then(() =>
    User.destroy({
      where: {
        id: 4,
      },
    })
  )
  .then((result) => {
    // console.log(result.toJSON());
    User.findAll().then((users) => {
      console.log(JSON.stringify(users));
      sequelize.close();
    });
  });
