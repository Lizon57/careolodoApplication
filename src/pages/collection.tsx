import { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo, deleteTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import { TodoInsert } from '../models/todo'
import { Todo } from '../models/todo/todo'
import { TodoPreview } from '../cmps/todo/todo-preview'


const initialState = { name: '', description: '' }

export function Collections() {
    const [insertTodoForm, setInsretTodoForm] = useState(initialState)
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todoData = await API.graphql(graphqlOperation(listTodos)) as { data: { listTodos: { items: TodoInsert[] } }; errors: any[] }
                const items = todoData.data.listTodos.items as Todo[]
                setTodos(items)
            } catch (err) { console.log('error fetching todos') }
        }
        fetchTodos()
    }, [])


    const handleChange = (key: string, value: string) => {
        setInsretTodoForm({ ...insertTodoForm, [key]: value })
    }


    const addTodo = async () => {
        try {
            if (!insertTodoForm.name || !insertTodoForm.description) return
            const serverResponse = await API.graphql(graphqlOperation(createTodo, { input: { ...insertTodoForm } })) as { data: { createTodo: Todo } }
            const insertedTodo = serverResponse.data.createTodo
            setTodos([...todos, insertedTodo])
            setInsretTodoForm(initialState)
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }


    const onRemoveTodo = async (id: string | undefined) => {
        if (!id) return
        await API.graphql({ query: deleteTodo, variables: { input: { id } } })
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
    }


    return (
        <div className="todo-cli-container">
            <h2>Amplify Todos</h2>
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
            <button onClick={addTodo}>Create Todo</button>
            {todos.map(todo => <TodoPreview key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />)}
        </div>
    )
}