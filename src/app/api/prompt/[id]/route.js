import {connectToDb} from '@/utils/database'
import Prompt from '@/models/prompt';

export const GET = async (req, {params}) => {
    try{
        await connectToDb()
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found", {status:404})
        return new Response(JSON.stringify(prompt), {status:200})
    }catch(err){
        return new Response('Data could not be fetched', {status:500})
    }
}

export const PATCH = async (request, {params}) =>{
    const {prompt, tag} = await request.json();
    try{
        await connectToDb()
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response("Prompt not found", {status:404})
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt),{status:200})
    }catch(err){
        return new Response('Data could not be fetched', {status:500})      
    }
}

export const DELETE = async(request, {params}) => {
    try{
        console.log("PARAMS", params)
        await connectToDb()
        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt Deleted", {status: 200})
    }catch(err){
        return new Response('Data could not be fetched', {status:500}) 
    }
}