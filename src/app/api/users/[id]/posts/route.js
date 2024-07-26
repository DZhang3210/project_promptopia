import {connectToDb} from '@/utils/database'
import Prompt from '@/models/prompt';

export const GET = async (req, {params}) => {
    try{
        await connectToDb()
        const userID = params.id
        const url = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = new URLSearchParams(url.search);
        const keyword = searchParams.get('keyword');
        console.log(keyword)
        let query = {creator: userID};
        if (keyword !== null && keyword.trim() !== "") {
            query = {
                creator: userID,
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

        const prompts = await Prompt.find(query).populate('creator');

        return new Response(JSON.stringify(prompts), {status:200})
    }catch(err){
        return new Response('Data could not be fetched', {status:500})
    }
}