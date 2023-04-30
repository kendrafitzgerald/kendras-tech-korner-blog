const router = require('express').Router();
const {User, Posts, Comments} = require ('../models');
const passwordAuth = require('../utils/passwordAuth');

router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
    })
    const posts = postData.map((posts) => posts.get({plain: true}));

    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
    });
    } catch (error) {
        res.status(500).json(err)
    }
});

router.get('/posts/:id', passwordAuth, async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comments,
                    attributes: ['comment_text']
                }
            ],
        });
        const post = postData.get({plain:true});
        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/dashboard', passwordAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userID, {
            attributes: {exclude: ['password']},
            include: [{model: Posts}],
        });
        const user = userData.get({plain: true});
        res.render('dashboard', {
            ...user, 
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 
    res.render('login');
});

module.exports = router;