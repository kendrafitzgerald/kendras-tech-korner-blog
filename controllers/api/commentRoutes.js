const router = require('express').Router();
const {User, Comments, Posts} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const commentData = await Comments.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (error) {
        res.status(400).json(err)
    }
});