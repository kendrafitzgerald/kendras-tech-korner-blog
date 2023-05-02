//requires router, posts model, and passworth auth
const router = require('express').Router();
const {Posts} = require('../../models');
const passwordAuth = require('../../utils/passwordAuth');

//creates a new post body and adds user id?
router.post('/', passwordAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err)
    }
});
//updates a post by searching for id 
router.put('/:id', passwordAuth, async (req, res) => {
    try {
        const updatedPost = await Posts.update(
        {
          title: req.body.title,
          post_text: req.body.post_text
        },
        {
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json(updatedPost);
      } catch (err) {
          res.status(500).json(err);
        };
     });

router.delete('/:id', passwordAuth, async (req, res) => {
    try {
        const deletedPost = await Posts.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedPost) {
            res.status(400).json({message: 'No post found with that id!'});
            return;
        }
        res.status(200).json(deletedPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;