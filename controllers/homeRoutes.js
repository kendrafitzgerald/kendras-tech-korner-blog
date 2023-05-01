const router = require('express').Router();
const {User, Posts, Comments} = require ('../models');
const passwordAuth = require('../utils/passwordAuth');

// get all posts, include the username of who created the post
router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
    })
    const posts = postData.map((posts) => posts.get({plain: true}));
    //render these on the homepage
    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
    });
    } catch (error) {
        res.status(500).json(err)
    }
});

//get a single post, need to be logged in to view
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
                    attributes: ['comment_text'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });
        //render on the posts page
        const post = postData.get({plain:true});
        res.render('posts', {
            ...post,
            loggedIn: req.session.loggedIn,
        })
    } catch (err) {
        res.status(500).json(err)
    }
});
//access the user's dashboard, include their posts
router.get('/dashboard', passwordAuth, async (req, res) => {
    try {
        console.log('i got here')
        const userData = await User.findByPk(req.session.userId, {
            include: [{model: Posts}],
        });
        const user = userData.get({plain: true});
        res.render('dashboard', {
            ...user, 
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//if user is logged in, redirect them to their dashboard
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 
    res.render('login');
});

module.exports = router;