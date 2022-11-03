import { HttpHeader, IMessages, MessageModel } from '../../../../data/models'
import { HttpStatusCode, IHttpClient } from '../../../../data/models'
import { InvalidCredentialsError, UnexpectedError } from '../../../../errors'

export class RemoteMessages implements IMessages {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpClient,
        private readonly headerAuthorization: HttpHeader
    ) {}

    async getRoomMessages(roomId: number): Promise<MessageModel[]> {
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
            default:
                throw new UnexpectedError()
        }
    }
}