## Django vs Express Quick Benchmark

Django setup:

1. Django
2. MySQL
3. Django ORM
4. Gunicorn WSGI server (4 workers spawned)

Express setup:

1. Express
2. MongoDB
3. Mongoose ODM
4. Built-in Node.js webserver

Both are tested on a mid-2012 1.8 GHz Macbook Air.

### Task:

Outputting some kBs of JSON data. Latest ten blog posts with their comments,
a simple one-to-many relationship. Database is populated with 1000 dummy posts,
each one has 10 comments.

### Benchmarking tool:

Apache Bench

    ab -n 10 -c 5 http://host:port/api/posts/?limit=10

Test results can be found inside `results/` folder.

### How to setup

Setting up both apps is pretty simple.

#### Setting up Djench

1. Install [pip](https://pypi.python.org/pypi/pip) and [virtualenv](https://pypi.python.org/pypi/virtualenv‎)
2. Create a `virtualenv` and activate it: `$ source <venv-path>/bin/activate`
3. Move to Djench root: `$ cd <your-path>/django/djench/`
4. `$ pip install -r requirements.txt`
5. Start the Gunicorn: `$ gunicorn -w 4 djench.wsgi:application`

#### Setting up Exbench

1. Install [Node.js](http://nodejs.org)
2. Install [MongoDB](http://mongodb.org) and run `$ mongod`
3. Move to Exbench root: `$ cd <your-path>/express/exbench/`
4. Install all packages: `$ npm install`
5. Start the app: `$ npm start`