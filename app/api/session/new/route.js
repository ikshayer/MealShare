import { connectToDB } from '@utils/database'
import mealRequest from '@models/mealRequestSchema'

export const POST = async (req, res) =>{
    const  {userId, food, requirement, foodObtained} = await req.json()
    try{
        await connectToDB()

        const sessionCreate = await mealRequest.create({
            creator: userId,
            food: food,
            requirement: requirement,
            foodObtained: foodObtained,
        })
        await sessionCreate.save()
        return new Response(
            JSON.stringify(sessionCreate), 
            {status: 201}
        )
        
    }
    catch(error){
        return new Response('Failed to create a new study session', {status: 500})
    }
}