import { CLIENT_RENEG_WINDOW } from "tls";
import Like from "../../../../models/like";

export const GET = async ({ req, params }) => {
    try {
        await connectToDb();

        const url = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = new URLSearchParams(url.search);
        const userID = searchParams.get('userID');
        const postID = params.id;

        // Ensure both userID and postID are provided
        if (!userID || !postID) {
            return new Response("userID and postID are required", { status: 400 });
        }

        // Search for the like document
        const like = await Like.findOne({ client: userID, post: postID });

        if (!like) {
            return new Response("Like not found", { status: 404 });
        }

        return new Response(JSON.stringify(like), { status: 200 });
    } catch (err) {
        return new Response('Data could not be fetched: ' + err.message, { status: 500 });
    }
};

export const POST = async ({ req, params }) => {
    try {
        await connectToDb();

        const url = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = new URLSearchParams(url.search);
        const userID = searchParams.get('userID');
        const postID = params.id;

        // Ensure both userID and postID are provided
        if (!userID || !postID) {
            return new Response("userID and postID are required", { status: 400 });
        }

        // Check if the Like document exists
        const existingLike = await Like.findOne({ client: userID, post: postID });

        if (existingLike) {
            // If it exists, toggle the 'liked' field
            existingLike.liked = !existingLike.liked;
            await existingLike.save();
            return new Response(JSON.stringify(existingLike), { status: 200 });
        } else {
            // If it doesn't exist, create a new Like document
            const newLike = new Like({
                client: userID,
                post: postID,
                liked: true,
            });
            await newLike.save();
            return new Response(JSON.stringify(newLike), { status: 201 });
        }
    } catch (err) {
        return new Response('Data could not be modified: ' + err.message, { status: 500 });
    }
};