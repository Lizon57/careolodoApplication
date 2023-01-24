import { useNavigate } from "react-router"
import styled from "styled-components"
import { devicesMinWidth } from "../../styles/media-queries/devices"


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
    border: 1px solid #1b335b;
    border-radius: 6px;
    background-color: ${props => props.isSecondary ? 'transparent' : '#1b335b'};
    color: ${props => props.isSecondary ? '#1b335b' : '#fafafa'};
    font-size: 15px;
    font-weight: bold;
    padding: 5px 12px;
    transition: all ease-in-out .3s;
    
    @media ${devicesMinWidth.tablet} {
        padding: 5px 24px;
        line-height: 1.6;
        letter-spacing: .5px;
    }
    
    &:hover {
        background-color: ${props => props.isSecondary ? '#eef1f3' : '#12213b'};
    }
`


type Props = {
    text: string
    isSecondary?: boolean
    navigateTo?: string
    onClick?: () => void
}