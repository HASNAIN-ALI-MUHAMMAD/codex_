import express from 'express';
import "dotenv/config"
import { Embed } from './embeddings/index.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', async (req, res) => {
  console.log(await Embed())
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('App listening on port',PORT);
});