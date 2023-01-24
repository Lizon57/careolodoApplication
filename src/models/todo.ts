export interface TodoInsert {
    id?: string
    name: string
    description: string
}

export type TodoQuery = {
    getTodo?: {
        __typename: "Todo",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
    } | null,
}