import { store } from "../store"
import { LoggedUser } from "../../models/user/logged-user"


export const loginUser = (user: LoggedUser) => {
    store.dispatch({ type: 'setLoggedUser', loggedUser: user })
}

export const signoutUser = () => {
    store.dispatch({ type: 'clearLoggedUser' })
}