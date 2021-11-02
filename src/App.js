import React, {useState} from "react";
import axios from 'axios';

const api = {
  key: '7beedcd716bb91a99f2dfbd7d36d07d9',
  base_url: 'https://api.openweathermap.org/data/2.5/'
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather ] = useState({});
  
  
  const fetchData = (e) => {
     if (e.key === 'Enter'){
      const endpoint = `${api.base_url}weather?q=${query}&units=metric&appid=${api.key}`;
      //console.log(endpoint);
      axios.get(endpoint).then(res => { 
        const data = res.data;
        setWeather(data);
        setQuery('');
        //console.log((data))
      })
     }  
  }

  //Input field handler
  function handleChange(e) {
    setQuery(e.target.value);
  }

 


  const dateBuilder = (d) => {
    let date = String(new window.Date()); //creates a new date object with current date and time
    date = date.slice(3,15); 

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];

    return `${day} ${date}`
  }




  return (
    <div className={
      ( typeof weather.main != 'undefined' ) 
      ? ((weather.main.temp > 16) 
        ? 'app warm'
        : 'app') 
      :'app'}>

      <main>
        <div className='search-box'>
          <input type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={handleChange}
            onKeyPress={fetchData}
            value={query}
          />
        </div>
        {
        (typeof weather.main != "undefined") ? (
        <div>
        <div className='location-box'>
          <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
        </div>

        <div className='weather-box'>
          <div className='temp'> 
            {Math.round(weather.main.temp)}°c
          </div>
          
          <div className='weather'>
            {weather.weather[0].main}
          </div>
        </div>
        </div>
        ):('')
        }
        
      </main>
    </div>
  );
}

export default App;
