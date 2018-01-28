/* global $ */
/* global Article */
/* global CommentList */
//  This I want to be global so I declare it here before load function
var idFromUrl = getArticleIdFromURL();
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
            window.location.href = "articles.html";
            //return 1;
        }
    }
}

$(document).ready(function() {
    // Always add this check for HTML ready on views
    // since they are the ones reading/writing from HTML
    var articleModel = new Article();
    // getArticle method
    
    articleModel.id = idFromUrl;
    articleModel.getArticle()
            .then(displayArticle);
    function displayArticle() {
        // Search for main container to append data to
        var contentEl = document.getElementById('content');
        // Create elements
        var articleEl = document.createElement('article');
        var articleTitleEl = document.createElement('h3');
        var articleBodyEl = document.createElement('p');
        // set data from model to newly created elements
        articleTitleEl.innerHTML = articleModel.title;
        articleBodyEl.innerHTML = articleModel.body;
        // append elements to their parents
        articleEl.appendChild(articleTitleEl);
        articleEl.appendChild(articleBodyEl);
        contentEl.appendChild(articleEl);
    }
    //create new instance of comment
    var commentList = new CommentList();
    commentList.postId = idFromUrl;
    //call functions
    commentList.getComments().then(displayComments);
    //function to make the HTML for displaing comments
    function displayComments() {
        var commentsList = document.getElementById('comments-list');
        //go through comments model array and makes the html
        for (var i = 0; i < commentList.models.length; i++) {
            //create elements
            var commentEl = document.createElement('div');
            commentEl.className = 'comment';
            var commentsEmailEl = document.createElement('p');
            var commentsNameEl = document.createElement('h3');
            var commentsBodyEl = document.createElement('p');
            commentsEmailEl.className = 'comment-email';
            commentsBodyEl.className = 'comment-body';
            //updates the DOM with elements
            commentsBodyEl.appendChild(commentsNameEl);
            commentsEmailEl.innerHTML = commentList.models[i].email + ':';
            commentsNameEl.innerHTML = commentList.models[i].name;
            commentsBodyEl.innerHTML += commentList.models[i].body;
            commentEl.appendChild(commentsEmailEl);
            commentEl.appendChild(commentsBodyEl);
            commentsList.appendChild(commentEl);
        }
    }
});