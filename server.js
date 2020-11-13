const express = require('express');

const connect = require('./connect');

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('This is the Asset Manager API');
});

const listen = async () => {
  const conn = await connect(process.env.DB);
  if (conn) {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
};

listen();
