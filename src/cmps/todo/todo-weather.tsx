import { useState, useEffect } from "react"
import styled from "styled-components"
import { Weather } from "../../models/todo/weather"
import { weatherService } from "../../services/weather-service"
import { flexAlignCenterMixin } from "../../styles/mixins/flex-mixins"


export function TodoWeather({ location }: Props) {
    const [weather, setWeather] = useState<Weather>()
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string>()

    useEffect(() => {
        const fetchData = async () => {
            !isLoading && setIsLoading(true)
            try {
                const weather = await weatherService.get(location) as Weather
                setWeather(weather)
            } catch (err) {
                if (typeof err === 'string') setErrorMessage(err)
                else setErrorMessage('Unknown error occured, please try again.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [location]) // eslint-disable-line react-hooks/exhaustive-deps


    if (!location) return <></>
    if (errorMessage) return <StyledWeatherState>Can't load weather data</StyledWeatherState>
    if (isLoading) return <StyledWeatherState>loading weather data</StyledWeatherState>

    return (
        <StyledTodoWeather title={`There are ${weather?.temp} degrees at ${location} right now`}>
            <span>{weather?.temp}&deg;</span>
            {weather?.icon && <img src={weather.icon} alt="weather icon" />}
        </StyledTodoWeather>
    )
}


const StyledTodoWeather = styled.span`
    grid-column: 3/4;
    grid-row: 3/4;

    ${flexAlignCenterMixin()}
    user-select: none;

    span:first-of-type {
        margin-inline-end: .5rem;
    }

    img {
        height: 1rem;
    }
`

const StyledWeatherState = styled.span`
    grid-column: 3/4;
    grid-row: 3/4;

    color: ${({ theme }) => theme.blackLighter};
    font-size: ${({ theme }) => theme.fontSizexxSmallRem};
    font-family: ${({ theme }) => theme.typographyEmphasis};
`


type Props = {
    location: string
}