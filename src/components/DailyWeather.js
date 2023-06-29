import React from 'react'
import {ListItem, OrderedList, Box} from '@chakra-ui/react'

function DailyWeather({maxTemp, minTemp, }) {
    return (
    <Box borderRadius={40} display="flex" justifyContent="center" textAlign="center" color='gray.50' backgroundColor='tomato' w={200} h={40}>
        <OrderedList styleType="none" className="temp-list" justifyContent="center" display='flex' flexDirection='column'textAlign='center'>
            <ListItem textAlign="center" >High {maxTemp}</ListItem>
            <ListItem> IMAGE </ListItem>
            <ListItem textAlign="center" justifyContent="center">Low {minTemp}</ListItem>
        </OrderedList>
    </Box>
    )
}

export default DailyWeather