import { useState } from 'react';
import { findLocationAstronomy} from '../../utils/api_calls';
import styles from './LocationAstronomy.module.css'
import LoaderUI from '../LoaderUI/LoaderUI';

export default function LocationAstronomy(props){
    let APIData = ''
    let [initialLoader, setInitialLoader] = useState(1);
    let [city, setCity] = useState('Toronto');
    let [astronomyData, setAstronomyData] = useState();
    let [locationData, setLocationData] = useState();


    async function handleSubmit(event){
        if(event){
            event.preventDefault();
        }
        APIData = await findLocationAstronomy(city);
        setAstronomyData(APIData.astronomy.astro)
        setLocationData(APIData.location)
        console.log(APIData)

    }

    function handleOnLoad(cb){
        if(initialLoader === 1){
            cb()
            setInitialLoader(initialLoader + 1)
        }
    }

    function displayLoaderUI(visibility){
        return <LoaderUI active={visibility}/>
        
    }

    function displayAstronomyData(){
        return (
            <>
                {
                    astronomyData 
                    && (
                        <div className={styles.astronomyInfo}>
                            <h1><i><u>Astronomy Info</u></i></h1>
                            <p>Local time : {locationData.localtime}</p>
                            <p>Sunrise : {astronomyData.sunrise}</p>
                            <p>Sunset : {astronomyData.sunset}</p>
                            <p>Moonrise : {astronomyData.moonrise}</p>
                            <p>Moonset : {astronomyData.moonset}</p>
                            <p>Moon Phase : {astronomyData.moon_phase}</p>
                            <p>Moon Illumination : {astronomyData.moon_illumination}</p>

                            <hr />

                            <h1><i><u>Location Info</u></i></h1>
                            <p>Timezone : {locationData.tz_id}</p>
                            <p>City Name : {locationData.name}</p>
                            <p>Region : {locationData.region}</p>
                            <p>Country : {locationData.country}</p>
                        </div>
                    )
                }
            </>
               
            
        )
    }

    function handleChange(event){
        setCity(event.target.value)
    }

    return (
        <div className={styles.astronomyContainer} onLoad={handleOnLoad(handleSubmit)}>
            <form className={styles.astronomyInputFieldForm} onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter city name to find astronomy " value={city} name="cityAstronomy" onChange={handleChange}/>
              <button type="submit" >Search Location Astronomy</button>
            </form>
            <hr />
            {
               astronomyData ?  (displayAstronomyData()  ?  displayAstronomyData() : displayLoaderUI(false)): displayLoaderUI(true)
                
            }
        </div>
    )
}