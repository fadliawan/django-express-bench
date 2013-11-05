var Sequelize = require('sequelize');
// connect to MySQL db
var sequelize = new Sequelize('exbench-mysql', 'root', '4444');

var Post = sequelize.define('Post', {
  id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
  content: Sequelize.TEXT,
  pub_date: Sequelize.DATE
});

var Comment = sequelize.define('Comment', {
  id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
  author: Sequelize.TEXT,
  body: Sequelize.STRING
});

Post.hasMany(Comment);

exports.Post = Post;
exports.Comment = Comment;

// Sync tables (uncomment please)
// sequelize.sync({ force: true });