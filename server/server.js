const express = require('express');
const app = express();
const parser = require('body-parser');
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })
  .then((client) => {
    const db = client.db('sweep_mate_db');
    const sweepstakesCollection = db.collection('sweepstakes');
    const sweepstakesRouter = createRouter(sweepstakesCollection);
    app.use('/api/sweepstakes', sweepstakesRouter);

    const playersCollection = db.collection('players');
    const playersRouter = createRouter(playersCollection);
    app.use('/api/players', playersRouter);
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
