import React, { useContext } from 'react'

import { makeRoomsValidation } from './RoomsValidation'
import { makeRooms } from './remote/makeRooms'
import { AccountContext } from '../../../presentation/hooks'
import Rooms from '../../../presentation/pages/Rooms'

const MakeRooms: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)

    if (getCurrentAccount) {
        const { access, refresh } = getCurrentAccount()
        const validationComposite = makeRoomsValidation()
        const remoteRooms = makeRooms(access, refresh)

        return <Rooms remoteRooms={remoteRooms} validation={validationComposite} />
    } else {
        return null
    }
}

export default MakeRooms