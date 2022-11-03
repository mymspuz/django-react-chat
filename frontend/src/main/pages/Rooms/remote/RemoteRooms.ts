import { HttpHeader, IRooms, RoomModel } from '../../../../data/models'
import { HttpStatusCode, IHttpClient } from '../../../../data/models'
import { InvalidCredentialsError, UnexpectedError } from '../../../../errors'

export class RemoteRooms implements IRooms {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpClient,
        private readonly headerAuthorization: HttpHeader
    ) {}

    async getAll(): Promise<RoomModel[]> {
        const httpResponse = await this.httpPostClient.request({
            url: this.url,
            method: 'get',
            headers: this.headerAuthorization.headers
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return httpResponse.body
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError()
            default:
                throw new UnexpectedError()
        }
    }

    async getRoom(roomId: number): Promise<RoomModel> {
        const httpResponse = await this.httpPostClient.request({
            url: `${this.url}${roomId}`,
            method: 'get',
            headers: this.headerAuthorization.headers
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return httpResponse.body
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError()
            case HttpStatusCode.notFound:
                throw new UnexpectedError('Комната не найдена.')
            default:
                throw new UnexpectedError()
        }
    }

    async addRoom(params: string): Promise<RoomModel> {
        const httpResponse = await this.httpPostClient.request({
            url: `${this.url}add`,
            method: 'post',
            body: {'name_room': params},
            // headers: this.headerAuthorization.headers
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return httpResponse.body
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError()
            default:
                throw new UnexpectedError()
        }
    }
}