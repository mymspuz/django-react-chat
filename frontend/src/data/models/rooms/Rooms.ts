import { RoomModel } from './RoomModel'

export interface IRooms {
    getAll(): Promise<RoomModel[]>
    getRoom(roomId: number): Promise<RoomModel>
    addRoom(params: string): Promise<RoomModel>
}