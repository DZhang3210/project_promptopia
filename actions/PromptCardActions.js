'use server'
import {connectToDb} from '@/utils/database'
import Like from '@/models/likeEvent'

export const getLikeStatus = async (userID, postID) => {
    if(!userID || !postID){
        return false
    }
    try {
        await connectToDb();
        const likeResult = await Like.findOne({ client: userID, post: postID });
        if(!likeResult){
            //console.log("Couldn't find any")
            return false
        }else{
            //console.log("results", likeResult)
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
        //console.log("existingLike", existingLike)

        if (existingLike !== null) {
            //console.log("Im Going INSIDE")
            // If it exists, toggle the 'liked' field
            existingLike.liked = !existingLike.liked;
            await existingLike.save();
            return true
        } else {
            // console.log("Hello", userID)
            // If it doesn't exist, create a new Like document
            const newLike = new Like({
                creator: userID,
                post: postID,
                liked: true,
            });
            // console.log("Hi", newLike)
            await newLike.save();
            // console.log("Finished operation")
            return true
        }
    } catch (err) {
        return false
    }

}