import styled from "styled-components"
import logoSymbol from "../../assets/images/logo-symbol.svg"
import { positionCenterMixin } from "../../styles/mixins/position-mixins"


export function Loader() {
    return (
        <StyledLoader>
            <img src={logoSymbol} alt="Loader" title="Loading, please wait" />
        </StyledLoader>
    )
}


const StyledLoader = styled.div`
    ${positionCenterMixin()}
    animation: rotate 2s linear infinite;

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        
        to {
            transform: rotate(360deg);
        }
    }
`