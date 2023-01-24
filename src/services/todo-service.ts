import { API, graphqlOperation } from 'aws-amplify'
import { listTodos, getTodo } from '../graphql/queries'
import { createTodo, deleteTodo, updateTodo } from '../graphql/mutations'
import { Todo } from "../models/todo/todo"
import { TodoToInsert } from '../models/todo/todo-to-insert'
import { Sort } from '../models/todo/sort'


async function query(filterText?: string, sort?: Sort) {
    try {
        const { data } = await API.graphql(graphqlOperation(listTodos)) as { data: { listTodos: { items: Todo[] } }; errors: any[] }
        let items = data.listTodos.items

        if (filterText) {
            const regExp = new RegExp(filterText, 'ig')
            items = items.filter(item => item.text.match(regExp))
        }

        if (sort?.sortParam) {
            switch (sort.sortParam) {
                case 'text':
                    items.sort((t1, t2) => (t1.text.localeCompare(t2.text)) * sort.method)
                    break

                case 'active':
                    items.sort((c1, c2) => (Number(c1.isDone) - Number(c2.isDone)) * sort.method)
                    break
            }
        }

        return items
    } catch (err) {
        throw err
    }
}


async function getById(id: string) {
    try {
        const { data } = await API.graphql({ query: getTodo, variables: { id } }) as { data: { getTodo: Todo } }
        return data.getTodo
    } catch (err) {
        console.log(err)
        throw err
    }
}


async function add(todo: TodoToInsert) {
    if (!todo.text) return

    try {
        const res = await API.graphql(graphqlOperation(createTodo, { input: { ...todo } })) as { data: { createTodo: Todo } }
        return res.data.createTodo
    } catch (err) {
        throw err
    }
}


async function update(todo: Todo) {
    try {
        const { id, text, isDone, location } = todo
        const updatedTodo = { id, text, isDone, location }
        const res = await API.graphql({ query: updateTodo, variables: { input: updatedTodo } }) as { data: { updatedTodo: Todo } }
        return res.data.updatedTodo
    } catch (err) {
        throw err
    }
}


async function remove(id: string) {
    try {
        await API.graphql({ query: deleteTodo, variables: { input: { id } } })
        const todos = (await query()).filter(todo => todo.id !== id)
        return todos
    } catch (err) {
        throw err
    }
}


function getDoneCount(todos: Todo[]) {
    return todos.filter(todo => todo.isDone).length
}


function getEmptyTodo() {
    return {
        byUserId: '',
        text: '',
        isDone: false,
        location: ''
    }
}


export const todoService = {
    query,
    getById,
    add,
    update,
    remove,
    getDoneCount,
    getEmptyTodo
}