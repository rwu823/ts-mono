var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
class Write {
    constructor(text) {
        this.text = text;
    }
    to(fileName) {
        return new Promise((resolve, reject) => {
            const ws = fs_1.createWriteStream(fileName);
            ws.write(this.text);
            ws.end();
            ws.on('finish', (res) => {
                console.log(`Updated ${chalk_1.default.cyan(fileName)}`);
                resolve(res);
            }).on('error', reject);
        });
    }
}
exports.default = (text) => new Write(text);
