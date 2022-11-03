import { MessageModel } from './MessageModel'

export interface IMessages {
    getRoomMessages(roomId: number): Promise<MessageModel[]>
}