import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios'

function App() {
  const [location, setLocation] = React.useState("")

  const updateLocation = (location) => {
    setLocation(location)
    findTemp(location)
  }
  //Location API
  const findLatitudeAndLongitude = async (city) => {
    let latitude, longitude;
    try {
        const response = await axios.get('https://weather-report-proxy-server-jk7z.onrender.com/location',
        {
            params: {
                q: city,

            }
        });
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
    return {latitude, longitude};
    } catch (err) {
        console.log(err.message)
    }}
  //OpenWeatherAPI
  const findTemp = async () => {
    const {latitude, longitude} = await findLatitudeAndLongitude(location)
    console.log(latitude, longitude)
    try {
      const response = await axios.get(`https://weather-report-proxy-server-jk7z.onrender.com/weather`,{
          params: {
              "lat": latitude,
              "lon": longitude,
          }
      })
      console.log(response.data.main.temp)
      const current_temp = response.data.main.temp; //in kelvin
      return current_temp
    } catch (error) {
      console.log(error, "Temperature could not be found.")
  }
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <h2>{location}</h2>
        <SearchBar locationCallBack = {updateLocation}/>
      </body>
    </div>
  )
}

export default App;
