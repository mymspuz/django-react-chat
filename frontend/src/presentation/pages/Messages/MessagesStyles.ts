import {Paper, styled} from '@mui/material'

export const StyledContent = styled('div')(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: '#F4F4F4',
}))

export const StyledForm = styled('form')(({ theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
}))

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    borderRadius: theme.spacing(1),
    color: theme.palette.text.secondary,
    width: theme.spacing(54.6),
    [theme.breakpoints.down('md')]: {
        width: theme.spacing(45.6),
    },
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(38),
    },
}))