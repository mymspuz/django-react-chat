import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { makeSigninValidation } from './SigninValidation'
import { makeAuthentication } from './remote/makeAuth'
import { AccountContext } from '../../../presentation/hooks'
import Signin from '../../../presentation/pages/Signin'

const MakeSignin: React.FC = () => {
    const validationComposite = makeSigninValidation()
    const remoteAuthentication = makeAuthentication()

    const { getCurrentAccount } = useContext(AccountContext)

    return !(getCurrentAccount) || getCurrentAccount().access ? (
            <Navigate to='/' />
        ) : (
            <Signin
                validation={validationComposite}
                authentication={remoteAuthentication}
            />
        )
}

export default MakeSignin