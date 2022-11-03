import { RemoteRooms } from './RemoteRooms'
import { makeApiUrl, makeAxiosHttpClient, makeHeaderAuthorization } from '../../../../services/http'

export const makeRooms = (token: string, refresh: string): RemoteRooms => {
    return new RemoteRooms(
        makeApiUrl(process.env.REACT_APP_ROOMS_URL as string),
        makeAxiosHttpClient(),
        makeHeaderAuthorization(token, refresh)
    )
}