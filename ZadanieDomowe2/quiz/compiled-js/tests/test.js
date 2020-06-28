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
Object.defineProperty(exports, "__esModule", { value: true });
var selenium_webdriver_1 = require("selenium-webdriver");
var chai_1 = require("chai");
var mocha_webdriver_1 = require("mocha-webdriver");
require("mocha");
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function loginUser1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name="login"]').sendKeys('user1')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name="password"]').sendKeys('user1')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type="submit"]').doClick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sleep(800)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function loginUser2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name="login"]').sendKeys('user2')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name="password"]').sendKeys('user2')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type="submit"]').doClick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sleep(800)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var indexPage = 'http://localhost:3000';
function logout() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mocha_webdriver_1.driver.get(indexPage)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('input[value="Wyloguj"]').doClick()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sleep(800)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
describe('test', function () {
    this.beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(5000);
                        return [4 /*yield*/, mocha_webdriver_1.driver.get(indexPage)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sleep(1000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('session logout', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cookies, _i, cookies_1, cookie, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.timeout(20000);
                        // Login
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name="action"]')];
                    case 1: return [4 /*yield*/, (_c.sent()).getAttribute('value')];
                    case 2:
                        // Login
                        _a.apply(void 0, [_c.sent()]).to.equal('login');
                        return [4 /*yield*/, loginUser1()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.manage().getCookies()];
                    case 4:
                        cookies = _c.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.manage().deleteAllCookies()];
                    case 5:
                        _c.sent();
                        // New session
                        return [4 /*yield*/, mocha_webdriver_1.driver.get(indexPage)];
                    case 6:
                        // New session
                        _c.sent();
                        return [4 /*yield*/, sleep(300)];
                    case 7:
                        _c.sent();
                        // Login again
                        return [4 /*yield*/, loginUser1()];
                    case 8:
                        // Login again
                        _c.sent();
                        return [4 /*yield*/, sleep(800)];
                    case 9:
                        _c.sent();
                        // Change password
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name="new_password"]').sendKeys('new_pass')];
                    case 10:
                        // Change password
                        _c.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[value="Zmień hasło"]').doClick()];
                    case 11:
                        _c.sent();
                        return [4 /*yield*/, sleep(800)];
                    case 12:
                        _c.sent();
                        _i = 0, cookies_1 = cookies;
                        _c.label = 13;
                    case 13:
                        if (!(_i < cookies_1.length)) return [3 /*break*/, 16];
                        cookie = cookies_1[_i];
                        return [4 /*yield*/, mocha_webdriver_1.driver.manage().addCookie({ name: cookie.name, value: cookie.value })];
                    case 14:
                        _c.sent();
                        _c.label = 15;
                    case 15:
                        _i++;
                        return [3 /*break*/, 13];
                    case 16: return [4 /*yield*/, mocha_webdriver_1.driver.navigate().refresh()];
                    case 17:
                        _c.sent();
                        // Check if still logged out.
                        _b = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name="action"]')];
                    case 18: return [4 /*yield*/, (_c.sent()).getAttribute('value')];
                    case 19:
                        // Check if still logged out.
                        _b.apply(void 0, [_c.sent()]).to.equal('login');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('quiz percentage', function () {
        return __awaiter(this, void 0, void 0, function () {
            var sleepTimes, timeOnQuestion, i, resultTimes, id, time, i, vari;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, loginUser2()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.findElement(selenium_webdriver_1.By.className("button"))];
                    case 2: return [4 /*yield*/, (_a.sent()).doClick()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, sleep(2000)];
                    case 4:
                        _a.sent();
                        sleepTimes = [4, 4, 6, 7];
                        timeOnQuestion = 500;
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < 4)) return [3 /*break*/, 12];
                        return [4 /*yield*/, mocha_webdriver_1.driver.findElement(selenium_webdriver_1.By.id("answer_box")).sendKeys(1)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, sleep(timeOnQuestion * (sleepTimes[i] - 1))];
                    case 7:
                        _a.sent();
                        sleep(200);
                        return [4 /*yield*/, mocha_webdriver_1.driver.findElement(selenium_webdriver_1.By.xpath("//*[contains(text(), 'Następne')]"))];
                    case 8: return [4 /*yield*/, (_a.sent()).doClick()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, sleep(timeOnQuestion)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 5];
                    case 12: return [4 /*yield*/, mocha_webdriver_1.driver.findElement(selenium_webdriver_1.By.xpath("//*[contains(text(), 'Zakończ')]"))];
                    case 13: return [4 /*yield*/, (_a.sent()).doClick()];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, sleep(1000)];
                    case 15:
                        _a.sent();
                        resultTimes = [];
                        id = 1;
                        _a.label = 16;
                    case 16:
                        if (!(id <= 4)) return [3 /*break*/, 21];
                        return [4 /*yield*/, mocha_webdriver_1.driver.findElement(selenium_webdriver_1.By.id(id.toString()))];
                    case 17: return [4 /*yield*/, (_a.sent()).getText()];
                    case 18:
                        time = +(_a.sent());
                        return [4 /*yield*/, sleep(200)];
                    case 19:
                        _a.sent();
                        resultTimes.push(time);
                        _a.label = 20;
                    case 20:
                        id++;
                        return [3 /*break*/, 16];
                    case 21:
                        for (i = 0; i < 3; i++) {
                            vari = Math.pow(sleepTimes[i] / sleepTimes[i + 1] - resultTimes[i] / resultTimes[i + 1], 2) / (sleepTimes[i] / sleepTimes[i + 1]);
                            chai_1.expect(vari).within(-0.1, 0.1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
});
