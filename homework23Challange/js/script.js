/*global navigator*/
/*global fetch*/

window.onload = function() {
    const cookies = getCookiesAsObjects();
    // check to see if browser suports geolocation
    "geolocation" in navigator ? geoLocateMe() : errorGeoLocate();
    // If the browser suppoorts geolocation
    function geoLocateMe() {
        navigator.geolocation.getCurrentPosition(function(pos) {
            let latitude = pos.coords.latitude;
            let longitude = pos.coords.longitude;
            var urlAPI = "https://api.wunderground.com/api/ec21699b7ea6c246/conditions/q/";
            fetch(urlAPI + latitude + ',' + longitude + '.json', {
                method: 'GET'
                }).then(function(resp){
                    return (resp.json());
                }).then(function(resp){
                    showWeatherForCurrentLocation(resp.current_observation);
                });
            });
    }
    // Function for showing the weather on page
    function showWeatherForCurrentLocation(resp) {
        //Create elements to show on page
        const showWeather = document.getElementById('show-weather');
        const titleElement = document.createElement('h3');
        const temperatureElement = document.createElement('p');
        const iconElement = document.createElement('img');
        const uvIndiceElement = document.createElement('p');
        const windElement = document.createElement('p');
        const atmPressElement = document.createElement('p');
        const feelsLikeElement = document.createElement('p');
        //Populate the elements
        titleElement.innerHTML = "Weather conditions from: " + resp.display_location.full;
        temperatureElement.innerHTML = "Current temperature: <span id='real-temp'>" + showTempInCorF(resp.temp_c, resp.temp_f) + "</span>";
        iconElement.setAttribute('src', resp.icon_url);
        iconElement.setAttribute('alt', resp.icon);
        iconElement.id = 'icon';
        uvIndiceElement.innerHTML = "UV Indice: " + resp.UV;
        uvIndiceElement.id = 'uv';
        windElement.innerHTML = "Wind direction: " + resp.wind_dir + " and wind speed: " + resp.wind_kph + " km/h";
        windElement.id = 'wind';
        atmPressElement.innerHTML = "Athmmospheric pressure: " + resp.pressure_mb + " mmb";
        atmPressElement.id = 'atm_pressure';
        feelsLikeElement.innerHTML = "It feels like: <span id='feel-temp'>" + showTempInCorF(resp.feelslike_c, resp.feelslike_f) + "</span>";
        feelsLikeElement.id = 'feel_temp';
        //Append elements
        showWeather.appendChild(titleElement);
        showWeather.appendChild(temperatureElement);
        showWeather.appendChild(iconElement);
        showWeather.appendChild(uvIndiceElement);
        showWeather.appendChild(windElement);
        showWeather.appendChild(atmPressElement);
        showWeather.appendChild(feelsLikeElement);
        // I put the followings here because if the page does not support/does not get the data I will not have an error
        // Radio buttons actions
        // to set/get cookies and also on click to change display of temperature
        let radios = document.getElementsByName('temp');
        radios.forEach(function(radio){
            if (radio.value == cookies.temperature) {
                radio.checked = "checked";
            }
            radio.addEventListener('click', function(){
                document.cookie = "temperature=" + this.value;
                let realTemp = document.getElementById('real-temp');
                let feelTemp = document.getElementById('feel-temp');
                if (this.value == 'c') {
                    realTemp.innerHTML = resp.temp_c + " C";
                    feelTemp.innerHTML = resp.feelslike_c + " C";
                } else {
                    realTemp.innerHTML = resp.temp_f + " F";
                    feelTemp.innerHTML = resp.feelslike_f + " F";
                }
            });
        });
        // Checkboxes actions
        // to set/get cookies and also on click to show/hide elements on page
        let checboxes = document.getElementsByName('conditions');
        checboxes.forEach(function(checkbox) {
            let checkedElement = document.getElementById(checkbox.value);
            if(cookies[checkbox.value] == 'true') {
                checkbox.checked = true;
                checkedElement.style.display = 'block';
            } else {
                checkedElement.style.display = 'none';
            }
            checkbox.addEventListener('click', function(){
                checkedElement = document.getElementById(this.value);
                document.cookie = this.value + "=" + this.checked;
                if(checkedElement.style.display == 'block') {
                    checkedElement.style.display = 'none';
                } else if(checkedElement.style.display == 'none') {
                    checkedElement.style.display = 'block';
                }
            });
        });
    }
    // Getting cookies
    function getCookiesAsObjects() {
        const cookiesString = document.cookie;
        const cookiesArray = cookiesString.split('; ');
        const cookies = {};
        cookiesArray.forEach(function(c) {
            const cookie = c.split('=');
            const key = cookie[0];
            const value = cookie[1];
            cookies[key] = value;
        });
        return cookies;
    }
    // Function for getting the C or F temperature 
    function showTempInCorF(temp_c, temp_f){
        var returnTemp = cookies.temperature == 'c' ? temp_c + " C" : temp_f + " F";
        return returnTemp;
    }
    // If Browser does not support geolocate
    function errorGeoLocate(err) {
        document.getElementsByTagName('body')[0].innerHTML = "Your Browser does not suport GeoLocation. Change Browser! Or equivelent error: " + + err.code + ": " + err.message ;
    }
};



