/*global $ */
/*global Article*/
$(document).ready(onHTMLLoad);

function onHTMLLoad() {
    var contentEl = document.getElementById('content');
    // Create elements
    var formEl = document.createElement('form');
    var formInputLabelTitle = document.createElement('label');
    var formInputTitle = document.createElement('input');
    var formInputLabelContent = document.createElement('label');
    var formInputContent = document.createElement('textarea');
    // set data from model to newly created elements
    formInputLabelTitle.innerHTML = 'Titlu Articol';
    formInputLabelContent.innerHTML = 'Continut articol';
    // append elements to their parents
    formEl.appendChild(formInputLabelTitle);
    formEl.appendChild(formInputTitle);
    formEl.appendChild(formInputLabelContent);
    formEl.appendChild(formInputContent);
    contentEl.appendChild(formEl);
    //Buttons
    var buttons = document.getElementById('buttons');
    var saveButton = document.createElement('button');
    var cancelButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    saveButton.id = 'save-article';
    cancelButton.innerHTML = 'Go Back';
    cancelButton.id = 'cancel';
    buttons.appendChild(saveButton);
    buttons.appendChild(cancelButton);
    // Event on Save
    document.getElementById('save-article').addEventListener('click', saveArticle);
    function saveArticle() {
        //New instance
        var articleNew = new Article();
        // set the values
        articleNew.title = document.getElementsByTagName('input')[0].value;
        articleNew.body = document.getElementsByTagName('textarea')[0].value;
        articleNew.addArticle().then(function(response) {
            var responseElement = document.getElementById('response');
            var responseDivEl = document.createElement('div');
            var responseSpanEl = document.createElement('span');
            responseDivEl.innerHTML = "The response title is: " + response.title + "<br>And the response body is: " + response.body;
            responseDivEl.innerHTML += "<br>You will be redirected in ";
            responseElement.appendChild(responseDivEl);
            // A little timer ... just for fun
            var i = 4;
            // this runs every seccond
            setInterval(function(){
                responseSpanEl.innerHTML = i;
                if (i === 0){
                    responseSpanEl.innerHTML += ' Bye!';
                }
                responseDivEl.appendChild(responseSpanEl);
                i--;
            }, 1000);
            //this runs after 5.2 second...
            setTimeout(function(){
                window.history.go(-1);
            }, 5200);
        });
    }
    //Event on go back
    document.getElementById('cancel').addEventListener('click', function() {
        window.history.go(-1);
    });

}
