async function add() {

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
    getEmptyTodo
}


// type Todo {
//     // id: ID!
//     // byUserId: String!
//     text: String!
//     isDone: Boolean!
//     location: String
//     // createdAt: AWSDateTime!
//     // updatedAt: AWSDateTime!
//     // owner: String
// }