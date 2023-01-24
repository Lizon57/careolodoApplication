// import { AiFillCheckSquare } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"
// import { FiSquare } from "react-icons/fi"
import styled from "styled-components"
import { Todo } from "../../models/todo/todo"
import { flexAlignCenterMixin } from "../../styles/mixins/flex-mixins"


// export function TodoPreview({ todo, onEditTodoText, onToggleIsDone, onRemoveTodo }: Props) {
export function TodoPreview({ todo, onRemoveTodo }: Props) {
    return (
        <StyledTodoPreview>
            {/* <div className="todo" title={`${todo.name} (${todo.isDone ? 'Done' : 'To do'})`}> */}
            <span className="todo-remove-icon" onClick={() => onRemoveTodo(todo.id)} title="Remove todo"><FaTimes /></span>
            {todo.name}
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
`


type Props = {
    todo: Todo
    // onEditTodoText: (ev: React.FocusEvent<HTMLSpanElement, Element>, todoId: string, field: 'text' | 'location') => void
    // onToggleIsDone: (todoId: string) => void
    onRemoveTodo: (todoId: string) => void
}