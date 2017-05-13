module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define("image", {
        name:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [1]
            }
        }, type:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [5]
            }
        }, extension:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [1]
            }
        }, data:{
            type: DataTypes.STRING,
            validate:{
                len: [1]
            }
        }, bidprice:{
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate:{
            len: [1]
            }
        }
    },
        {
      classMethods:
      {
        associate: function(models)
        {
          // Creates one-to-one association with `Customer` table.
          Image.belongsTo(models.User);
        }
      }, 
          freezeTableName: true,   //  prevents sequilize from making table name plural.
          timestamps: false  
     }

    )

//    );
    return Image;
 }