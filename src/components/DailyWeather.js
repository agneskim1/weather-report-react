import React from 'react'
import {ListItem, OrderedList, Box, Image} from '@chakra-ui/react'

function DailyWeather({condition, temp, fahrenheit, icon, weekDay}) {
    const weekday= () => {
        const weekdayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        if (weekDay > 6) {
            return weekdayList[weekDay-7]
        }else {
            return weekdayList[weekDay]
        }
    }
    const convertTemperature = (temp) => { 
        return fahrenheit ? Math.floor(temp) : Math.floor((temp-32)*5/9)
    }
    const weatherIcon = <Image alt="weather condition icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
    const label = fahrenheit ? "F" : "C"

    const convertedTemp = convertTemperature(temp)
    // const convertedMinTemp = convertTemperature(minTemp)
    return (
    <Box overflowX='auto' borderRadius={40} display="flex" justifyContent="center" textAlign="center" color='gray.50' backgroundColor='#CBD5E0' w={200} h={60}>
        <OrderedList styleType="none" className="temp-list" justifyContent="center" display='flex' flexDirection='column'textAlign='center'>
            <ListItem>{weekday()}</ListItem>
            <ListItem> {weatherIcon} </ListItem>
            <ListItem>{condition}</ListItem>
            <ListItem textAlign="center" >Temperature {convertedTemp}°{label}</ListItem>
            {/* <ListItem textAlign="center" justifyContent="center">Low {convertedMinTemp}°</ListItem> */}
        </OrderedList>
    </Box>
    )
}

export default DailyWeather