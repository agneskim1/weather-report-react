import React from 'react'
import './CurrentWeather.css'
import { Button, ButtonGroup, Container } from '@chakra-ui/react'

const DailyWeather = ({temp, fahrenheit, setToFahrenheit, setToCelcius}) => {
    const temperature = fahrenheit ? Math.floor(temp) : Math.floor((temp-32)*5/9)
    const label = fahrenheit ? "F" : "C"
    
    return (
    <Container backgroundColor='tomato' textAlign='center'>
        <div>{temperature}°{label} 
            <ButtonGroup gap='2' display="flex" flexDirection="row" justifyContent='center'> 
                <Button onClick={setToFahrenheit}> F </Button>
                <Button onClick = {setToCelcius}> C </Button>
            </ButtonGroup>
        </div>
    </Container>
    )
}

export default DailyWeather;