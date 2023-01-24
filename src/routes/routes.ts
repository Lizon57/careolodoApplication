import { makeId } from "../utils/make-id"
import { HomePage } from "../pages/home-page"
import { Collections } from "../pages/collection"


export const routes = [
    {
        id: makeId(),
        path: 'collections',
        element: Collections
    },
    {
        id: makeId(),
        path: '*',
        element: HomePage
    }
]