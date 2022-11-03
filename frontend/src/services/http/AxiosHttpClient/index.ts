import { AxiosHttpClient } from './AxiosHttpClient'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}