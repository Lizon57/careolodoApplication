import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { API, graphqlOperation } from 'aws-amplify'
import { deleteTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import { Todo } from '../models/todo/todo'
import { showUserMsg } from '../services/event-bus-service'
import { TodoPreview } from '../cmps/todo/todo-preview'
import { ErrorMessage } from '../cmps/layout/error-message'
import { Loader } from '../cmps/layout/loader'
import TodoAdd from '../cmps/todo/todo-add'
import { flexColumnMixin } from '../styles/mixins/flex-mixins'
import { MainTitle } from '../cmps/ui/main-title'
import { todoService } from '../services/todo-service'



export function Collections() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [completeTodoCounter, setCompleteTodoCounter] = useState<number>()
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string>()


    const fetchTodos = async () => {
        setIsLoading(true)
        try {
            const todoData = await API.graphql(graphqlOperation(listTodos)) as { data: { listTodos: { items: Todo[] } }; errors: any[] }
            const items = todoData.data.listTodos.items
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


    const onRemoveTodo = async (id: string | undefined) => {
        if (!id) return
        try {
            await API.graphql({ query: deleteTodo, variables: { input: { id } } })
            const newTodos = todos.filter(todo => todo.id !== id)
            setTodos(newTodos)
            showUserMsg({ text: 'Todo removed successfully', type: 'success' })
        } catch (err) {
            showUserMsg({ text: 'Todo remove fail, please try again', type: 'error' })
        }
    }


    return (
        <StyledCollection>
            <section className="">
                <MainTitle text="My todos" />
                <p className="todo-stat">
                    {completeTodoCounter} completed todos out of {todos.length} ({((completeTodoCounter || 0) / todos.length * 100).toFixed(0)}%)
                </p>
            </section>

            {errorMessage && <ErrorMessage error={errorMessage} />}
            {(!errorMessage && isLoading) && <Loader />}
            {(!errorMessage && !isLoading) &&
                <section>
                    {todos.map(todo => <TodoPreview key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />)}
                </section>
            }

            <TodoAdd />
        </StyledCollection>
    )
}


const StyledCollection = styled.main`
    ${flexColumnMixin('1.5rem')}

    p.todo-stat {
        font-family: ${({ theme }) => theme.typographyEmphasis};
    }
`