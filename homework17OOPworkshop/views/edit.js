/* global $ */
/* global Article */
$(document).ready(function() {
    // Always add this check for HTML ready on views
    // since they are the ones reading/writing from HTML
    var articleModel = new Article();

    // getArticle method
    articleModel.id = getArticleIdFromURL();
    articleModel.getArticle()
            .then(displayArticle)
            .then(addEvents);
    function displayArticle() {
        // Search for main container to append data to
        // Changed the content of the origina ldisplayArticle function, 
        // because here I need to edit this content
        var contentEl = document.getElementById('content');
        // Create elements
        var formEl = document.createElement('form');
        var formInputLabelTitle = document.createElement('label');
        var formInputTitle = document.createElement('input');
        var formInputLabelContent = document.createElement('label');
        var formInputContent = document.createElement('textarea');
        // set data from model to newly created elements
        formInputLabelTitle.innerHTML = 'Titlu Articol';
        formInputTitle.value = articleModel.title;
        formInputLabelContent.innerHTML = 'Continut articol';
        formInputContent.value = articleModel.body;
        // append elements to their parents
        formEl.appendChild(formInputLabelTitle);
        formEl.appendChild(formInputTitle);
        formEl.appendChild(formInputLabelContent);
        formEl.appendChild(formInputContent);
        contentEl.appendChild(formEl);
        //Create and append articles to buttons div
        var buttons = document.getElementById('buttons');
        var saveButton = document.createElement('button');
        var cancelButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        saveButton.id = 'save-article';
        cancelButton.innerHTML = 'Go Back';
        cancelButton.id = 'cancel';
        buttons.appendChild(saveButton);
        buttons.appendChild(cancelButton);
    }
    // Function to get the id from URL
    function getArticleIdFromURL() {
        // This is for the case we have multiple variables in URL
        var query = window.location.search.substring(1).split('&');
        for (var i = 0; i < query.length; i++) {
            var queryTemp = query[i].split('=');
            // if is the one wee need just returns the value
            if(queryTemp[0] === 'articleId') {
                return queryTemp[1];
            } else {
                //this is just in case we do not find the value, returs the first article
                //I set this not to crash...
                alert("ArticleId is invalid! You will be redirected");
                window.open("articles.html");
                //return 1;
            }
        }
    }
    // function for adding buttons events
    function addEvents() {
        // save button
        document.getElementById('save-article').addEventListener('click', saveArticle);
        function saveArticle() {
            articleModel.title = document.getElementsByTagName('input')[0].value;
            articleModel.body = document.getElementsByTagName('textarea')[0].value;
            articleModel.editArticle().then(function(response) {
                return response.json();
            }).then(function(response) {
                //to see that everything is ok
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
        //Cancel button - go back button
        document.getElementById('cancel').addEventListener('click', function() {
            window.history.go(-1);
        });
    }
})