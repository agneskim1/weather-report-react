import React from 'react'
import DailyWeather from './CurrentWeather'

const WeeklyWeather = ({weekWeatherData}) => {
  console.log(weekWeatherData, "weekly")
  const dailyWeatherData = weekWeatherData.map((daily, index)=> {
    console.log("daily", daily)
    return (
      <ol key={index}>
        Hi
        {/* <DailyWeather dailyTemp={daily.main.temp}/> */}
      </ol>
    )
  })
  return (
    <div>
      <div>WeeklyWeather</div>
      {dailyWeatherData}
    </div>
  )
}

export default WeeklyWeather