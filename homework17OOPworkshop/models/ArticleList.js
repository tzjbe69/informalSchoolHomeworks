/*global $*/
/*global Article*/

function ArticleList() {
    this.models = [];
}

ArticleList.prototype.getArticles = function() {
    // that - this for further use
    var that = this;
    return $.ajax('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                var articleData = response[i];
                //new article instance
                var article = new Article();
                //createa array
                article.title = articleData.title;
                article.body = articleData.body;
                article.id = articleData.id;
                // push it to models array
                that.models.push(article);
            }
        },
        //error handle
        error: function(err) {
            alert("Something is wrong. Please check: " + err);
        }
    });
};