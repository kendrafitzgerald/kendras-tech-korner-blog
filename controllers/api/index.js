//requires router and each routes js

const router = require('express').Router();
const userRoutes = require('../api/userRoutes');
const postRoutes = require('../api/postRoutes');
const commentRoutes = require('../api/commentRoutes')

//path to user api
router.use('/users', userRoutes);
//path to posts api
router.use('/posts', postRoutes);
//path to comments api 
router.use('/comments', commentRoutes)

module.exports = router;