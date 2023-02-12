import { useState } from 'react';
import { findWeatherForecast} from '../../utils/api_calls';
import styles from './Home.module.css'
import LoaderUI from '../LoaderUI/LoaderUI';

export default function Home(props){
    const daysToSearchWeather = 1

    let APIData = ''
    let [initialLoader, setInitialLoader] = useState(1);
    let [city, setCity] = useState('Toronto');
    let [currentWeatherData, setCurrentWeatherData] = useState();
    let weatherAPIObjectKeys = currentWeatherData ? Object.keys(currentWeatherData) : null;


    async function handleSubmit(event){
        if(event){
            event.preventDefault();
        }
        APIData = await findWeatherForecast(city, daysToSearchWeather);

        setCurrentWeatherData(APIData.current)
    }
    console.log(weatherAPIObjectKeys)

    function displayLoaderUI(visibility){
        return <LoaderUI active={visibility}/>
    }

    function handleOnLoad(cb){
        if(initialLoader === 1){
            cb()
            setInitialLoader(initialLoader + 1)
        }
    }

    function displayWeatherData(){
        return (
                <div className={styles.astronomyInfo}>
                    <h1><i><u>{city} Weather Info</u></i></h1>
                    <div>   
                        {
                            weatherAPIObjectKeys 
                            ? (weatherAPIObjectKeys.slice(1, 10).map(key => 
                                <div>{key}: {key === 'condition' ? '' : currentWeatherData[key]}</div>
                                
                            )) 
                            : ''
                        
                        }
                    </div>
                    <div>   
                        {
                            weatherAPIObjectKeys 
                            ? (weatherAPIObjectKeys.slice(10, 23).map(key => 
                                <div>{key}: {key === 'condition' ? '' : currentWeatherData[key]}</div>
                                
                            )) 
                            : ''
                        
                        }
                    </div>

                </div>
               
            
        )
    }

    function handleChange(event){
        setCity(event.target.value)
    }

    return (
        <div className={styles.timeZoneContainer} onLoad={handleOnLoad(handleSubmit)}>
            <form className={styles.timeZoneInputFieldForm} onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter city name to find astronomy " value={city} name="cityAstronomy" onChange={handleChange}/>
              <button type="submit" >Search Location Astronomy</button>
            </form>
            <hr />
            {
               currentWeatherData ?  (displayWeatherData() ? displayWeatherData() : displayLoaderUI(false)): displayLoaderUI(true)
                
            }
        </div>
    )
}