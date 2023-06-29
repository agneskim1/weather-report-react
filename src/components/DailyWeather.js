import React from 'react'

function DailyWeather({maxTemp, minTemp}) {
    return (
    <li>
        <div>DailyWeather</div>
        <section> {maxTemp}</section>
        <section> {minTemp}</section>
    </li>
    )
}

export default DailyWeather