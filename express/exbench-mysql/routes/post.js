var models = require('../models/models');
var Post = models.Post;
var Comment = models.Comment;

exports.getJSON = function(req, res) {
  postLimit = parseInt(req.query.limit, 10);
  // Set default post limit
  postLimit = !isNaN(postLimit) ? postLimit : 100;

  Post
  .findAll({ limit: postLimit, order: 'pub_date DESC' })
  .success(function(posts) {

    var postsJSON = [];

    posts.forEach(function(post) {
      post
      .getComments()
      .success(function(comments) {
        var postData = {
          content: post.content,
          pub_date: post.pub_date,
          comments: comments.map(function(comment) {
            return {
              author: comment.author,
              body: comment.body
            };
          })
        };

        // construct JSON here
        postsJSON.push(postData);

        if (postsJSON.length === postLimit) {
          res.json(postsJSON);
        }
      });
    });

  });
};