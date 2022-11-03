import { RemoteMessages } from './RemoteMessages'
import { makeApiUrl, makeAxiosHttpClient, makeHeaderAuthorization } from '../../../../services/http'

export const makeMessages = (token: string, refresh: string): RemoteMessages => {
    return new RemoteMessages(
        makeApiUrl(process.env.REACT_APP_MESSAGES_URL as string),
        makeAxiosHttpClient(),
        makeHeaderAuthorization(token, refresh)
    )
}