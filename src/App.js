import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import DateObject from "react-date-object";
import axios from 'axios'
import { ChakraProvider, Box, Container, Image, SimpleGrid} from '@chakra-ui/react'

function App() {
  const [location, setLocation] = React.useState("Atlanta")
  const [temp, setTemp] = React.useState(0)
  const [weatherConditions, setWeatherConditions] = React.useState("01d")
  const [weekWeatherData, setWeekWeatherData] = React.useState([])
  const [fahrenheit, setFahrenheit] = React.useState(true)
  
  React.useEffect(()=> {
    // findTemp(location)
    updateLocation(location)
  },[])
  
  let date = new DateObject()
  const month = date.month.name
  const day = date.day
  const weekday = date.weekDay.name

  const setToFahrenheit = () => {
    setFahrenheit(true)
  }
  const setToCelcius =()=> {
    setFahrenheit(false)
  }

  const updateLocation = (locationInput) => {
    setLocation(locationInput)
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

  //TemperatureIcon
  const weatherConditionIcon = () => {
    return (
      <Image alt="weather condition icon" src={`https://openweathermap.org/img/wn/${weatherConditions}@2x.png`}/>
    )
  }
  let newl = new Date()
  // console.log(newl.getDay())
  newl.setDate(newl.getDate()+1)
  //Sending the Weekly Temp data to DailyWeather
  const weeklyTemperatures = () => {
    return (
      weekWeatherData.map((day, index)=> {
        let weekday = new Date()
        return (
          <ol className="temp-list" key={index}>
              <DailyWeather weekDay = {weekday.getDay()+index} maxTemp ={day.main.temp_max} minTemp={day.main.temp_min} fahrenheit={fahrenheit} icon={day.weather[0].icon}/>
          </ol>
        )
      })
    )
  }
  // bgGradient='linear(to-l, #0181C2, #04A7F9, #4BC4F7)' border='2px black solid'
  return (
    <ChakraProvider >
    <Container height='100%' width='100%' >
        <h2 className="location-header">{location}</h2>
        <Container textAlign='center'>{weekday}, {month} {day} </Container>
        <SearchBar margin={4} locationCallBack = {updateLocation}/>
        <Box display='flex' justifyContent='center' marginTop={10}> {weatherConditionIcon()} </Box>
        <Box display="flex" flexDirection="column"><CurrentWeather temp = {temp} fahrenheit={fahrenheit} setToFahrenheit={setToFahrenheit} setToCelcius={setToCelcius}/> </Box>
        <SimpleGrid display='flex' justifyContent='center' marginTop={20} columns={5} spacing={2}> {weeklyTemperatures()} </SimpleGrid>
    </Container>
    </ChakraProvider>
  )
}

export default App;
