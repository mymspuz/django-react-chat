import React, { useEffect, useState } from 'react'
import { InputAdornment, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { MUISnackbar } from '../../components'
import { StyledForm } from './RoomsStyles'
import { RemoteRooms } from '../../../main/pages/Rooms/remote/RemoteRooms'
import { IValidation, RoomModel } from '../../../data/models'

type RoomsFormProps = {
    remoteRooms: RemoteRooms
    validation: IValidation
    checkExisting: (name: string) => boolean
    appendRoom: (room: RoomModel) => void
}

const RoomsForm = ({ remoteRooms, validation, checkExisting, appendRoom }: RoomsFormProps) => {

    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        roomName: '',
        roomNameError: '',
        mainError: ''
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            if (checkExisting(state.roomName)) {
                setState({...state, mainError: 'Комната с таким именем уже существует!'})
                return
            }
            const room: RoomModel = await remoteRooms.addRoom(state.roomName)
            appendRoom(room)
            setState({...state, isLoading: false, mainError: ''})
        } catch (error: any) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    const handleRoomNameChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        const roomNameError = validation.validate('roomname', { roomName: event.target.value })
        setState({...state, roomName: event.target.value, roomNameError: roomNameError})
    }

    useEffect(() => {
        setState((prevState) => { return {...prevState, isFormInvalid: !!prevState.roomNameError || !prevState.roomName}})
    }, [state.roomNameError])

    return (
        <>
            {state.mainError && <MUISnackbar color={'error'} content={state.mainError} />}
            <StyledForm onSubmit={handleSubmit}>
                <Stack spacing={1} sx={{ px: '30px', mb: '10px', mt: '10px', width: '100%' }} >
                    <TextField
                        name="nameroom"
                        label="Введите название чата"
                        type='text'
                        error={state.roomNameError !== ''}
                        helperText={state.roomNameError}
                        value={state.roomName}
                        onChange={handleRoomNameChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        disabled={state.isFormInvalid}
                                        loading={state.isLoading}
                                    >
                                        Создать
                                    </LoadingButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </StyledForm>
        </>
    )
}

export default RoomsForm