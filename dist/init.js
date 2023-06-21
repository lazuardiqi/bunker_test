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
const axios_1 = __importDefault(require("axios"));
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database('db.sqlite');
function getNoblePrizes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, status } = yield axios_1.default.get('http://api.nobelprize.org/2.1/nobelPrizes', {
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
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            }
            else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
getNoblePrizes();
//# sourceMappingURL=init.js.map