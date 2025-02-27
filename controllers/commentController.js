// import Comment from '../model/Comment.js';

// // Add a comment to a remedy
// const addComment = async (req, res) => {
//   const { remedyId, text } = req.body;
//   const userId = req.user.id; // Assuming you have authentication middleware

//   try {
//     const comment = await Comment.create({
//       text,
//       remedyId,
//       userId,
//     });
//     res.status(201).json({ message: 'Comment added successfully!', comment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// const getComments = async (req, res) => {
  
//     try {
//     const { remedyId } = req.params;
//       const comments = await Comment.findAll({ where: { remedyId } });
//       res.status(200).json(comments);
//     } catch (error) {
//       res.status(500).json({message:'Failed to fetch comments', error});
//     }
//   };

// export default { addComment,getComments };