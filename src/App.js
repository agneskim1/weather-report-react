import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [location, setLocation] = React.useState("")

  const updateLocation = (location) => {
    setLocation(location)
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
  );
}

export default App;
