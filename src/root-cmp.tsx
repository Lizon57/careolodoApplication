import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { API, graphqlOperation } from 'aws-amplify'

import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'

import { Todo } from './models/todo'

import { StyledAppLayout } from './cmps/layout/styled-app-layout'
import { AppHeader } from './cmps/layout/app-header'
import { AppFooter } from './cmps/layout/app-footer'



const initialState = { name: '', description: '' }

function App() {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const setInput = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value })
  }

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos)) as { data: { listTodos: { items: Todo[] } }; errors: any[] }
      const { items } = todoData.data.listTodos
      setTodos(items)
    } catch (err) { console.log('error fetching todos') }
  }

  const addTodo = async () => {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, { input: todo }))
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
    <Router>
      <StyledAppLayout>
        <AppHeader />
        <div className="todo-cli-container">
          <h2>Amplify Todos</h2>
          <input
            onChange={event => setInput('name', event.target.value)}
            value={formState.name}
            placeholder="Name"
          />
          <input
            onChange={event => setInput('description', event.target.value)}
            value={formState.description}
            placeholder="Description"
          />
          <button onClick={addTodo}>Create Todo</button>
          {todos.map(todo => <div key={todo.id || Math.random()}>
            {todo.name} <button onClick={() => onRemoveTodo(todo.id)}>X</button>
          </div>)}
        </div>
        <AppFooter />
      </StyledAppLayout>
    </Router>
  )
}


export default App