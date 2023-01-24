import { UserMessage } from "../models/user-message"

export const SHOW_MSG = 'show-msg'

function createEventEmitter() {
    const listenersMap: ListenersMap = {}
    return {
        on(evName: string, listener: ((message: UserMessage) => void)) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName: string, data: unknown) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}
export const eventBus = createEventEmitter()


export function showUserMsg(message: UserMessage) {
    eventBus.emit(SHOW_MSG, message)
}

export function showSuccessMsg(txt: string) {
    showUserMsg({ text: txt, type: 'success' })
}

export function showErrorMsg(txt: string) {
    showUserMsg({ text: txt, type: 'error' })
}


interface ListenersMap {
    [key: string]: any[]
}