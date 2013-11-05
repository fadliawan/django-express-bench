var models = require('../models/models');
var Post = models.Post;
var Comment = models.Comment;

exports.getJSON = function(req, res) {
  postLimit = parseInt(req.query.limit, 10);
  // Set default post limit
  postLimit = !isNaN(postLimit) ? postLimit : 100;

  Post
  .findAll({ limit: postLimit, order: 'pub_date DESC', include: [Comment] })
  .success(function(posts) {

    var postsJSON = posts.map(function(p) {
      return {
        content: p.content,
        pub_date: p.pub_date.toString(),
        comments: p.comments.map(function(c) {
          return {
            author: c.author,
            body: c.body
          };
        })
      };
    });

    // Send the data
    res.json(postsJSON);

  });
};