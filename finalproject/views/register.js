$(document).ready(function(){

	//call the registration process
	document.getElementById("submit").onclick = registerFormValidation;
	
	//define errors array
	let errors = [];
	//validate the fields before registration
	function registerFormValidation(){
		
		let userNameValue = document.getElementById('username').value;
		let userName = userNameValue.toLowerCase();
		const userPassword = document.getElementById('userpassword').value;

		//clear the errors array and remove the error class from the filds
		errors.length = 0;
		document.getElementById("errors").innerHTML = "";
		document.getElementById("username").classList.remove("error");
		document.getElementById("userpassword").classList.remove("error");


		console.log(userName);
		console.log(userPassword);


		// check for empty fields
		if (userName == "") {
			stockError("please complete the username field", "username");
		}

		if (userPassword == "") {
			stockError("please complete the password field", "userpassword");
		} 

		//check if username has empty spaces
		if (/\s/.test(userName) ){
			stockError("username must not contain empty spaces", "username");
		} 

		//check if password has empty spaces
		if (/\s/.test(userPassword) ){
			stockError("password must not contain empty spacess", "userpassword");
		} 

		//check if username is not longer than 15 chars
		if ((userName.length > 15) || (userName.length < 6)){
			stockError("username too long or too short (max 15 chars, min 6)", "username");
		} 

		//check if passqord is not shorter than 6 chars
		if (userPassword.length < 6){
			stockError("short password (min 6)", "userpassword");
		} 


		// decide: proceed to register or show errors
		if (errors.length == 0){
			register(userName,userPassword);
			
		} else {
			console.log(errors);
			//display the errors-box
			document.getElementById("errors").classList.add("visible");

			for (var i = errors.length - 1; i >= 0; i--) {
				console.log(errors[i].message);
				if (errors[i].field == "username") {
					document.getElementById("username").classList.add("error");
				} else {
					document.getElementById("username").classList.remove("error");
				}
				if (errors[i].field == "userpassword") {
					document.getElementById("userpassword").classList.add("error");
				} else {
					document.getElementById("userpassword").classList.remove("error");
				}

				//display error messages
				document.getElementById("errors").innerHTML += "- " + errors[i].message + "<br>";
			}
		}
	}


	// catch and use message and field values to build the errors object
	function stockError(message, field) {
		let error = {};
		error.message = message;
		error.field = field;
		
		errors.push(error);
	}
	
	//registration (validation successfull)
	function register(username,userpassword){
		const errorsContainer = document.getElementById("errors");
		const successContainer = document.getElementById("success");

		let userRegister = new User();
		userRegister.username = username;
		userRegister.password = userpassword;

		userRegister.register()
		.then(data => {
	        if(data.authenticated){
	            document.getElementById("registration-form").classList.add("invisible");
        		errorsContainer.classList.add("invisible");
        		successContainer.classList.add("visible");
        		errorsContainer.classList.remove("visible");
        		errorsContainer.classList.add("invisible");
        		document.getElementById("go-to-login").classList.add("visible");
        		successContainer.innerHTML = "Successfully registered!";
	        } else{
	            errorsContainer.classList.add("visible");
	            errorsContainer.innerHTML = data.message;
	        }
	    });
	}

	// show password
	document.getElementById("showpassword").onclick = showPassword;
	function showPassword() {
    	const inputPassword = document.getElementById("userpassword");

	    if ( inputPassword.type === "password") {
	        inputPassword.type = "text";
	    } else {
	        inputPassword.type = "password";
	    }
	}
});