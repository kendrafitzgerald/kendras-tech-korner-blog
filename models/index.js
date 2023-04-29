const User = require('./User');
const Comments = require('./Comments');
const Posts = require('./Posts')

Posts.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(Posts, {
    foreignKey: 'comments_id',
});

Posts.hasMany(Comments, {
    foreignKey: 'comments_id',
    onDelete: 'CASCADE',
});

module.exports = {
    User, 
    Comments, 
    Posts
};



