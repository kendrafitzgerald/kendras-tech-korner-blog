const router = require('express').Router();
const {Posts} = require('../../models');
const passwordAuth = require('../../utils/passwordAuth');

router.post('/', passwordAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(err)
    }
});

router.delete('/:id', passwordAuth, async (req, res) => {
    try {
        const deletedPost = await Posts.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
                commentsId: req.session.commentsId
            },
        });
        if (!deletedPost) {
            res.status(400).json({message: 'No post found with that id!'});
            return;
        }
        res.status(200).json(deletedPost)
    } catch (error) {
        res.status(500).json(err)
    }
});

module.exports = router;