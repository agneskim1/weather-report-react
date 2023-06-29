import React from 'react'
import './DailyWeather.css'
import { Button, ButtonGroup } from '@chakra-ui/react'

const DailyWeather = ({temp}) => {
    const [fahrenheit, setFahrenheiht] = React.useState(true)

    const setToFahrenheit = () => {
        setFahrenheiht(true)
    }
    const setToCelcius =()=> {
        setFahrenheiht(false)
    }
    const temperature = fahrenheit ? Math.floor(temp) : Math.floor((temp-32)*5/9)
    const label = fahrenheit ? "F" : "C"
    
    return (
    <div className="temp-container">
        <div>{temperature}°{label}
        <div className='temp-buttom'> 
            <ButtonGroup gap='2'> 
                <Button onClick={setToFahrenheit}> F </Button>
                <Button onClick = {setToCelcius}> C </Button>
            </ButtonGroup>
        </div>
        </div>
    </div>
    )
}

export default DailyWeather;