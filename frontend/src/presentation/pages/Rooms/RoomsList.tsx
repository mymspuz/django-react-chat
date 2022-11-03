import React from 'react'

import { RoomModel } from '../../../data/models'
import { Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import {useNavigate} from "react-router-dom";

type RoomsListProps = {
    roomslist: RoomModel[]
}

const RoomsList: React.FC<RoomsListProps> = ({ roomslist }: RoomsListProps) => {

    const navigate = useNavigate()

    const handleButtonClick = (roomId: number): void => {
        navigate(`messages/${roomId}`)
    }

    return (
        <Box component="div" sx={{ mb: '10px', px: '30px', width: '100%' }}>
            {roomslist && roomslist.map(room => (
                <Button
                    key={room.id}
                    variant="contained"
                    endIcon={<SendIcon />}
                    fullWidth={true}
                    sx={{mt: '10px', display: 'flex', justifyContent: 'space-between'}}
                    onClick={() => handleButtonClick(room.id)}
                >
                    {room.name}
                </Button>
            ))}
        </Box>
    )
}

export default RoomsList