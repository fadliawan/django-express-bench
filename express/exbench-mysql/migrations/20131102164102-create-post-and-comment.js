module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable(
      'posts',
      {
        content: DataTypes.TEXT,
        pub_date: DataTypes.DATE,
        id: DataTypes.BIGINT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      }
    );

    migration.createTable(
      'comments',
      {
        author: DataTypes.TEXT,
        body: DataTypes.STRING,
        id: DataTypes.BIGINT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        postId: DataTypes.BIGINT
      }
    );

    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
