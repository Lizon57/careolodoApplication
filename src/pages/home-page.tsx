import styled from "styled-components"
import downWave from "../assets/images/down-wave.svg"
import { AppHero } from "../cmps/layout/app-hero"


export function HomePage() {
    return (
        <StyledHomePage>
            <AppHero />
        </StyledHomePage>
    )
}

const StyledHomePage = styled.main`
    grid-column: 2/3;
    background-image: url(${downWave});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${({ theme }) => theme.whiteLighter};
    height: 100%;
`