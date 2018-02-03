/*global fetch*/
/*global getCookies*/

const pageURL = "https://ancient-caverns-16784.herokuapp.com/auth/";

function User(){
    this.authenticated = false;
    this.accessToken = "";
    this.id = "";
	this.username = "";
	this.password = "";
    this.message ="";
}

User.prototype.register = function(event){
    return fetch(pageURL + 'register/',{
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'username=' + this.username + '&' + 'password=' + this.password
    })
    .then(data => data.json())
    .catch((err) => console.log('Registration error: ' + err));
};

User.prototype.login = function() {
    return fetch(pageURL + 'login', {
        method: 'POST',
        body: 'username=' + this.username + '&password=' + this.password,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        return response.json();
    })
}

User.prototype.logOutFunction = function(){
    fetch(pageURL + 'logout', {
        method: 'GET',
        headers: {'x-auth-token': getCookies().accessCookie}
    })
    .then((response) => (response.json()))
    .then((response) => this.message = response.message)
    .catch((err) => console.log('Unidentified error: ' + err));
};