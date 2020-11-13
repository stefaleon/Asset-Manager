const express = require('express');

const Category = require('./models/category');

const connect = require('./connect');

require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the Asset Manager API');
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = await new Category(req.body).save();
    res.status(200).json({ data: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
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
