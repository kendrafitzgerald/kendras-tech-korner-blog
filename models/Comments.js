const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class Comments extends Model {}

Comments.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            validate: {
                max: 500
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        post_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: 'posts',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
      },
);

module.exports = Comments;
