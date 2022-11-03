import { AccountModel } from '../../models'
import { makeLocalStorageAdapter } from '../LocalStorageAdapter'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
    makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
    return makeLocalStorageAdapter().get('account')
}