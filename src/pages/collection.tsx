import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo, deleteTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import { TodoInsert } from '../models/todo'
import { Todo } from '../models/todo/todo'
import { showUserMsg } from '../services/event-bus-service'
import { TodoPreview } from '../cmps/todo/todo-preview'
import { ErrorMessage } from '../cmps/layout/error-message'
import { Loader } from '../cmps/layout/loader'
import TodoAdd from '../cmps/todo/todo-add'
import { flexColumnMixin } from '../styles/mixins/flex-mixins'


const initialState = { name: '', description: '' }

export function Collections() {
    const [insertTodoForm, setInsretTodoForm] = useState(initialState)
    const [todos, setTodos] = useState<Todo[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string>()


    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true)
            try {
                const todoData = await API.graphql(graphqlOperation(listTodos)) as { data: { listTodos: { items: TodoInsert[] } }; errors: any[] }
                const items = todoData.data.listTodos.items as Todo[]
                setTodos(items)
            } catch (err) {
                if (typeof err === 'string') setErrorMessage(err)
                else setErrorMessage('Unknown error occured, please try again.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchTodos()
    }, [])


    const handleChange = (key: string, value: string) => {
        setInsretTodoForm({ ...insertTodoForm, [key]: value })
    }


    const onAddTodo = async () => {
        // try {
        //     if (!insertTodoForm.name || !insertTodoForm.description) return
        //     const serverResponse = await API.graphql(graphqlOperation(createTodo, { input: { ...insertTodoForm } })) as { data: { createTodo: Todo } }
        //     const insertedTodo = serverResponse.data.createTodo
        //     setTodos([...todos, insertedTodo])
        //     setInsretTodoForm(initialState)
        //     showUserMsg({ text: 'Todo added successfully', type: 'success' })
        // } catch (err) {
        //     showUserMsg({ text: 'Todo add fail, please try again', type: 'error' })
        // }
    }


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
            <div>
                <input
                    onChange={event => handleChange('name', event.target.value)}
                    value={insertTodoForm.name}
                    placeholder="Name"
                />
                <input
                    onChange={event => handleChange('description', event.target.value)}
                    value={insertTodoForm.description}
                    placeholder="Description"
                />
                <button onClick={onAddTodo}>Create Todo</button>
            </div>

            {errorMessage && <ErrorMessage error={errorMessage} />}
            {(!errorMessage && isLoading) && <Loader />}
            {(!errorMessage && !isLoading) &&
                todos.map(todo => <TodoPreview key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />)
            }

            <TodoAdd />
        </StyledCollection>
    )
}


const StyledCollection = styled.main`
    ${flexColumnMixin('1.5rem')}
`