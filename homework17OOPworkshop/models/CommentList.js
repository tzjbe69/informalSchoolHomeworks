/* global $*/
/* global Comment*/
function CommentList() {
    //Create an array of comments
    this.models = [];
}

CommentList.prototype.getComments = function() {
    var that = this;
    // get the comments from post with id that.postId
    return $.ajax('https://jsonplaceholder.typicode.com/comments?postId=' + that.postId, {
        method: 'GET',
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                var commentData = response[i];
                // new instance of comment
                var commentModel = new Comment();
                // populate this instance of comments
                commentModel.id = commentData.id;
                commentModel.postId = commentData.postId;
                commentModel.id = commentData.id;
                commentModel.name = commentData.name;
                commentModel.email = commentData.email;
                commentModel.body = commentData.body;
                //put them into array
                that.models.push(commentModel);
            }
        }, 
        error: function() {
            console.log("error loading API");
        }
    });
};

