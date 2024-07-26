import {connectToDb} from '@/utils/database'
import Prompt from '@/models/prompt';


export const GET = async (req, {url}) => {
    try {
        await connectToDb();
        // Parse search parameters from the request URL
        const url = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = new URLSearchParams(url.search);
        const keyword = searchParams.get('keyword');
        let query = {};

        // If keyword exists, is not null, and is not an empty string, add prompt and tag filtering
        if (keyword !== null && keyword.trim() !== "") {
            query = {
                $and: [
                    {
                        $or: [
                            { prompt: { $regex: keyword, $options: 'i' } },
                            { tag: { $regex: keyword, $options: 'i' } },
                        ]
                    }
                ]
            };
        }
        
        const prompt = await Prompt.find(query).populate('creator');
      
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (err) {
        return new Response('Data could not be fetched', { status: 500 });
    }
}