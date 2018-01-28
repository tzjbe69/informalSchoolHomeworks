/* global Article */
/* global ArticleList */
/* global $ */


$(document).ready(function () {
    // New instance of ArticleList
    var articleList = new ArticleList();
    articleList.getArticles()
        .then(displayArticles)
        .then(addEvents)
        .then(function() {
            // This is for pagination, on first load of the page to show the first page
            pageArticles(1);
        });
    // Functions definitions that I called earlier
    //This is for displaing the articles list
    function displayArticles() {
        var articlesContent = document.getElementById('articles-content');
        articlesContent.innerHTML = '';
        for (var i = 0; i < articleList.models.length; i++) {
            //create elements
            var articleElement = document.createElement('article');
            var articleTitleElement = document.createElement('h3');
            var articleBodyElement = document.createElement('p');
            var buttonEditArticle = document.createElement('button');
            var buttonRemoveArticle = document.createElement('button');
            var articleIdFromI = document.createElement('div');
            // add classes, id and text to elements
            articleIdFromI.innerHTML = i+1;
            articleIdFromI.style.visibility = 'hidden';
            buttonEditArticle.className = 'edit-article';
            buttonRemoveArticle.className = 'remove-article';
            articleTitleElement.innerHTML = articleList.models[i].title;
            articleBodyElement.innerHTML = articleList.models[i].body.slice(0, 40) + "... <br><a href='article.html?articleId=" + (i + 1) + "'>Read more...</a>";
            buttonEditArticle.textContent = 'Edit';
            buttonRemoveArticle.textContent = 'Delete';
            // append elements to DOM
            articleElement.appendChild(articleTitleElement);
            articleElement.appendChild(articleBodyElement);
            articleElement.appendChild(buttonEditArticle);
            articleElement.appendChild(buttonRemoveArticle);
            articleElement.appendChild(articleIdFromI);
            articlesContent.appendChild(articleElement);
        }
        //Create add article button at the end of the article list
        var addArticleButtonZone = document.getElementById('add-button-id');
        var addNewArticleButton = document.createElement('button');
        addNewArticleButton.innerHTML = 'Add Article';
        addNewArticleButton.id = 'add-article';
        addArticleButtonZone.appendChild(addNewArticleButton);
    }
    // Add events to the buttons
    function addEvents() {
        // get buttons from DOM
        var bttnEditArticleEv = document.getElementsByClassName('edit-article');
        var bttnDeleteArticleEv = document.getElementsByClassName('remove-article');
        var bttnAddNewArticleEv = document.getElementById('add-article');
        for (var i = 0; i < bttnEditArticleEv.length; i++) {
            //For each edit
            bttnEditArticleEv[i].addEventListener('click', function(event){
                window.location.href = "edit.html?articleId=" + event.path[1].childNodes[4].innerHTML;
            });
            // For delete button 
            bttnDeleteArticleEv[i].addEventListener('click', function(event){
                var deleteArt = new Article();
                var that = event;
                deleteArt.id = event.path[1].childNodes[4].innerHTML;
                deleteArt.removeArticle().then(function(response) {
                    that.path[1].remove();
                }).then(function() {
                    var page = $('.sel').text();
                    pageArticles(page);
                });
            });
        }
        // Only one add new article bttn
        bttnAddNewArticleEv.addEventListener('click', function(event) {
            window.location.href = "create.html";
        });
    }
    // Function for pagination
    function pageArticles(pgNb) {
        // Items on page ... I can make this as a dropdown list to change everytime when I change that value...
        var itemsOnPage = 10;
        //start from page 0...
        var pageNumber = 0;
        var articlesAll = $('article');
        var pageList = $('#page-list').html("");
        for (var i = 0; i < articlesAll.length; i++) {
            // page numbers
            if ((i - itemsOnPage) % itemsOnPage === 0) {
                pageNumber++;
                var pageItem = "<div class='number-of-page pull-left'>" + pageNumber + "</div>";
                pageList.append(pageItem);
            }
        }
        // I need this more than once
        var numberOfPage = $('.number-of-page');
        // making the pagination - I put it in separate function....
        paging(pgNb);
        // the function for paging
        function paging(pageNb) {
            articlesAll.hide();
            articlesAll.slice((pageNb - 1) * itemsOnPage, (pageNb * itemsOnPage)).show();
            numberOfPage.each(function() {
                // This is for styling the number of page/pages
                if($(this).text() != pageNb) {
                    $(this).removeClass('sel');
                } else {
                     $(this).addClass('sel');
                }
            });
        }
        // Here we change the page
        // add event on click to change the page
        pageNumber = numberOfPage.click(goToPage);
        //function to go on antoer page
        function goToPage() {
            var pgNb = $(this).text();
            paging(pgNb);
            return pgNb;
        }
    }
})