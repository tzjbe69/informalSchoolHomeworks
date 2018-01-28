/* global $ */
/* global fetch */

function Article() {
    this.title = "";
    this.body = "";
    this.id = null;
}

// Article.prototype.getArticle = function () {
//     // We are saving context (current article object) in that variable
//     // it will be used from ajax functions through Closure
//     var that = this;
//     return $.ajax('https://jsonplaceholder.typicode.com/posts/' + that.id, {
//         method: 'GET',
//         success: function(response) {
//             // "this" here refers to Request object, so we use "that"
//             that.title = response.title;
//             that.body = response.body;
//             //that.id = response.id;
//         },
//         error: function(err) {
//             alert('Getting article data failed, error: ' + err + " Maybe you did not click on an article, and just typed an URL");
//         }
//     });
// }

// Exemple with ES6
// Gets articles
Article.prototype.getArticle = function () {
    return $.ajax('https://jsonplaceholder.typicode.com/posts/' + this.id, {
        method: 'GET',
        success: response => {
            // Here this refers to this.. because of ES6
            this.title = response.title;
            this.body = response.body;
        },
        error: err => {
            alert('Getting article data failed, error: ' + err + " Maybe you did not click on an article, and just typed an URL");
        }
    });
};
// Add an new article
Article.prototype.addArticle = function() {
    var that = this;
    return $.ajax('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        data: {
            title: that.title,
            body: that.body
        },
        success: function(response) {
        },
        error: function(err) {
            alert('Getting article data failed, error: ' + err);
        }
    });
};
// Edit current article
Article.prototype.editArticle = function() {
    var that = this;
    //I use fetch because of PATCH - I want to modify only the 2 not all of them
    // id and userId remains the same
    // and I do not use PUT
    return fetch('https://jsonplaceholder.typicode.com/posts/' + that.id, {
        method: 'PATCH',
        body: JSON.stringify({
            title: that.title,
            body: that.body
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        error: function(err) {
            alert("There is something wrong: " + err);
        }
    });
};
// Removes article
Article.prototype.removeArticle = function() {
    var that = this;
    return $.ajax('https://jsonplaceholder.typicode.com/posts/' + that.id, {
        method: 'DELETE',
        success: function(response) {

        },
        error: function(err) {
            alert("There is something wrong: " + err);
        }
    });
};