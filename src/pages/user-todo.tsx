import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import styled from 'styled-components'
import { Todo } from '../models/todo/todo'
import { Sort } from '../models/todo/sort'
import { showUserMsg } from '../services/event-bus-service'
import { TodoPreview } from '../cmps/todo/todo-preview'
import { ErrorMessage } from '../cmps/layout/error-message'
import { Loader } from '../cmps/layout/loader'
import TodoAdd from '../cmps/todo/todo-add'
import { MainTitle } from '../cmps/ui/main-title'
import { todoService } from '../services/todo-service'
import { FilterAndSort } from '../cmps/todo/filter-and-sort'
import { flexColumnMixin } from '../styles/mixins/flex-mixins'



export function UserTodo() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [filterText, setFilterText] = useState<string>()
    const [sort, setSort] = useState<Sort>()
    const [completeTodoCounter, setCompleteTodoCounter] = useState<number>()
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string>()


    const fetchTodos = async () => {
        setIsLoading(true)
        try {
            const items = await todoService.query(filterText, sort)
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
    const debouncedFetchTodos = useDebouncedCallback(fetchTodos, 1000)

    useEffect(() => {
        fetchTodos()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        debouncedFetchTodos()
    }, [filterText, sort]) // eslint-disable-line react-hooks/exhaustive-deps


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


    const onChangeFilterText = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(ev.target.value)
    }

    const onSetSort = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const sortMethods = ev.target.value.split(' ')
        if (!sortMethods.length) return

        const sort = { sortParam: sortMethods[0], method: +sortMethods[1] }
        setSort(sort)
    }

    const onClearFilterAndSort = () => {
        setFilterText('')
    }


    return (
        <StyledUserTodo>
            <MainTitle text="My todos" />

            {errorMessage && <ErrorMessage error={errorMessage} />}
            {(!errorMessage && isLoading) && <Loader />}
            {(!errorMessage && !isLoading) &&
                (todos.length
                    ? <>
                        <FilterAndSort
                            filterText={filterText || ''}
                            onChangeFilterText={onChangeFilterText}
                            onSetSort={onSetSort}
                            onClearFilterAndSort={onClearFilterAndSort}
                        />

                        <p className="todo-stat">
                            {completeTodoCounter} completed todos out of {todos.length} ({(((completeTodoCounter || 0) / todos.length * 100) || 0).toFixed(0)}%)
                        </p>

                        <section>
                            {todos.map(todo => <TodoPreview
                                key={todo.id}
                                todo={todo}
                                onUpdateTodo={onUpdateTodo}
                                onRemoveTodo={onRemoveTodo}
                            />)}
                        </section>
                    </>
                    : <div className="no-todos-indicator">
                        Yay! you have 0 todos on list. Time to sleep! (or is it?)
                    </div>)
            }

            <MainTitle text="Add todo" />
            <TodoAdd onTodoAdd={onTodoAdd} />
        </StyledUserTodo>
    )
}


const StyledUserTodo = styled.main`
    ${flexColumnMixin('1.5rem')}

    p.todo-stat {
        font-family: ${({ theme }) => theme.typographyEmphasis};
    }
    
    div.no-todos-indicator{
        font-size: ${({ theme }) => theme.fontSizexxxLargeRem};
        font-family: ${({ theme }) => theme.typographyEmphasis};
    }
`