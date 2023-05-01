const User = require('./User');
const Comments = require('./Comments');
const Posts = require('./Posts')

Posts.belongsTo(User);

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User);

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(Posts);

Posts.hasMany(Comments, {
    foreignKey: 'comments_id',
    onDelete: 'CASCADE',
});

module.exports = {
    User, 
    Comments, 
    Posts
};



