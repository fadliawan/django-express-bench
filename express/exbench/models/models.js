var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postSchema = new Schema({
  content: String,
  pub_date: { type: Date, default: Date.now },
  comments: [{ author: String, body: String }]
});

// Post model
var Post = mongoose.model('Post', postSchema);

exports.Post = Post;