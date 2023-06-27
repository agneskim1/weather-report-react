import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios'

function App() {
  const [location, setLocation] = React.useState("")

  const updateLocation = (location) => {
    setLocation(location)
    const key = process.env.REACT_APP_LOCATION_KEY
    console.log(key)
    findLatitudeAndLongitude(location)
  }

  const findLatitudeAndLongitude = async (city) => {
    let latitude, longitude;
    try {
        const response = await axios.get('https://us1.locationiq.com/v1/search.php',
        {
            params: {
                q: city,
                key: process.env.LOCATION_KEY,
                format: "json"
            }
        });
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        console.log(latitude,longitude)
    return { latitude, longitude };
    } catch (err) {
        console.log(err.message)
    }}
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
