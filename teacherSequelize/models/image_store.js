module.exports = function(sequelize, Datatypes) {
    var Image_Store = sequelize.define('image_price', {
        image_id: {
            type: Datatypes.INTEGER
        },
        image_type: {
            type: Datatypes.STRING,
            allowNull: false
        },
        image: {
            type: Datatypes.BLOB('long')
        },
        image_size: {
            type: Datatypes.INTEGER
        },
        image_name: {
            type: Datatypes.STRING
        },
        bidPrice: {
        	type: Datatypes.INTEGER
        }
    },
        {
		    // prevents pluralization of the table and prevents 'createdAt' and 'updatedAt' columns.
		    freezeTableName: true,
		    timestamps: false
			  })

 //    );
    return Image_Store;
 }