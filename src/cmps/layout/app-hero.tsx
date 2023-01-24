import styled from "styled-components"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Button } from "../ui/button"
import { MainTitle } from "../ui/main-title"
import { flexColumnMixin } from "../../styles/mixins/flex-mixins"
import { positionCenterMixin } from "../../styles/mixins/position-mixins"
import { devicesMinWidth } from "../../styles/media-queries/devices"


export function AppHero() {
    const { loggedUser } = useSelector((state: RootState) => state.userModule)


    return (
        <StyledAppHero>
            <div className="logged-user-hero-container">
                <MainTitle text={`Welcome back ${loggedUser?.username || 'User'}`} />
                <div className="user-message">
                    <p>We are glad and happy to see you again here on Careolodo.</p>
                    <p>Many thing here has been changed at the last days. We now support todo collections. It means you don't need to mess up with only one todo list as the good old days, you can have HOW MANY COLLECTIONS AS YOU WANT.</p>
                    <p>So what are you waiting up for?</p>
                </div>
                <Button text="Create new collection" navigateTo="/collection" />
            </div>
        </StyledAppHero>
    )
}


const StyledAppHero = styled.section`
    div.logged-user-hero-container{
        ${positionCenterMixin()}

        ${flexColumnMixin('1rem')}

        border-radius: 3px;
        box-shadow: rgba(31, 35, 38, 0.2) 0px 4px 24px 0px, rgba(31, 35, 38, 0.12) 0px 1px 1px -1px, rgba(31, 35, 38, 0.14) 0px 1px 2px 0px;
        background-color: white;
        padding: ${({ theme }) => theme.spaceBlockRegularRem};
        line-height: 1.5;
        width: 80%;

        @media ${devicesMinWidth.tablet} {
            gap: ${({ theme }) => theme.spaceBlockxxxLargeRem};
            font-size: ${({ theme }) => theme.fontSizeLargeRem};
            max-width: 30rem;
        }

        h2 {
            text-align: center;
        }

        p {
            margin: 0;
        }

        p:not(:last-of-type) {
            margin: 0 0 1rem;
        }
    }

    /* div:first-of-type:not(.logged-user-hero-container) {
        color: ${({ theme }) => theme.whiteLightest};
    } */
`