import { FormEvent, useEffect, useState, useRef } from "react"
import { withAuthenticator } from '@aws-amplify/ui-react'
import styled from "styled-components"
import { FiSquare, FiCheckSquare } from "react-icons/fi"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Todo } from "../../models/todo/todo"
import { todoService } from "../../services/todo-service"
import { showUserMsg } from "../../services/event-bus-service"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { flexAlignCenterMixin, flexColumnMixin } from "../../styles/mixins/flex-mixins"
import { devicesMinWidth } from "../../styles/media-queries/devices"


function TodoAdd({ onTodoAdd }: Props) {
    const { loggedUser } = useSelector((state: RootState) => state.userModule)
    const [todo, setTodo] = useState(todoService.getEmptyTodo())
    const elTodoText = useRef<HTMLInputElement>(null)

    useEffect(() => {
        loggedUser && setTodo(prevTodo => ({ ...prevTodo, byUserId: loggedUser.id }))
    }, [loggedUser])

    useEffect(() => {
        elTodoText.current?.focus()
    }, [])


    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const key = ev.target.name
        const value = ev.target.value
        setTodo(prevTodo => ({ ...prevTodo, [key]: value }))
    }

    const onToggleIsDone = () => {
        setTodo(prevTodo => ({ ...prevTodo, isDone: !todo.isDone }))
    }

    const onClearTodo = () => {
        const emptyTodo = todoService.getEmptyTodo()
        setTodo({ ...emptyTodo, byUserId: loggedUser.id })
        elTodoText.current?.focus()
    }


    const onAddTodo = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        try {
            const newTodo = await todoService.add(todo) as Todo
            onTodoAdd(newTodo)
            onClearTodo()
            showUserMsg({ text: 'Todo added successfully', type: 'success' })
            elTodoText.current?.focus()
        } catch (err) {
            showUserMsg({ text: 'Todo add fail, please try again', type: 'error' })
        }
    }


    return (
        <StyledTodoAdd>
            <form onSubmit={onAddTodo}>
                <span onClick={onToggleIsDone} className="todo-state-indicator">
                    {todo.isDone
                        ? <FiCheckSquare size={20} title="Complete todo" />
                        : <FiSquare size={20} title="Yet to complete todo" />
                    }
                    <span className="indicator">(Add as {todo.isDone ? 'done' : 'not done'} todo)</span>
                </span>

                <div className="todo-data-container">
                    <Input type="text" name="text" placeholder="What needs to be done?" value={todo.text} onChange={handleInputChange} isRequired />
                    <Input type="text" name="location" placeholder="Specific location for todo" value={todo.location} onChange={handleInputChange} />
                </div>

                <Button text="Add todo" />
                <Button text="Clear" isSecondary onClick={onClearTodo} />
            </form>
        </StyledTodoAdd>
    )
}


const StyledTodoAdd = styled.div`
    form {
        ${flexColumnMixin('0.5rem')}

        @media ${devicesMinWidth.tablet} {
            flex-direction: row;

            ${flexAlignCenterMixin('1rem')}
        }

        input {
            width: 100%;
        }
    }

    span.todo-state-indicator {
        ${flexAlignCenterMixin('0.5rem')}
        color: ${({ theme }) => theme.blackPrimary};
        font-size: ${({ theme }) => theme.fontSizexSmallRem};
        font-family: ${({ theme }) => theme.typographyEmphasis};

        span.indicator {
            @media ${devicesMinWidth.tablet} {
                display: none;
            }
        }
    }
    
    div.todo-data-container {
        ${flexColumnMixin('0.5rem')}
        
        flex-grow: 1;
        
        @media ${devicesMinWidth.tablet} {
            flex-direction: row;
            ${flexAlignCenterMixin('1rem')}
        }
    }
`


export default withAuthenticator(TodoAdd)


type Props = {
    onTodoAdd: (todo: Todo) => void
}