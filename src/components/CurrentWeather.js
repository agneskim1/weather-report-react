import React from 'react'
import './CurrentWeather.css'
import { Button, ButtonGroup, Container, Heading } from '@chakra-ui/react'

const DailyWeather = ({temp, fahrenheit, setToFahrenheit, setToCelcius}) => {
    const temperature = fahrenheit ? Math.floor(temp) : Math.floor((temp-32)*5/9)
    const label = fahrenheit ? "F" : "C"
    
    return (
    <Container textAlign='center'>
        <Heading as='h4' padding='3vh'>{temperature}°{label} </Heading>
        <ButtonGroup gap='2' display="flex" flexDirection="row" justifyContent='center'> 
            <Button onClick={setToFahrenheit}> F </Button>
            <Button onClick = {setToCelcius}> C </Button>
        </ButtonGroup>
    </Container>
    )
}

export default DailyWeather;