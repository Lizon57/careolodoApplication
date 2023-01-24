import styled from "styled-components"
import { FiCheckSquare, FiSquare } from "react-icons/fi"
import { FaTimes } from "react-icons/fa"
import { Todo } from "../../models/todo/todo"
import { flexAlignCenterMixin } from "../../styles/mixins/flex-mixins"
import { capitalFirstLetter } from "../../styles/mixins/text-mixins"
import { dateFromStringFormatter } from "../../utils/date-from-string-formatter"


// export function TodoPreview({ todo, onEditTodoText, onToggleIsDone, onRemoveTodo }: Props) {
export function TodoPreview({ todo, onUpdateTodo, onRemoveTodo }: Props) {
    const onToggleIsDone = () => {
        const updatedTodo = structuredClone(todo)
        updatedTodo.isDone = !todo.isDone
        onUpdateTodo(updatedTodo)
    }

    return (
        <StyledTodoPreview>
            <div className="date">
                <span>Created at {dateFromStringFormatter(todo.createdAt)}</span>
                {(todo.createdAt !== todo.updatedAt) && <span>(Updated at {dateFromStringFormatter(todo.updatedAt)})</span>}
            </div>

            <span className="state-icon" onClick={() => onToggleIsDone()}>
                {todo.isDone
                    ? <FiCheckSquare title="Complete todo" />
                    : <FiSquare title="Yet to complete todo" />
                }
            </span>

            <span className={'text' + (todo.isDone ? ' done' : '')} title={todo.text}>{todo.text}</span>

            <button className="remove-button" title="Remove todo" onClick={() => onRemoveTodo(todo.id)}><FaTimes /></button>

            {todo.location && <span className="location" title={`Todo at ${todo.location}`}>At {todo.location}</span>}
        </StyledTodoPreview>
    )
}


const StyledTodoPreview = styled.article`
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: repeat(3, auto);
    gap: ${({ theme }) => theme.spaceBlockxxxSmallRem};

    color: ${({ theme }) => theme.blueDarker};
    padding: ${({ theme }) => theme.spaceBlockxxxSmallRem}  ${({ theme }) => theme.spaceInlinexxxSmallRem};

    &:nth-child(odd) {
        background-color: ${({ theme }) => theme.whitePrimary};
    }

    &:hover button.remove-button {
        ${flexAlignCenterMixin()}
    }

    div.date {
        grid-column: 1/-1;
        grid-row: 1/2;
        ${flexAlignCenterMixin('0.5rem')}
        font-size: ${({ theme }) => theme.fontSizexxSmallRem};
        color: ${({ theme }) => theme.blackLighter}
    }

    span.state-icon {
        grid-column: 1/2;
        grid-row: 2/3;
        ${flexAlignCenterMixin()}
    }

    span.text {
        grid-column: 2/3;
        grid-row: 2/3;

        ${capitalFirstLetter()}
        font-family: ${({ theme }) => theme.typographyEmphasis};

        &.done {
            text-decoration: line-through;
        }
    }

    button.remove-button {
        grid-column: 3/4;
        grid-row: 2/3;

        display: none;
        cursor: pointer;
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.blackLighter};
    }

    span.location {
        grid-column: 2/3;
        grid-row: 3/4;
        font-size: ${({ theme }) => theme.fontSizexSmallRem};
    }
`


type Props = {
    todo: Todo
    // onEditTodoText: (ev: React.FocusEvent<HTMLSpanElement, Element>, todoId: string, field: 'text' | 'location') => void
    // onToggleIsDone: (todoId: string) => void
    onUpdateTodo: (todo: Todo) => void
    onRemoveTodo: (id: string) => void
}