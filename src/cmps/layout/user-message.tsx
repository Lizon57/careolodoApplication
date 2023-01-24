import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { UserMessage as UserMessageType } from '../../models/user-message'
import { eventBus } from '../../services/event-bus-service'

export function UserMessage() {
    const [message, setMessage] = useState<UserMessageType>()
    const timeoutIdRef = useRef<any>()


    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', (message: UserMessageType) => {
            setMessage(message)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(clearMessage, 3000)
        })
        return unsubscribe
    }, [])


    function clearMessage() {
        setMessage({ text: '', type: '' })
    }


    if (!message?.text) return <></>
    return (
        <StyledUserMessage className={`user-msg ${message.type}`}>
            {message.text}
        </StyledUserMessage>
    )
}


const StyledUserMessage = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.spaceBlockxxxxLargeRem};
    
    color: ${({ theme }) => theme.whiteLightest};
    font-family: ${({ theme }) => theme.typographyEmphasis};
    padding: ${({ theme }) => theme.spaceBlockxxxSmallRem} ${({ theme }) => theme.spaceInlineSmallRem};

    &.success {
        background-color: ${({ theme }) => theme.greenPrimary};
    }

    &.error {
        background-color: ${({ theme }) => theme.redPrimary};
    }
`