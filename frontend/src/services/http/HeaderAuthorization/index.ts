import { HttpHeader } from '../../../data/models'

export const makeHeaderAuthorization = (token: string, refresh: string = ''): HttpHeader => {
    return {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
            // refresh: refresh
        }
    }
}