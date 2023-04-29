const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection')

class Posts extends Model {}

Posts.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
       title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        comments_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comments',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
      },
);

module.exports = Posts;