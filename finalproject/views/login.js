
window.onload = function() {

    Utils.ready();

    const submitBtn = document.querySelector('.submit-button');
    const usernameInput = document.getElementsByTagName('input')[0];
    const passwordInput = document.getElementsByTagName('input')[1];
    const loginNotif = document.querySelector('.login-notification');
    const loginForm = document.querySelector('.login-form');

    submitBtn.addEventListener('click', (event) => {
    	event.preventDefault();

        const userLogin = new User();

        userLogin.username = usernameInput.value;
        userLogin.password = passwordInput.value;

        userLogin.login()
            .then(response => {
            	if(response.authenticated) {
                	document.cookie = 'accessCookie=' + response.accessToken;
                    document.cookie = "username=" + userLogin.username;
                    loginNotif.innerHTML = "<h5>Login Successful, young Padawan " + userLogin.username + ". You will now" + 
                    " be redirected to the Home Page.</h5>";
                    loginNotif.style.backgroundColor = "#07b001";
                    // loginNotif.style.marginTop = "25%";
                    // loginForm.style.marginTop = "25%";
                	setTimeout(() => {document.location.href = "home.html"}, 3000);
            	} else {
                    loginNotif.innerHTML = "<h5>Your username/password is incorrect.</h5>";
                    loginNotif.style.backgroundColor = "#ba1a14";
                    // loginNotif.style.marginTop = "25%";
                    // loginForm.style.marginTop = "25%";
                }
            });
    });
}

