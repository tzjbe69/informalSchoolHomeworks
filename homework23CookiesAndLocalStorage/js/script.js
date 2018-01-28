/* global fetch */
/* global DOMException */
/* global localStorage */

window.onload = () => {
    // did it here and use arrow function
    const cookiesArr = () => {
        const cookiesString = document.cookie;
        const cookiesArray = cookiesString.split('; ');
        const cookies = {};
        cookiesArray.forEach( (c) => {
            const cookie = c.split('=');
            const key = cookie[0];
            const value = cookie[1];
            cookies[key] = value;
        });
        return cookies;
    };
    const tempSelected = storageAvailable('localStorage') ? localStorage.getItem('temperature') : cookiesArr('temperature');
    let radios = document.getElementsByName('temp');
    radios.forEach((radio) => {
        if(radio.value == tempSelected) {
            radio.checked = 'checked';
        }
        radio.addEventListener('click', function() { //here I do not use arrow function because of 'this'
            storageAvailable('localStorage') ? localStorage.setItem("temperature", this.value) : document.cookie = "temperature=" + this.value;
        });
    });
    const button = document.getElementById('bttn');
    button.addEventListener('click', () => {
        //I need cookies array in case I want to use it instead of localStorege, for getting the C/F later... 
        showWeather(cookiesArr);
    });
};

function showWeather(cookiesArr) {
    // I did not want to import the jquery, and I use fetch
    fetch('https://api.wunderground.com/api/ec21699b7ea6c246/geolookup/conditions/forecast/q/Romania/Cluj-Napoca.json', {
        method: 'GET'
        }).then(function(resp){
            return (resp.json());
        }).then(function(resp){
            let tempUnit = storageAvailable('localStorage') ? localStorage.getItem("temperature") : cookiesArr('temperature');
            //On first page enter if user does not select the temp, and just clicks get weather button I want to show the temp in Celsius
            let showTemp = tempUnit == 'f' ? resp.current_observation.temp_f + " F" : resp.current_observation.temp_c + " C";
            document.getElementById('show-temp').innerHTML = "Temperature in Cluj-Napoca is: " + showTemp;
        });
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}