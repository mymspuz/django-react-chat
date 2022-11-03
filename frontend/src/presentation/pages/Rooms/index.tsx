import React, {useEffect, useState} from 'react'
import { Box, Divider, Typography } from '@mui/material'

import { IValidation, RoomModel } from '../../../data/models'
import { RemoteRooms } from '../../../main/pages/Rooms/remote/RemoteRooms'
import { MUIBackdrop, MUISnackbar } from '../../components'
import { Item, StyledContent } from './RoomsStyles'
import RoomsForm from './RoomsForm'
import RoomsList from './RoomsList'

type RoomsProps = {
    remoteRooms: RemoteRooms
    validation: IValidation
}

const Rooms: React.FC<RoomsProps> = ({remoteRooms, validation}: RoomsProps) => {

    const [state, setState] = useState({
        isLoading: false,
        mainError: ''
    })

    const [rooms, setRooms] = useState<RoomModel[]>([])

    const checkExisting = (name: string): boolean => rooms.some(r => name.trim().toLowerCase() === r.name.toLowerCase())

    const appendRoom = (room: RoomModel) => setRooms([...rooms, room])

    useEffect(() => {
        setState({...state, isLoading: true, mainError: ''})
        remoteRooms.getAll()
            .then((response) => {
                setRooms(response)
                setState({...state, isLoading: false})
            })
            .catch((e: Error) => {
                setState({...state, isLoading: false, mainError: e.message})
            })
    }, [])

    return (
            <>
                {state.mainError && <MUISnackbar color={'error'} content={state.mainError} />}
                <MUIBackdrop open={state.isLoading} />
                <StyledContent>
                    <Item>
                        <Box component="div" sx={{ mb: '30px', width: '100%' }}>
                            <Typography variant="h4" sx={{ py: 1 }}>
                                Выберите / создайте чат
                            </Typography>
                            <Divider />
                            <RoomsList roomslist={rooms} />
                            <RoomsForm
                                remoteRooms={remoteRooms}
                                validation={validation}
                                checkExisting={checkExisting}
                                appendRoom={appendRoom}
                            />
                        </Box>
                    </Item>
                </StyledContent>
            </>
    )
}

export default Rooms