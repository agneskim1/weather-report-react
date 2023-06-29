import React from 'react'
import {ListItem, OrderedList, Box, Image} from '@chakra-ui/react'

function DailyWeather({maxTemp, minTemp, fahrenheit, icon}) {
    const convertTemperature = (temp) => { 
        return fahrenheit ? Math.floor(temp) : Math.floor((temp-32)*5/9)
    }
    const weatherIcon = <Image alt="weather condition icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>


    const convertedMaxTemp = convertTemperature(maxTemp)
    const convertedMinTemp = convertTemperature(minTemp)
    return (
    <Box borderRadius={40} display="flex" justifyContent="center" textAlign="center" color='gray.50' backgroundColor='#CBD5E0' w={200} h={40}>
        <OrderedList styleType="none" className="temp-list" justifyContent="center" display='flex' flexDirection='column'textAlign='center'>
            <ListItem> {weatherIcon} </ListItem>
            <ListItem textAlign="center" >High {convertedMaxTemp}°</ListItem>
            <ListItem textAlign="center" justifyContent="center">Low {convertedMinTemp}°</ListItem>
        </OrderedList>
    </Box>
    )
}

export default DailyWeather