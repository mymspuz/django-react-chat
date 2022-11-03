import React, { useContext, useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'

import { RemoteMessages } from '../../../main/pages/Messages/remote/RemoteMessages'
import { Chat, MessageModel, RoomModel } from '../../../data/models'
import { Iconify, MUIBackdrop, MUISnackbar } from '../../components'
import { AccountContext } from '../../hooks'

type MessagesListProps = {
    remoteMessages: RemoteMessages
    room: RoomModel
}

const MessagesList: React.FC<MessagesListProps> = ({ remoteMessages, room }: MessagesListProps) => {
    const { getCurrentAccount } = useContext(AccountContext)

    let userName = ''
    if (getCurrentAccount) {
        const { username } = getCurrentAccount()
        userName = username
    }

    const [state, setState] = useState({
        isLoading: false,
        mainError: ''
    })

    const [chat, setChat] = useState<Chat[]>([])

    const getChat = (messages: MessageModel[]): Chat[] => {
        let result: Chat[] = []
        let itemDay: Chat = {day: '', messages: []}
        let day: string = ''
        messages.forEach(m => {
            if (m.date !== day) {
                if (itemDay.day) {
                    result = [...result, itemDay]
                }
                day = m.date
                itemDay = {...itemDay, day: day, messages: []}
            }
            itemDay.messages.push({
                id: m.id,
                message: m.message,
                user: m.user,
                date: m.date,
                time: m.time,
            })
        })
        if (itemDay.day) {
            result = [...result, itemDay]
        }
        return result
    }

    useEffect(() => {
        setState({...state, isLoading: true, mainError: ''})
        remoteMessages.getRoomMessages(room.id)
            .then((response) => {
                setState({...state, isLoading: false})
                setChat(getChat(response))
            })
            .catch((e: Error) => {
                setState({...state, isLoading: false, mainError: e.message})
            })
    }, [])

    return (
        <Box component='div' sx={{ height: '100%' }}>
            {state.mainError && <MUISnackbar color={'error'} content={state.mainError} />}
            <MUIBackdrop open={state.isLoading} />
            {chat && chat.map(c => (
                <div key={c.day}>
                    <Box component='p' sx={{ fontSize: '12px', my: '10px' }}>{c.day}</Box>
                    {c.messages && c.messages.map(m => (
                        <Stack
                            spacing={1}
                            alignItems={m.user.name === userName ? 'end' : 'start'}
                            key={m.id}
                        >
                            <Box
                                sx={{
                                    maxWidth: '270px',
                                    ...(m.user.name === userName
                                        ?
                                        {backgroundColor: '#5D5FEF', color: '#FFF'}
                                        :
                                        {backgroundColor: '#F2F2F7', color: '#000'}),
                                    borderRadius: '10px',
                                    textAlign: 'left',
                                    p: '10px',
                                    my: '5px',
                                    mx: '10px',
                                }}
                            >
                                {m.user.name !== userName && <Box component='p' sx={{ fontWeight: '600', my: '0' }}>{m.user.name}</Box>}
                                <Box component='p' sx={{ my: '0' }}>{m.message}</Box>
                                <Box component='p' sx={{ textAlign: 'right', my: '0' }}>
                                    {m.time}
                                    <Iconify icon={'bi:check-all'} width={15} />
                                </Box>
                            </Box>
                        </Stack>
                    ))}
                </div>
            ))}
        </Box>
    )
}

export default MessagesList