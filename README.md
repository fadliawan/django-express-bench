## Django vs Express Stack Quick Benchmark

The speedtests involve common stack of Python + Django + SQL versus Node.js + Express + NoSQL for
web applications. There's also Express + MySQL stack included inside `express` folder but the 
Sequelize.js ORM query isn't optimized (?) resulting in very slow performance.

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

Apache Bench making 1000 requests with 20 concurrent connections.

    ab -n 1000 -c 20 http://host:port/api/posts/?limit=10

As for Express-MySQL it's soo underperforming so for the moment I ran it against only 100
requests to prevent it boiling my CPU :(

Test results can be found inside `results/` folder.

### How to setup

Setting up both apps is pretty simple.

#### Setting up Djench

1. Install [pip](https://pypi.python.org/pypi/pip) and [virtualenv](https://pypi.python.org/pypi/virtualenv‎)
2. Install MySQL if you don't have it. For example: `brew install mysql` then `mysql.server start`
2. Create a `virtualenv` and activate it: `$ source <venv-path>/bin/activate`
3. Move to Djench root: `$ cd <your-path>/django/djench/`
4. `$ pip install -r requirements.txt`
5. Configure your database by editing `djench/settings.py`
6. Populate MySQL data*
7. Start the Gunicorn: `$ gunicorn -w 4 djench.wsgi:application`

##### *Populate MySQL data

1. Run Django shell: `$ python manage.py shell`
2. Populate the data

```python
from blog.populate import *
populate_post()
populate_comment()
```

#### Setting up Exbench

1. Install [Node.js](http://nodejs.org)
2. Install [MongoDB](http://mongodb.org) and run `$ mongod`. Don't forget to create `exbench` database.
3. Move to Exbench root: `$ cd <your-path>/express/exbench/`
4. Install all packages: `$ npm install`
5. Populate MongoDB data*
6. Start the app: `$ npm start`

##### *Populate MongoDB data

1. Run `$ node` inside Exbench root
2. Populate the data

```javascript
var populateData = require('./models/populate').populatePostAndComment;
populateData();
```