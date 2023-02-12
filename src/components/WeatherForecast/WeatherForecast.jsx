import { useState } from 'react';
import { findWeatherForecast} from '../../utils/api_calls';
import styles from './WeatherForecast.module.css'
import LoaderUI from '../LoaderUI/LoaderUI';

export default function WeatherForecast(props){
    let APIData = ''
    let [city, setCity] = useState('Toronto');
    let [astronomyData, setAstronomyData] = useState();
    let [locationData, setLocationData] = useState();


    async function handleSubmit(event){
        event.preventDefault();
        APIData = await findWeatherForecast(city);
        // setAstronomyData(APIData.astronomy.astro)
        // setLocationData(APIData.location)
        console.log(APIData)
    }

   

    function displayLoaderUI(visibility){
        return <LoaderUI active={visibility}/>
        
    }

    function displayTimeZoneData(){
        return (
                <div className={styles.astronomyInfo}>
                    <h1>Astronomy Info</h1>
                    <p>Local time : {locationData.localtime}</p>
                    <p>Sunrise : {astronomyData.sunrise}</p>
                    <p>Sunset : {astronomyData.sunset}</p>
                    <p>Moonrise : {astronomyData.moonrise}</p>
                    <p>Moonset : {astronomyData.moonset}</p>
                    <p>Moon Phase : {astronomyData.moon_phase}</p>
                    <p>Moon Illumination : {astronomyData.moon_illumination}</p>
                    <hr />
                    <h1>Location Information</h1>
                    <p>Timezone : {locationData.tz_id}</p>
                    <p>City Name : {locationData.name}</p>
                    <p>Region : {locationData.region}</p>
                    <p>Country : {locationData.country}</p>
                </div>
               
            
        )
    }

    function handleChange(event){
        setCity(event.target.value)
    }

    return (
        <div className={styles.timeZoneContainer}>
            <form className={styles.timeZoneInputFieldForm} onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter city name to find astronomy " value={city} name="cityAstronomy" onChange={handleChange}/>
              <button type="submit" >Search Location Astronomy</button>
            </form>
            <hr />
            {
               astronomyData ?  (displayTimeZoneData() ?  displayTimeZoneData() : displayLoaderUI(false)): displayLoaderUI(true)
                
            }
        </div>
    )
}