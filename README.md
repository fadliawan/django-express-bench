## Django vs Express Quick Benchmark

Django setup:

1. Django
2. MySQL
3. Django ORM
4. Gunicorn WSGI server (4 workes spawned)

Express setup:

1. Express
2. MongoDB
3. Mongoose ODM
4. Built-in Node.js webserver

Both are tested on a mid-2012 1.8 GHz Macbook Air.

Task: Outputting some kBs of JSON data. Latest ten blog posts with their comments,
a simple one-to-many relationship. Database is populated with 1000 dummy posts,
each one has 10 comments.

Benchmarking tool: Apache Bench

    ab -n 10 -c 5 http://host:port/api/posts/?limit=10

Test results can be found inside `results/` folder.