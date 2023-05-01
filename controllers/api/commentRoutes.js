// require router, models, and password authorization 

const router = require('express').Router();
const {Comments, Posts, User} = require('../../models');
const passwordAuth = require('../../utils/passwordAuth');

//creates a single comment by finding user id, post id, and creating a new comment with his ids
router.post('/:id', passwordAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.id
            }

        });
        const userID = userData.id

        const postData = await Posts.findOne({
            where: {
                id: req.params.id
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
// //update a comment by searching by accessing a single id and updating the comment 
// router.put('/:id', passwordAuth, async (req, res) => {
//     try {
//         const updatedComment = await Comments.update(
//         {
//           comment_text: req.body.comment_text
//         },
//         {
//           where: {
//             id: req.params.id,
//           },
//         });
//         res.status(200).json(updatedComment);
//       } catch (err) {
//           res.status(500).json(err);
//         };
//      });

//      //delete a comment by id 
//      router.delete('/:id', passwordAuth, async (req, res) => {
//         try {
//             const deletedComment = await Comments.destroy({
//                 where: {
//                     id: req.params.id,
//                 },
//             });
//             if (!deletedComment) {
//                 res.status(400).json({message: 'No comment found with that id!'});
//                 return;
//             }
//             res.status(200).json(deletedComment)
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     });

    module.exports = router
    