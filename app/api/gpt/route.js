import { connectToDB } from "@utils/database";
import User from "@models/userSchema";
import { Configuration, OpenAIApi } from 'openai';
import { getWeatherCondition } from '@utils/weatherFunction';

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

export default async function handler(req, res) {


    if (req.method === 'POST') {

        const {user_id} = await req.json();

        try{
            connectToDB();
            const user_data = await User.findById(user_id);

            if (!user_data) {
                return res.status(404).json({ error: 'User data not found' });
            }

            const num_children = user_data.numOfStudents;

            const weather_condition = await getWeatherCondition(latitude, longitude);

            const prompt = `
            Given that ${num_children} children need nutritionally balanced meals, calculate the total combined mass needed per food group.
            Each child should receive appropriate portions of grains, fruits, vegetables, protein, and dairy based on standard dietary guidelines.
            The food should be enough for a week.
            Take into account the weather condition: ${weather_condition}. If there is severe snow, increase portions for a buffer. If there is mild delay due to rain, adjust slightly.
            Provide output in JSON format with 'grains', 'fruits', 'vegetables', 'protein', and 'dairy' as keys and mass in pounds as values.
            Ensure the output is a valid JSON object.
            `;

            const response = await openai.createChatCompletion({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a nutrition expert.' },
                    { role: 'user', content: prompt },
                ],
            });

            const gpt_output = response.data.choices[0].message.content;

            let food_requirements;
            try {
                food_requirements = JSON.parse(gpt_output);
            } catch (error) {
                return new Response('Invalid JSON output from GPT' , {status: 500});
            }

            return new Response(JSON.stringify(food_requirements), {status: 200});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Invalid request method' });
    }
}