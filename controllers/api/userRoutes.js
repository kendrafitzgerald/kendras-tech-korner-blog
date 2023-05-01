//requires router and user model
const router = require('express').Router();
const {User} = require('../../models');

//creates a new user and saves the user in the session as logged in
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err)
    }
});
//finds a user by their email and checks if their password is correct, allows them to log in if credentials aer correct
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
            req.session.userId = userData.id;
            req.session.loggedIn = true
            res.json({user: userData, message: 'You are logged in!'})
        })
    } catch (err) {
        res.status(400).json(err);
    }
});
//destroys their session if they click the logout button
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