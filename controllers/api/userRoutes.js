const router = require('express').Router();
const User = require('../../models/User');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (error) {
        res.status(400).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});

        if (!userData) {
            res.status(400).json({message: 'Incorrect email or password, please try again'});
            return;
        }
        const correctPassword = await userData.checkPassword(req.body.password);
        if (!correctPassword) {
            res.status(400).json({message: 'Incorrect email or password, please try again'});
            return;
        }
        req.session.save(() => {
            req.session.userId = userData.isNewRecord;
            req.session.loggedIn = true
            res.json({user: userData, message: 'You are logged in!'})
        })
    } catch (error) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});

module.exports = router;