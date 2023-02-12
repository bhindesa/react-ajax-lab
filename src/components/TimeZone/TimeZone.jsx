import { useState } from 'react';
import { findTimezone} from '../../utils/api_calls';
import styles from './TimeZone.module.css'
// import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import LoaderUI from '../LoaderUI/LoaderUI';

export default function TimeZone(props){
    let APIData = ''
    let [initialLoader, setInitialLoader] = useState(1);
    let [city, setCity] = useState('Toronto');
    let [timeZoneData, setTimeZoneData] = useState();

    async function handleSubmit(event){
        if(event){
            event.preventDefault();
        }
        APIData = await findTimezone(city);
        setTimeZoneData(APIData)
    }

    function handleOnLoad(cb){
        if(initialLoader === 1){
            cb()
            setInitialLoader(initialLoader + 1)
        }
    }
    

    function displayLoaderUI(visibility){
        return <LoaderUI active={visibility}/>
        // return <div class="ui segment loaderUI">
        //             <div class="ui active dimmer">
        //                 <div class="ui indeterminate text loader">Waiting to search Timezone</div>
        //             </div>
        //             <p></p>
        //         </div>
    }

    function displayTimeZoneData(){
        return (
            <>
                {
                    timeZoneData 
                    && (
                        <div className={styles.timeZoneInfo}>
                        <h1>Timezone Information</h1>
                        <p>Timezone : {timeZoneData.location.tz_id}</p>
                        <p>City Name : {timeZoneData.location.name}</p>
                        <p>Region : {timeZoneData.location.region}</p>
                        <p>Country : {timeZoneData.location.country}</p>
                        <p>Local time : {timeZoneData.location.localtime}</p>
                        <p>Latitude : {timeZoneData.location.lat}</p>
                        <p>Longitude : {timeZoneData.location.lon}</p>
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
        <div className={styles.timeZoneContainer}  onLoad={handleOnLoad(handleSubmit)}>
            <form className={styles.timeZoneInputFieldForm} onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter city name to find timezone " value={city} name="cityTimeZone" onChange={handleChange}/>
              <button type="submit" >Search Timezone</button>
            </form>
            <hr />
            {
               timeZoneData ?  (displayTimeZoneData() ? displayTimeZoneData() : displayLoaderUI(false)): displayLoaderUI(true)
                
            }
        </div>
    )
}