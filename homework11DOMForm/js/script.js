document.addEventListener("DOMContentLoaded", onHtmlLoaded);

function onHtmlLoaded() {
    //Variable declaration - made this here because I will need them in next functions...
    var form = document.getElementById('contact-form');
    var inputFields = document.getElementsByClassName('form-input');
    var responseField = document.getElementsByClassName('response');
    var textResponseField = document.getElementById('userName');
    document.getElementById('closeBttn').addEventListener('click', closeResponseTextBox);
    for (var i = 0; i < inputFields.length; i++){
        inputFields[i].addEventListener('keypress', function() {
            this.style.border = '1px solid black';
        });
    }
    form.addEventListener('submit', submitForm);
    // Function definitions
    function submitForm(e) {
        e.preventDefault();
        //Reset the response text box - if not it add user name after user name. Maybe it is a better way to do this but I do not know
        closeResponseTextBox();
        //Validates the form
        function validateForm() {
            var checker = true;
            for (var i = 0; i < inputFields.length; i++) {
                if (inputFields[i].value == '') {
                    inputFields[i].style.border = '1px solid red';
                    checker = false;
                } else {
                    inputFields[i].style.border = '1px solid black';
                }
            }
            return checker;
        }
        // Checks if the validation of the form is OK then makes the magic
        if (validateForm()) {
            for (var i = 0; i < responseField.length; i++) {
                responseField[i].style.visibility = 'visible';
            }
            textResponseField.textContent += inputFields[0].value;
            for (var i = 0; i < inputFields.length; i++) {
                if (inputFields[i].name == 'gender' && !inputFields[i].checked) {
                } else {
                    console.log(inputFields[i].name + ': ' + inputFields[i].value);
                }
            }
           this.reset(); 
        }
    }
    function closeResponseTextBox() {
        for (var i = 0; i < responseField.length; i++) {
            responseField[i].style.visibility = 'hidden';
            textResponseField.innerHTML = "";
        }
    }
}