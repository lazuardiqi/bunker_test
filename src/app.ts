import express from 'express';
import axios from 'axios';
import { Database } from 'sqlite3';
const app = express();
const port = 3000;
const db = new Database('db.sqlite');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/noblePrizes/:pages?', async (req, res) => {
  let pages: number = +req.params.pages;
  try {
    const result = await axios.get('http://api.nobelprize.org/2.1/nobelPrizes', {
      headers: { Accept: 'application/json' },
      params: {
        nobelPrizeYear: '1901',
        yearTo: new Date().getFullYear(),
        offset: pages * 25,
        format: 'csv',
        csvLang: 'en'
      }
    });
    res.send(result?.data);
  } catch (error) {
    console.log(error);
    res.send({ result: 'error', message: error.message });
  }
});

app.get('/sqlite', (req, res, next) => {
  let sql = 'SELECT RANDOM() % 100 as result';
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        result: 'error',
        message: err.message
      });
      return;
    }
    res.json({
      result: 'success',
      data: rows
    })
  });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
