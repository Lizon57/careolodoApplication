import { useNavigate } from "react-router"
import styled from "styled-components"
import { devicesMinWidth } from "../../styles/media-queries/devices"
import { transitionRegular } from "../../styles/mixins/transition-mixins"


export function Button({ text, isSecondary, navigateTo, onClick }: Props) {
    const navigate = useNavigate()

    const handleOnClick = () => {
        onClick && onClick()
        navigateTo && navigate(navigateTo)
    }

    return (
        <StyledButton title={text} isSecondary={isSecondary} onClick={handleOnClick}>
            {text}
        </StyledButton>
    )
}


const StyledButton = styled.button.attrs((props: { isSecondary: boolean }) => props)`
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.bluePrimary};
    border-radius: 6px;
    background-color: ${({ theme, isSecondary }) => isSecondary ? 'transparent' : theme.bluePrimary};
    color: ${({ theme, isSecondary }) => isSecondary ? theme.bluePrimary : theme.whiteLightest};
    font-size: ${({ theme }) => theme.fontSizeSmallRem};
    font-weight: bold;
    padding: 5px 12px;
    ${transitionRegular()}
    
    @media ${devicesMinWidth.tablet} {
        padding: 5px 24px;
        line-height: 1.6;
        letter-spacing: .5px;
    }
    
    &:hover {
        background-color: ${({ theme, isSecondary }) => isSecondary ? theme.whiteLighter : theme.blueDarker};
    }
`


type Props = {
    text: string
    isSecondary?: boolean
    navigateTo?: string
    onClick?: () => void
}