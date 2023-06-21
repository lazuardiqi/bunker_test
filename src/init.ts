import axios from 'axios';
import { Database } from 'sqlite3';
const db = new Database('db.sqlite');

async function getNoblePrizes() {
  try {
    const { data, status } = await axios.get('http://api.nobelprize.org/2.1/nobelPrizes', {
      headers: { Accept: 'application/json' },
      params: {
        nobelPrizeYear: '1901',
        yearTo: new Date().getFullYear(),
        //offset: pages * 25,
        //format: 'csv',
        //csvLang: 'en'
      }
    });
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

getNoblePrizes();