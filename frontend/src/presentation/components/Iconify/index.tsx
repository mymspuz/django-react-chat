import React, { forwardRef } from 'react'
import { Icon } from '@iconify/react'
import { Box } from '@mui/material'

interface IIconifyProps {
    icon: string
    width: number | string
    height?: number | string
    sx?: object
    color?: string
}

const Iconify = forwardRef((props: IIconifyProps, ref) => (
    <Box
        ref={ref}
        component={Icon}
        icon={props.icon}
        sx={{ width: props.width, height: props.width, ...props.sx }}
        color={props.color}
        height={props.height}
    />
))

export default Iconify