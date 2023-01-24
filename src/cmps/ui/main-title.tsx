import styled from "styled-components"
import { devicesMinWidth } from "../../styles/media-queries/devices"
import { capitalFirstLetter } from "../../styles/mixins/text-mixins"


export function MainTitle({ text }: Props) {
    return (
        <StyledH2 title={text}>{text}</StyledH2>
    )
}


const StyledH2 = styled.h2`
    color: ${({ theme }) => theme.bluePrimary};
    font-size: ${({ theme }) => theme.fontSizexxxLargeRem};
    font-family: ${({ theme }) => theme.typographyEmphasis};
    width: 100%;
    
    ${capitalFirstLetter()}
    
    @media ${devicesMinWidth.tablet} {
        font-size: ${({ theme }) => theme.fontSizexxxxLargeRem};
    }
`


type Props = {
    text: string
}