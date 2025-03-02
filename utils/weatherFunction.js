import axios from 'axios';

export async function getWeatherCondition(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;

    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            const data = response.data;
            const weather_conditions = data.list.slice(0, 7).map(forecast => forecast.weather[0].main.toLowerCase());

            if (weather_conditions.some(cond => ["snow", "storm", "hurricane"].includes(cond))) {
                return "severe_snow";
            } else if (weather_conditions.some(cond => ["rain", "thunderstorm"].includes(cond))) {
                return "mild_delay";
            } else {
                return "normal";
            }
        } else {
            return "normal";
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return "normal";
    }
}