import { makeId } from "../utils/make-id"
import { HomePage } from "../pages/home-page"
import { UserTodo } from "../pages/user-todo"


export const routes = [
    {
        id: makeId(),
        path: 'user-todo',
        element: UserTodo
    },
    {
        id: makeId(),
        path: '*',
        element: HomePage
    }
]