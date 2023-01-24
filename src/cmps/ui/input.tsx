import styled from "styled-components"
import { transitionRegular } from "../../styles/mixins/transition-mixins"

export function Input({ type, id, name, placeholder, value, isRequired, reactRef, onChange }: Props) {
    const basicProps = { type, id, name, placeholder, value, required: isRequired, ref: reactRef, onChange }

    return (
        <StyledInput {...basicProps} title={placeholder} />
    )
}


const StyledInput = styled.input`
    outline: 0;
    border: 1px solid ${({ theme }) => theme.bluePrimary};
    border-radius: 3px;
    background-color: ${({ theme }) => theme.whitePrimary};
    color: ${({ theme }) => theme.bluePrimary};
    font-size: ${({ theme }) => theme.fontSizeSmallRem};
    font-family: ${({ theme }) => theme.typographyEmphasis};
    padding: ${({ theme }) => theme.spaceBlockRegularRem};
    width: 20rem;
    ${transitionRegular()}
    
    &:hover, &:focus-within {
        border-color: ${({ theme }) => theme.purplePrimary};
    }
`


type Props = {
    type: string
    id?: string
    name?: string
    placeholder: string
    value?: string
    isRequired?: boolean
    reactRef?: React.RefObject<HTMLInputElement>
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void
}