"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = __importStar(require("sqlite3"));
/* tslint:disable-next-line:no-var-requires */
global.crypto = require('crypto');
/* tslint:disable-next-line:no-var-requires */
var promisify = require("util").promisify;
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var run = function (db) { return promisify(db.run.bind(db)); };
var get = function (db) { return promisify(db.get.bind(db)); };
function initUserDB() {
    return __awaiter(this, void 0, void 0, function () {
        var db, pass, pass_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sqlite3.verbose();
                    db = new sqlite3.Database('baza.db');
                    return [4 /*yield*/, run(db)("BEGIN TRANSACTION;")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, run(db)("DROP TABLE IF EXISTS users")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, run(db)('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), password VARCHAR(255), last_pass_id VARCHAR(255));')];
                case 3:
                    _a.sent();
                    pass = sha256_1.default("user1").toString();
                    pass_id = sha256_1.default(Math.random().toString()).toString();
                    return [4 /*yield*/, run(db)('INSERT INTO users (username, password, last_pass_id) VALUES (?, ?, ?)', ["user1", pass, pass_id])];
                case 4:
                    _a.sent();
                    pass = sha256_1.default("user2").toString();
                    pass_id = sha256_1.default(Math.random().toString()).toString();
                    return [4 /*yield*/, run(db)('INSERT INTO users (username, password, last_pass_id) VALUES (?, ?, ?)', ["user2", pass, pass_id])];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, run(db)("COMMIT TRANSACTION;")];
                case 6:
                    _a.sent();
                    db.close();
                    return [2 /*return*/];
            }
        });
    });
}
function logUser(username, password, db) {
    return __awaiter(this, void 0, void 0, function () {
        var pass, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sqlite3.verbose();
                    pass = sha256_1.default(password).toString();
                    return [4 /*yield*/, get(db)("SELECT id, username, last_pass_id FROM users WHERE username = ? AND password = ?", [username, pass])];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
function changePassword(userId, password, db) {
    return __awaiter(this, void 0, void 0, function () {
        var pass, pass_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pass = sha256_1.default(password).toString();
                    pass_id = sha256_1.default(Math.random().toString()).toString();
                    return [4 /*yield*/, run(db)('UPDATE users  SET password = ?, last_pass_id = ?  WHERE id = ?;', [pass, pass_id, userId])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getLastPassId(userId, db) {
    return __awaiter(this, void 0, void 0, function () {
        var pass_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(db)("SELECT last_pass_id FROM users WHERE id = ?", [userId])];
                case 1:
                    pass_id = _a.sent();
                    return [2 /*return*/, pass_id.last_pass_id];
            }
        });
    });
}
module.exports = { initUserDB: initUserDB, logUser: logUser, changePassword: changePassword, getLastPassId: getLastPassId };
