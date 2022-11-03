import React, { useContext } from 'react'

import { makeMessages } from './remote/makeMessages'
import { AccountContext } from '../../../presentation/hooks'
import Messages from '../../../presentation/pages/Messages'
import { makeRooms } from '../Rooms/remote/makeRooms'

const MakeMessages: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)

    if (getCurrentAccount) {
        const { access, refresh } = getCurrentAccount()
        const remoteRooms = makeRooms(access, refresh)
        const remoteMessages = makeMessages(access, refresh)

        return <Messages remoteRooms={remoteRooms} remoteMessages={remoteMessages}/>
    } else {
        return null
    }
}

export default MakeMessages