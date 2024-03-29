import styled from "styled-components"
import logoSymbol from "../../assets/images/logo-symbol.svg"
import logo from "../../assets/images/logo.png"
import { flexColumnMixin } from "../../styles/mixins/flex-mixins"
import { appGridMixin } from "../../styles/mixins/grid-mixins"


export function AppFooter() {
    return (
        <StyledAppFooter>
            <div className="content-container" title="All rights reserved to Careolodo">
                <img src={logoSymbol} alt="Careolodo symbol" />
                <img src={logo} alt="Careolodo logo" />
                <span className="rights-reserved">&copy; All rights reserved</span>
            </div>
        </StyledAppFooter>
    )
}


const StyledAppFooter = styled.footer`
    ${appGridMixin()}

    background-color: ${({ theme }) => theme.whiteLighter};
    font-family: ${({ theme }) => theme.typographyEmphasis};
    padding: ${({ theme }) => theme.spaceBlockxxxSmallRem};

    div.content-container {
        grid-column: 2/3;

        ${flexColumnMixin()}
        align-items: center;
        gap: ${({ theme }) => theme.spaceBlockxxxSmallRem};

        img {
            display: block;
            
            max-height: 2rem;
            margin: 0 auto;
        }

        span.rights-reserved {
            user-select: none;
            font-size: ${({ theme }) => theme.fontSizexSmallRem};
        }
    }
`