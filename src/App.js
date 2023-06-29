import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import axios from 'axios'
import { ChakraProvider, Box, Container, Image, SimpleGrid} from '@chakra-ui/react'

function App() {
  const [location, setLocation] = React.useState("Atlanta")
  const [temp, setTemp] = React.useState(0)
  const [weatherConditions, setWeatherConditions] = React.useState("01d")
  const [weekWeatherData, setWeekWeatherData] = React.useState([])
  const [fahrenheit, setFahrenheit] = React.useState(true)

  React.useEffect(()=> {
    findTemp(location)
  },[])
  
  const setToFahrenheit = () => {
    setFahrenheit(true)
  }
  const setToCelcius =()=> {
    setFahrenheit(false)
  }

  const updateLocation = (location) => {
    setLocation(location)
    findTemp(location)
    findWeekTempData(location)
  }
  //Location API
  const findLatitudeAndLongitude = async (city) => {
    try {
        const response = await axios.get('https://weather-report-proxy-server-jk7z.onrender.com/location',
        {
            params: {
                q: city,
            }
        });
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;
    return {latitude, longitude};
    } catch (err) {
        console.log(err.message)
    }}
  //OpenWeatherAPI
  const findTemp = async () => {
    let {latitude, longitude} = await findLatitudeAndLongitude(location)
    try {
      const response = await axios.get(`https://weather-report-proxy-server-jk7z.onrender.com/weather`,{
          params: {
              "lat": latitude,
              "lon": longitude,
          }
      })
      const currentTemp = response.data.main.temp; 
      setTemp(currentTemp)
      const currentCondition = response.data.weather[0].icon
      setWeatherConditions(currentCondition)
    } catch (error) {
      console.log(error, "Temperature could not be found.")
  }
  }
  //OpenWeather 5 Day API
  const findWeekTempData = async () => {
    let {latitude, longitude} = await findLatitudeAndLongitude(location)
    try {
      const response = await axios.get(`https://weather-report-proxy-server-jk7z.onrender.com/weather/daily`,{
          params: {
              "lat": latitude,
              "lon": longitude,
          }
      })
      const weekTempData = response.data.list; 
      setWeekWeatherData(weekTempData)
    } catch (error) {
      console.log(error, "Temperature could not be found.")
  }}

  //TemperatureIcon2
  const weatherConditionIcon = () => {
    return (
      <Image boxSize='10vh' alt="weather condition icon" src={`https://openweathermap.org/img/wn/${weatherConditions}@2x.png`}/>
    )
  }

  const weeklyTemperatures = () => {
    return (
      weekWeatherData.map((day, index)=> {
        return (
          <ol className="temp-list" key={index}>
              <DailyWeather maxTemp ={day.main.temp_max} minTemp={day.main.temp_min} fahrenheit={fahrenheit} icon={day.weather[0].icon}/>
          </ol>
        )
      })
    )
  }
  // bgGradient='linear(to-l, #0181C2, #04A7F9, #4BC4F7)' border='2px black solid'
  return (
    <ChakraProvider >
    <Container height='100%' width='100%' >
      {/* <body className="main"> */}
        <h2 className="location-header">{location}</h2>
        <SearchBar margin={4} locationCallBack = {updateLocation}/>
        <Box display='flex' justifyContent='center' marginTop={10}> {weatherConditionIcon()} </Box>
        <Box display="flex" flexDirection="column"><CurrentWeather temp = {temp} fahrenheit={fahrenheit} setToFahrenheit={setToFahrenheit} setToCelcius={setToCelcius}/> </Box>
        <SimpleGrid display='flex' justifyContent='center' marginTop={20} columns={5} centerContent spacing={2}> {weeklyTemperatures()} </SimpleGrid>
      {/* </body> */}
    </Container>
    </ChakraProvider>
  )
}

export default App;
