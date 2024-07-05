import {connectToDb} from '@/utils/database'
import Prompt from '@/models/prompt';

export const GET = async (req, res) => {
    try{
        await connectToDb()
        const result = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(result), {status:200})
    }catch(err){
        return new Response('Data could not be fetched', {status:500})
    }
}