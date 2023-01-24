import { legacy_createStore as createStore, compose, combineReducers } from 'redux'
import { userReducer } from './reducers/user-reducer'


const rootReducer = combineReducers({
    userModule: userReducer
})



export type RootState = ReturnType<typeof store.getState>


const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, middleware())

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}