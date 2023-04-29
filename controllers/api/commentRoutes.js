const router = require('express').Router();
const {Comments, Posts, User} = require('../../models');
const passwordAuth = require('../../utils/passwordAuth');

router.post('/', passwordAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.userId
            }

        });
        const userID = userData.id

        const postData = await Posts.findOne({
            where: {
                user_id: userID
            }

        });
        const postID = postData.id



        const newComment = await Comments.create({
            comment_text: req.body.comment_text,
            post_id: postID,
            user_id: userID
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.put('/:id', passwordAuth, async (req, res) => {
    try {
        const updatedComment = await Comments.update(
        {
          comment_text: req.body.comment_text
        },
        {
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json(updatedComment);
      } catch (err) {
          res.status(500).json(err);
        };
     });

     router.delete('/:id', passwordAuth, async (req, res) => {
        try {
            const deletedComment = await Comments.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!deletedComment) {
                res.status(400).json({message: 'No comment found with that id!'});
                return;
            }
            res.status(200).json(deletedComment)
        } catch (err) {
            res.status(500).json(err)
        }
    });

    module.exports = router
    