import { Authentication, IAuthentication } from '../../../../data/models'
import { HttpStatusCode, IHttpClient } from '../../../../data/models'
import { InvalidCredentialsError, UnexpectedError } from '../../../../errors'

export class RemoteAuthentication implements IAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpClient
    ) {}

    async auth(params: Authentication.Params): Promise<Authentication.Model> {
        const httpResponse = await this.httpPostClient.request({
            url: this.url,
            method: 'post',
            body: params
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