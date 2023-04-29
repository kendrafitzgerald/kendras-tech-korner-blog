const router = rquire('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./projectroutes');

router.use('/users', userRoutes);

router.use('/posts', postRoutes);

module.exports = router;