import React, { useContext, useEffect, useState } from 'react'
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { Iconify, MUISnackbar } from '../../components'
import { StyledForm } from './SignInStyles'
import { useNavigate } from 'react-router-dom'
import { SigninProps } from './index'
import { AccountContext } from '../../hooks'


const SignInForm = ({ validation, authentication }: SigninProps) => {
    const { setCurrentAccount } = useContext(AccountContext)

    const navigate = useNavigate()
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        mainError: ''
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            setState({...state, isLoading: true, mainError: ''})

            const account = await authentication.auth({
                username: state.username,
                password: state.password
            })
            if (setCurrentAccount) {
                setCurrentAccount(account)
                navigate('/')
            }
        } catch (error: any) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    const handleUserNameChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        const usernameError = validation.validate('username', { username: event.target.value })
        setState({...state, username: event.target.value, usernameError: usernameError})
    }

    const handlePasswordChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        const passwordError = validation.validate('password', { password: event.target.value })
        setState({...state, password: event.target.value, passwordError: passwordError})
    }

    useEffect(() => {
        setState((prevState) => { return {...prevState, isFormInvalid: !!prevState.usernameError || !!prevState.passwordError || !prevState.username}})
    }, [state.usernameError, state.passwordError])

    return (
        <>
            {state.mainError && <MUISnackbar color={'error'} content={state.mainError} />}
            <StyledForm onSubmit={handleSubmit}>
                <Stack spacing={1} sx={{ px: '30px', mb: '10px', width: '100%' }} >
                    <TextField
                        name="username"
                        label="Логин"
                        // variant="outlined"
                        error={state.usernameError !== ''}
                        helperText={state.usernameError}
                        value={state.username}
                        onChange={handleUserNameChange}
                    />

                    <TextField
                        name="password"
                        label="Пароль"
                        type={showPassword ? 'text' : 'password'}
                        error={state.passwordError !== ''}
                        helperText={state.passwordError}
                        value={state.password}
                        onChange={handlePasswordChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} width={20} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                </Stack>

                <LoadingButton
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mb: '30px' }}
                    disabled={state.isFormInvalid}
                    loading={state.isLoading}
                >
                    Войти
                </LoadingButton>

            </StyledForm>
        </>
    )
}

export default SignInForm