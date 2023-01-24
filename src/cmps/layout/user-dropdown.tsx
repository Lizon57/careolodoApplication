import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CgProfile } from "react-icons/cg"
import { withAuthenticator } from '@aws-amplify/ui-react'
import { useOnclickOutside } from "../../hooks/use-onclick-outside"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { signoutUser } from "../../store/actions/user-action"
import { Button } from "../ui/button"
import { flexColumnMixin } from "../../styles/mixins/flex-mixins"
import { takesContainerSizeMixin } from "../../styles/mixins/size-mixins"


function UserDropdown({ signOut }: any) {
    const { loggedUser } = useSelector((state: RootState) => state.userModule)
    const [isOpen, setIsOpen] = useState(false)
    const elDropdown = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const onToggleDropdown = () => setIsOpen(!isOpen)

    useOnclickOutside(elDropdown, () => { setIsOpen(false) })


    const onLogoutUser = async () => {
        try {
            await signOut()
            signoutUser()
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    if (!loggedUser) return <></>
    return (
        <StyledUserDropdown title="User menu">
            <div className="image-container" onClick={onToggleDropdown}>
                <CgProfile />

                <div className={'dropdown-content' + (isOpen ? ' open' : '')} ref={elDropdown}>
                    <h3>Hello {loggedUser.username || 'User'}</h3>
                    <Link to={`/user-todo`} onClick={onToggleDropdown}>My todos</Link>
                    <Button text="Logout" onClick={onLogoutUser} isSecondary />
                </div>
            </div>
        </StyledUserDropdown>
    )
}


const StyledUserDropdown = styled.span`
    position: relative;
    z-index: 10;

    div.image-container {
        cursor: pointer;
        width: 2rem;
        height: 2rem;

        svg {
            border-radius: 50vw;
            background-color: ${({ theme }) => theme.bluePrimary};
            color: ${({ theme }) => theme.whiteLightest};
            ${takesContainerSizeMixin()}
        }
        
        img {
            border-radius: 50vw;
            ${takesContainerSizeMixin()}
        }
    }

    div.dropdown-content {
        ${flexColumnMixin()}
        gap: .5rem;

        position: absolute;
        top: calc(100% + 1rem);
        right: 0;

        box-shadow: rgba(31, 35, 38, 0.2) 0px 4px 24px 0px, rgba(31, 35, 38, 0.12) 0px 1px 1px -1px, rgba(31, 35, 38, 0.14) 0px 1px 2px 0px;
        border-radius: 6px;
        background-color: ${({ theme }) => theme.whiteLightest};
        min-width: 10rem;
        width: max-content;
        height: 0;
        overflow: hidden;
        
        &.open {
            height: max-content;
        }
        
        h3 {
            border-block-end: 1px solid rgba(31, 35, 38, 0.2);
            font-size: ${({ theme }) => theme.fontSizeLargeRem};
            font-family: ${({ theme }) => theme.typographyEmphasis};
            text-align: center;
            padding: ${({ theme }) => theme.spaceBlockxxxSmallRem};
        }
        
        a, button {
            margin: ${({ theme }) => theme.spaceBlockxxxSmallRem};
        }
    }
`


export default withAuthenticator(UserDropdown)