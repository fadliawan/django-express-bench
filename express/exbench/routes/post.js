var Post = require('../models/models').Post;

exports.getJSON = function(req, res) {
	postLimit = req.query.limit || 1000;

	Post.find().limit(postLimit)
	.exec(function(err, posts) {
    var postsJSON = posts.map(function(post) {

      return {
        content: post.content,
        pub_date: post.pub_date.toString(),
        comments: post.comments.map(function(comment) {
          return {
            author: comment.author,
            body: comment.body
          }
        })
      };

    });

		res.json(postsJSON);
	});
};