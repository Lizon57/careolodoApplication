import { Link, NavLink } from "react-router-dom"
import styled from "styled-components"
// import { useSelector } from "react-redux"
// import { RootState } from "../../store/store"
import logo from "../../assets/images/logo.png"
import logoSymbol from "../../assets/images/logo-symbol.svg"
import upWave from "../../assets/images/up-wave.svg"
// import { UserDropdown } from "./user-dropdown"
import { Button } from "../ui/button"
import { flexAlignCenterMixin } from "../../styles/mixins/flex-mixins"
import { devicesMinWidth } from "../../styles/media-queries/devices"


export function AppHeader() {
    // const { loggedUser } = useSelector((state: RootState) => state.userModule)


    return (
        <StyledAppHeader>
            <Link to="./" title="Careolodo (homepage link)">
                <img src={logo} className="logo" alt="Careolodo logo" />
                <img src={logoSymbol} className="logo-symbol" alt="Careolodo symbol" />
                <span className="app-description">Todo app</span>
            </Link>

            <div className="nav-links">
                <NavLink to="./" title="Homepage">Home</NavLink>

                <>
                    <Button text="Collections" navigateTo={`user-collections`} />
                </>
                {/* {loggedUser
                    ? <>
                        <UserDropdown user={loggedUser} />
                    </>
                    : <>
                        <NavLink to="signup" title="Signup to Careolodo">Signup</NavLink>
                        <Button text="Login" navigateTo="login" />
                    </>} */}
                <Button text="Login / Signup" navigateTo="login-signup" />
            </div>
        </StyledAppHeader>
    )
}

const StyledAppHeader = styled.nav`
    grid-column: 2/3;

    ${flexAlignCenterMixin()}
    justify-content: space-between;

    padding-block: 1rem;

    img.logo {
        height: 1rem;
        margin-inline-end: 1rem;
        
        @media ${devicesMinWidth.mobile} {
            height: 1.5rem;
        }
    }

    img.logo-symbol{
        display: none;
        
        @media ${devicesMinWidth.tablet} {
            display: inline;
        }
    }
    
    span.app-description {
        display: block;

        color: #193159;
        font-size: 12px;
        font-family: roboto;
    }
    
    div.nav-links{
        ${flexAlignCenterMixin('10px')}
        
        @media ${devicesMinWidth.tablet} {
            ${flexAlignCenterMixin('20px')}
        }
        
        a {
            position: relative;
            
            opacity: .6;
            color: #193159;
            font-family: roboto;
            font-weight: bold;
            transition: all ease-in-out .3s;
            
            &:hover {
                opacity: 1;
            }
            
            &.active {
                opacity: 1;
                color: #6236e8;
                
                &:after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: -1rem;
                    
                    background: url(${upWave});
                    border-radius: 2px;
                    margin-inline-start: -.75rem;
                    width: 1.5rem;
                    height: 12px;
                }
            }

            &:not(.active) {
                color: #1b335b;
            }
        }
    }
`