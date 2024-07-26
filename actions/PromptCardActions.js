'use server'
import {connectToDb} from '@/utils/database'
import Like from '@/models/likeEvent'

export const getLikeStatus = async (userID, postID) => {
    try {
        await connectToDb();
        const likeResult = await Like.findOne({ client: userID, post: postID });
        if(!likeResult){
            console.log("Couldn't find any")
            return false
        }else{
            console.log("results", likeResult)
            return likeResult.liked
        }
    }
    catch(err){
        return false
    }
}

export const handleLikeButton = async(userID, postID)=>{
    try {
        await connectToDb();
        // Ensure both userID and postID are provided
        if (!userID || !postID) {
            return false
        }

        // Check if the Like document exists
        const existingLike = await Like.findOne({ client: userID, post: postID });

        if (existingLike) {
            // If it exists, toggle the 'liked' field
            existingLike.liked = !existingLike.liked;
            await existingLike.save();
            return true
        } else {
            // If it doesn't exist, create a new Like document
            const newLike = new Like({
                client: userID,
                post: postID,
                liked: true,
            });
            await newLike.save();
            return true
        }
    } catch (err) {
        return false
    }

}