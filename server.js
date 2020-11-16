const express = require('express');

const connect = require('./connect');

require('dotenv').config();

const categoriesRoutes = require('./routes/categories');
const locationsRoutes = require('./routes/locations');
const assetsRoutes = require('./routes/assets');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the Asset Manager API');
});

app.use('/api/categories', categoriesRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/assets', assetsRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(500)
    .json({ error: 'Server Error', code: err.code, message: err.message });
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
