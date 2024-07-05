import {connectToDb} from '@/utils/database'
import Prompt from '@/models/prompt';

export const GET = async (req, res) => {
    try{
        await connectToDb()
        const prompts = await Prompt.find({}).populate('creator');
        // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        // res.setHeader('Pragma', 'no-cache');
        // res.setHeader('Expires', '0');
        // res.setHeader('Surrogate-Control', 'no-store');
        return new Response(JSON.stringify(prompts), {status:200})
    }catch(err){
        return new Response('Data could not be fetched', {status:500})
    }
}