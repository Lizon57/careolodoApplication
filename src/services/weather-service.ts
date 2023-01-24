import axios from "axios"


const AXIOS = axios.create()

async function get(location: string) {
    try {
        // For development: uncomment beneath lines to avoid api call
        // if (Math.random() > 0.9) throw new Error('Dev error')
        // return {
        //     temp: 10,
        //     icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
        // }

        const { data } = await AXIOS.get(`http://api.weatherstack.com/current?access_key=d948ebdabb7c3f28fd09c318c7e2f52e&query=${location}`)
        return {
            temp: data.current.temperature,
            icon: data.current.weather_icons[0]
        }
    } catch (err) {
        throw err
    }
}

export const weatherService = {
    get
}