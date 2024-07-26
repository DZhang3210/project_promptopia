'use server';
import { connectToDb } from '@/utils/database';
import Like from '@/models/likeEvent';
import Prompt from '@/models/prompt';

export const GetLikedPosts = async (userID, keyword) => {
  try {
    console.log("Hello")
    await connectToDb();
    console.log(userID)
    // Step 2: Find all Likes by the user where liked is true
    const likes = await Like.find({ creator: userID, liked: true }).select('post');
    console.log("LIKES", likes);
    const postIDs = likes.map(like => like.post);
    console.log("postIDs", postIDs);
    console.log('keyword', keyword)
    // Return an empty array if no liked posts are found
    if (postIDs.length === 0) {
      return [];
    }

    // Step 4: Construct the query for posts
    let query = { _id: { $in: postIDs } };

    if (keyword && keyword.trim() !== "") {
      query = {
        $and: [
          { _id: { $in: postIDs } },
          {
            $or: [
              { prompt: { $regex: keyword, $options: 'i' } },
              { tag: { $regex: keyword, $options: 'i' } }
            ]
          }
        ]
      };
    }

    // Step 4: Search for posts
    const posts = await Prompt.find(query).populate('creator').lean()
    console.log('posts', posts)

    // return posts;
    return posts
  } catch (err) {
    console.error('Error fetching liked posts:', err);
    throw new Error('Error fetching liked posts');
  }
};
