import React, { useEffect, useState } from 'react'
import { InputAdornment, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { MUISnackbar } from '../../components'
import { StyledForm } from './MessagesStyles'

const MessagesForm = () => {

    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        message: '',
        mainError: ''
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            setState({...state, isLoading: false, mainError: ''})
        } catch (error: any) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    const handleMessageChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({...state, message: event.target.value})
    }

    useEffect(() => {
        setState((prevState) => { return {...prevState, isFormInvalid: !!prevState.message || !prevState.message}})
    }, [state.message])

    return (
        <>
            {state.mainError && <MUISnackbar color={'error'} content={state.mainError} />}
            <StyledForm onSubmit={handleSubmit}>
                <Stack sx={{ width: '100%' }}>
                    <TextField
                        name="nameroom"
                        label="Сообщение"
                        type='text'
                        value={state.message}
                        onChange={handleMessageChange}
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

export default MessagesForm