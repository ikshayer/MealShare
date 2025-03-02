import { connectToDB } from "@utils/database";
import mealRequest from '@models/mealRequestSchema'

export const GET = async (request) =>{
    try{
        await connectToDB()
        const event = await mealRequest.find({}).populate(['creator'])

        return new Response(JSON.stringify(event), {status: 200})
    }
    catch(error){
        return new Response("Failed to fetch all events", {status: 500})
    }

}