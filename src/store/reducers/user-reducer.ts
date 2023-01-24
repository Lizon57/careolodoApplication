import { LoggedUser } from "../../models/user/logged-user"

const initialState: UserReducer = {
    loggedUser: null
}


export const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'setLoggedUser':
            return { ...state, loggedUser: { ...action.loggedUser } }

        case 'clearLoggedUser':
            return { ...state, loggedUser: null }

        default:
            return state
    }
}


type UserReducer = {
    loggedUser: LoggedUser | null
}


type Action = {
    [key: string]: any
}