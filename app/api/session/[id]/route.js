import { connectToDB } from "@utils/database";
import mealRequest from '@models/mealRequestSchema'

export const GET = async (request, {params}) =>{
    try{
        await connectToDB()
        const session = await mealRequest.findById(params.id).populate('creator')

        if(!session) return new Response("Could not find the post", {status: 404})

        return new Response(JSON.stringify(session), {status: 200})
    }
    catch(error){
        return new Response("Failed to fetch prompt", {status: 500})
    }

}
/*
export const PATCH = async (request, {params}) =>{

    const  {location, zoomLink, date, time, description, tags } = await req.json()

    try{
        await connectToDB()
        const sessionToEdit = await sessionModels.findById(params.id)

        if(!sessionToEdit) return new Response("Could not find the post", {status: 404})

        if(location){

            sessionToEdit.location = location
            sessionToEdit.date = date
            sessionToEdit.time = time
            sessionToEdit.description = description
            sessionToEdit.tags = tags

            await sessionToEdit.save()
        }
        
        if(zoomLink){
            sessionToEdit.zoomLink = zoomLink
            sessionToEdit.date = date
            sessionToEdit.time = time
            sessionToEdit.description = description
            sessionToEdit.tags = tags

            await sessionToEdit.save()
        }
        
        return new Response('Successfully updated the prompt', {status: 200})
    }
    catch(err){
        return new Response(`Error in editing the post ${err}`, {status: 500})
    }
}
    
*/

export const DELETE = async (request, {params}) => {
    try{
        await connectToDB()
        await sessionModels.findByIdAndDelete(params.id)

        return new Response('Successfully deleted the event', {status: 200})
    }
    catch(err){
        return new Response('Failed to delete event', {status: 500})
    }
}