import { IAuthentication } from '../../../../data/models'
import { RemoteAuthentication } from './RemoteAuthentication'
import { makeApiUrl, makeAxiosHttpClient } from '../../../../services/http'

export const makeAuthentication = (): IAuthentication => {
    return new RemoteAuthentication(
        makeApiUrl(process.env.REACT_APP_AUTH_SIGNIN_URL as string),
        makeAxiosHttpClient()
    )
}