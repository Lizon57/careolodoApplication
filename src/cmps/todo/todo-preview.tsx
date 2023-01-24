import { AiFillCheckSquare } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"
import { FiSquare } from "react-icons/fi"
import styled from "styled-components"
import { Todo } from "../../models/todo/todo"
import { flexAlignCenterMixin } from "../../styles/mixins/flex-mixins"
// import { WeatherPreview } from "./weather-preview"


// export function TodoPreview({ todo, onEditTodoText, onToggleIsDone, onRemoveTodo }: Props) {
export function TodoPreview({ todo, onRemoveTodo }: Props) {
    return (
        <StyledTodoPreview>
            {/* <div className="todo" title={`${todo.name} (${todo.isDone ? 'Done' : 'To do'})`}> */}
            <span className="todo-remove-icon" onClick={() => onRemoveTodo(todo.id)} title="Remove todo"><FaTimes /></span>
            {todo.name}

            {/* <span className={'todo-state-icon' + (todo.isDone ? ' done' : '')} onClick={() => onToggleIsDone(todo.id)} title="Toggle todo state"> */}
            {/* {todo.isDone ? <AiFillCheckSquare /> : <FiSquare />} */}
            {/* </span> */}

            {/* <span className="text" onBlur={ev => onEditTodoText(ev, todo.id, 'text')} title="Edit todo text" contentEditable suppressContentEditableWarning> */}
            {/* {todo.text} */}
            {/* </span> */}
            {/* </div> */}

            {/* <div class/Name="weather"> */}
            {/* <span onBlur={ev => onEditTodoText(ev, todo.id, 'location')} contentEditable suppressContentEditableWarning title="Edit todo location"> */}
            {/* {todo.location || 'Pick location'} */}
            {/* </span> */}

            {/* {todo.location && <WeatherPreview location={todo.location} />} */}
        </StyledTodoPreview>
    )
}


const StyledTodoPreview = styled.article`
    ${flexAlignCenterMixin('5px')}

    color: ${({ theme }) => theme.blueDarker};
    padding: ${({ theme }) => theme.spaceBlockxxxSmallRem}  ${({ theme }) => theme.spaceInlinexxxSmallRem};

    :nth-child(even) {
        background-color: ${({ theme }) => theme.whiteLighter};
    }

    /* div.todo {
        ${flexAlignCenterMixin('5px')}

        span.todo-remove-icon {
            ${flexAlignCenterMixin()}

            cursor: pointer;
            color: #bbb;
            transition: all ease-in-out .3s;

            &:hover {
                color: #434343;
            }
        }

        span.todo-state-icon {
            cursor: pointer;

            &.done {
                color: #193159;
            }

            svg {
                display: block;
            }
        }

        span.text {
            outline: 0;
            font-size: 1.1rem;
            width: 100%;
        }
    }

    div.weather {
        display: flex;
        justify-content: space-between;

        font-size: 0.9rem;

        span:first-of-type {
            outline: 0;
        }
    } */
`


type Props = {
    todo: Todo
    // onEditTodoText: (ev: React.FocusEvent<HTMLSpanElement, Element>, todoId: string, field: 'text' | 'location') => void
    // onToggleIsDone: (todoId: string) => void
    onRemoveTodo: (todoId: string) => void
}