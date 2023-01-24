import { Todo } from "../models/todo/todo"


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
    getDoneCount,
    getEmptyTodo
}