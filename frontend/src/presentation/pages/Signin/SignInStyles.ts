import {Paper, styled} from '@mui/material'

export const StyledContent = styled('div')(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: 'rgba(255, 255, 255, 0.2)',
    backgroundImage: "url(/img/Blur.png)",
    backdropFilter: 'blur(25px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}))

export const StyledForm = styled('form')(({ theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    borderRadius: theme.spacing(1),
    color: theme.palette.text.secondary,
    width: theme.spacing(54.6),
    boxShadow: '0px 40px 30px 10px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px #E5E5EA',
    [theme.breakpoints.down('md')]: {
        width: theme.spacing(45.6),
    },
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(38),
    },
}))
