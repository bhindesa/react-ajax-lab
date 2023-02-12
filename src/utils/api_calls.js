async function findWeatherForecast(city, days){
    const cityToSearch = city ? city : 'Toronto';
    const daysToSearchWeather = days ? days : 3;
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityToSearch}&days=${daysToSearchWeather}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f27fc184dfmsh69b58c397378ffap14fd46jsn6a8de2ebb3bf',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    try{
        const weatherForecastAPIResult = await fetch(url, options)
        const weatherForecastAPIJSONData = await  weatherForecastAPIResult.json();
        
        return weatherForecastAPIJSONData;
    }
    catch(err){
        console.error('error:' + err)
    }
}

async function findLocationAstronomy(city){
    const cityToSearch = city ? city : 'Toronto';
    const url = `https://weatherapi-com.p.rapidapi.com/astronomy.json?q=${cityToSearch}`;

    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f27fc184dfmsh69b58c397378ffap14fd46jsn6a8de2ebb3bf',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
    };

    try{
        const locationAstronomyAPIResult = await fetch(url, options)
        const locationAstronomyAPIJSONData = await locationAstronomyAPIResult.json();
        
        return locationAstronomyAPIJSONData;
    }
    catch(err){
        console.error('error:' + err)
    }

    fetch(url, options)
    //.then(res => res.json())
    .then(res => {
        console.log(res)
        res.json()
    })
    .then(json => console.log(json))
	.catch(err => console.error('error:' + err));
}

async function findTimezone(city){
    const cityToSearch = city ? city : 'Toronto';
    const url = `https://weatherapi-com.p.rapidapi.com/timezone.json?q=${cityToSearch}`;

    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f27fc184dfmsh69b58c397378ffap14fd46jsn6a8de2ebb3bf',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
    };

        try{
            const timeZoneAPIDResult = await fetch(url, options)
            const timeZoneApiJSONData = await timeZoneAPIDResult.json();
            return (
                timeZoneApiJSONData
            );
        }
        catch(err){
            console.error('error:' + err)
        }
    
}
module.exports = {
    findWeatherForecast,
    findLocationAstronomy,
    findTimezone
}