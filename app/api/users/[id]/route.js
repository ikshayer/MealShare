import User from "@models/userSchema"
import mealRequest from "@models/mealRequestSchema"
import {connectToDB} from "@utils/database"

export const GET = async(request, {params}) => {

    try{
        await connectToDB()
        const user = await User.findById(params.id).populate({
            path: 'requestsList',
            populate: {
                path: 'creator'
            }
        })

        if(!user) return new Response("Could not find the user", {status: 404})

        return new Response(JSON.stringify(user), {status: 200})
    }
    catch(error){
        return new Response("Failed to fetch meal", {status: 500})
    }

}

export const PATCH = async(request, {params}) => {

    const {username, location, numOfStudents} = await request.json()

    try {
        await connectToDB()
        const user = await User.findById(params.id)
        if(!user) return new Response("Could not find the user", {status: 404})

        user.username ? user.username = username : null;
        user.location ? user.location = location : null;
        user.numOfStudents ? user.numOfStudents = numOfStudents : null;
        
        await user.save()

        return new Response("Successfully updated the User.", {status:200})

    }
    catch(err){
        return new Response(`Failed to update User. ${err}`, {status: 500})
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB()
        
        await mealRequest.deleteMany({
            creator: params.id
        })
        await User.findByIdAndDelete(params.id)
        
        return new Response('Successfully deleted the User', {status: 200})
    }
    catch(err){
        return new Response('Could not delete the User', {status: 500})
    }
}