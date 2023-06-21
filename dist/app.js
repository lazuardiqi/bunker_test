"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const sqlite3_1 = require("sqlite3");
const app = (0, express_1.default)();
const port = 3000;
const db = new sqlite3_1.Database('db.sqlite');
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/noblePrizes/:pages?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pages = +req.params.pages;
    try {
        const result = yield axios_1.default.get('http://api.nobelprize.org/2.1/nobelPrizes', {
            headers: { Accept: 'application/json' },
            params: {
                nobelPrizeYear: '1901',
                yearTo: new Date().getFullYear(),
                offset: pages * 25,
                format: 'csv',
                csvLang: 'en'
            }
        });
        res.send(result === null || result === void 0 ? void 0 : result.data);
    }
    catch (error) {
        console.log(error);
        res.send({ result: 'error', message: error.message });
    }
}));
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
        });
    });
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map