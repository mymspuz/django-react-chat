type UserMessageModel = {
    id: number
    name: string
}

export type MessageModel = {
    id: number
    room: number
    message: string
    user: UserMessageModel
    date: string
    time: string
}

export type ChatMessages = {
    id: number
    date: string
    time: string
    message: string
    user: UserMessageModel
}

export type Chat = {
    day: string
    messages: ChatMessages[]
}