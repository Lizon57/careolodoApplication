import { Link, NavLink } from "react-router-dom"
import styled from "styled-components"
import logo from "../../assets/images/logo.png"
import logoSymbol from "../../assets/images/logo-symbol.svg"
import upWave from "../../assets/images/up-wave.svg"
import { Button } from "../ui/button"
import UserDropdown from "./user-dropdown"
import { flexAlignCenterMixin } from "../../styles/mixins/flex-mixins"
import { devicesMinWidth } from "../../styles/media-queries/devices"
import { transitionRegular } from "../../styles/mixins/transition-mixins"


export function AppHeader() {
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
                    <UserDropdown />
                </>
            </div>
        </StyledAppHeader>
    )
}

const StyledAppHeader = styled.nav`
    grid-column: 2/3;

    ${flexAlignCenterMixin()}
    justify-content: space-between;

    padding-block: ${({ theme }) => theme.spaceBlockRegularRem};

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

        color: ${({ theme }) => theme.blueDarker};
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
            color: ${({ theme }) => theme.bluePrimary};
            font-family: ${({ theme }) => theme.typographyEmphasis};
            font-weight: bold;
            ${transitionRegular()}
            
            &:hover {
                opacity: 1;
            }
            
            &.active {
                opacity: 1;
                color: ${({ theme }) => theme.purplePrimary};
                
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
                color: ${({ theme }) => theme.bluePrimary};
            }
        }
    }
`