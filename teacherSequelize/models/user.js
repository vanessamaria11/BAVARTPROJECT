module.exports = function(sequelize, Datatypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    firstName: Datatypes.STRING,
    lastName: Datatypes.STRING,
    userName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    login: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
    },
    token: Datatypes.STRING

  },
  {
    // prevents pluralization of the table and prevents 'createdAt' and 'updatedAt' columns.
    freezeTableName: true,
    timestamps: false
  }

    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    // {
    //   // We're saying that we want our User to have Posts
    //   classMethods: {
    //     associate: function(models) {
    //       // Associating User with Posts
    //       // When an User is deleted, also delete any associated Posts
    //       User.hasMany(models.Post, {
    //         onDelete: "cascade"
    //       });
    //     }
    //   }
    // }
  );
  return User;
};