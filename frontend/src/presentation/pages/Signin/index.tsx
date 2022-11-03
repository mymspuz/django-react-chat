import React from 'react'
import { Divider, Box, Typography } from '@mui/material'

import { IAuthentication, IValidation } from '../../../data/models'
import { StyledContent, Item } from './SignInStyles'
import SignInForm from './SigninForm'

export type SigninProps = {
    validation: IValidation
    authentication: IAuthentication
}

const Signin: React.FC<SigninProps> = ({ validation, authentication }: SigninProps) => {
    return (
        <StyledContent>
            <Item>
                <Box component="div" sx={{ mb: '30px', width: '100%' }}>
                    <Typography variant="h4" sx={{ py: 1 }}>
                        Авторизация
                    </Typography>
                    <Divider />
                </Box>
                <SignInForm validation={validation} authentication={authentication} />
            </Item>
        </StyledContent>
    )
}

export default Signin