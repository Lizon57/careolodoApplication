import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Todo } from '../models/todo/todo'
import { showUserMsg } from '../services/event-bus-service'
import { TodoPreview } from '../cmps/todo/todo-preview'
import { ErrorMessage } from '../cmps/layout/error-message'
import { Loader } from '../cmps/layout/loader'
import TodoAdd from '../cmps/todo/todo-add'
import { flexColumnMixin } from '../styles/mixins/flex-mixins'
import { MainTitle } from '../cmps/ui/main-title'
import { todoService } from '../services/todo-service'



export function UserTodo() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [completeTodoCounter, setCompleteTodoCounter] = useState<number>()
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string>()


    const fetchTodos = async () => {
        setIsLoading(true)
        try {
            const items = await todoService.query()
            setTodos(items)
            const completeTodoCounter = todoService.getDoneCount(items)
            setCompleteTodoCounter(completeTodoCounter)
        } catch (err) {
            if (typeof err === 'string') setErrorMessage(err)
            else setErrorMessage('Unknown error occured, please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])


    const onRemoveTodo = async (id: string) => {
        try {
            const todos = await todoService.remove(id)
            setTodos(todos)
            showUserMsg({ text: 'Todo removed successfully', type: 'success' })
        } catch (err) {
            showUserMsg({ text: 'Todo remove fail, please try again', type: 'error' })
        }
    }


    const onUpdateTodo = async (newTodo: Todo) => {
        try {
            await todoService.update(newTodo) as Todo
            const todoIdx = todos.findIndex(todo => todo.id === newTodo.id)
            if (todoIdx < 0) return
            const newTodos = todos.slice()
            newTodos.splice(todoIdx, 1, newTodo)
            setTodos(newTodos)
            showUserMsg({ text: 'Todo update successfully', type: 'success' })
        } catch (err) {
            showUserMsg({ text: 'Todo update fail, please try again', type: 'error' })
        }
    }


    const onTodoAdd = (todo: Todo) => {
        setTodos([todo, ...todos])
    }


    return (
        <StyledCollection>
            <section className="">
                <MainTitle text="My todos" />
                <p className="todo-stat">
                    {completeTodoCounter} completed todos out of {todos.length} ({(((completeTodoCounter || 0) / todos.length * 100) || 0).toFixed(0)}%)
                </p>
            </section>

            {errorMessage && <ErrorMessage error={errorMessage} />}
            {(!errorMessage && isLoading) && <Loader />}
            {(!errorMessage && !isLoading) &&
                (todos.length
                    ? <section>
                        {todos.map(todo => <TodoPreview
                            key={todo.id}
                            todo={todo}
                            onUpdateTodo={onUpdateTodo}
                            onRemoveTodo={onRemoveTodo}
                        />)}
                    </section>
                    : <div className="no-todos-indicator">
                        Yay! you have 0 todos on list. Time to sleep! (or is it?)
                    </div>)
            }

            <MainTitle text="Add todo" />
            <TodoAdd onTodoAdd={onTodoAdd} />
        </StyledCollection>
    )
}


const StyledCollection = styled.main`
    ${flexColumnMixin('1.5rem')}

    p.todo-stat {
        font-family: ${({ theme }) => theme.typographyEmphasis};
    }
    
    div.no-todos-indicator{
        font-size: ${({ theme }) => theme.fontSizexxxLargeRem};
        font-family: ${({ theme }) => theme.typographyEmphasis};
    }
`