import React, { useEffect, useState } from 'react'
import { Divider, Link, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { Iconify, MUIBackdrop, MUISnackbar } from '../../components'
import { Item, StyledContent } from './MessagesStyles'
import { RemoteRooms } from '../../../main/pages/Rooms/remote/RemoteRooms'
import { RemoteMessages } from '../../../main/pages/Messages/remote/RemoteMessages'
import MessagesList from './MessagesList'
import MessagesForm from "./MessagesForm";

type MessagesProps = {
    remoteRooms: RemoteRooms
    remoteMessages: RemoteMessages
}

const Messages: React.FC<MessagesProps> = ({ remoteRooms, remoteMessages }: MessagesProps) => {
    const [state, setState] = useState({
        room: {id: 0, name: ''},
        isLoading: false,
        mainError: ''
    })

    const params = useParams()
    const roomId = params.roomId
    const navigate = useNavigate()

    useEffect(() => {
        setState({...state, isLoading: true, mainError: ''})
        remoteRooms.getRoom(Number(roomId))
            .then((response) => {
                setState({...state, isLoading: false, room: {...state.room, id: response.id, name: response.name}})
            })
            .catch((e: Error) => {
                setState({...state, isLoading: false, mainError: e.message})
                if (e.message === 'Комната не найдена.'){
                    navigate('/', {replace: true})
                }
            })
    }, [])

    return (
        <>
            {state.mainError && <MUISnackbar color={'error'} content={state.mainError} />}
            <MUIBackdrop open={state.isLoading} />
            <StyledContent>
                <Item>
                    <Item sx={{ width: '100%', overflowY: 'auto', height: '94vh' }}>
                        <Typography variant="h4" sx={{ py: 1, textAlign: 'end' }}>
                            {state.room.id > 0 && state.room.name}
                            <Link
                                href='/'
                                color='inherit'
                            >
                                <Iconify icon={'cil:input'} width={20} sx={{ ml: '30%', mr: '20px' }} />
                            </Link>
                        </Typography>
                        <Divider />
                        {state.room.id > 0 && <MessagesList remoteMessages={remoteMessages} room={state.room} />}
                    </Item>
                    <MessagesForm />
                </Item>
            </StyledContent>
        </>
    )
}

export default Messages