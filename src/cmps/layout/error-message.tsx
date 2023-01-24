import styled from "styled-components"
import { BiSad } from "react-icons/bi"
import { positionCenterMixin } from "../../styles/mixins/position-mixins"
import { flexColumnCenterMixin } from "../../styles/mixins/flex-mixins"


export function ErrorMessage({ error }: Props) {
    return (
        <StyledErrorMessage>
            <BiSad size="40" />
            {error}
        </StyledErrorMessage>
    )
}


const StyledErrorMessage = styled.div`
    ${positionCenterMixin()}
    ${flexColumnCenterMixin('1rem')}
    
    font-size: ${({ theme }) => theme.fontSizeSmallRem};
    font-family: ${({ theme }) => theme.typographyEmphasis};
    text-align: center;
`


type Props = {
    error: string
}