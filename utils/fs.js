var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdir = exports.exists = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const readFile = (path, options) => util_1.promisify(fs_1.default.readFile)(path, options).then((buf) => buf.toString());
exports.readFile = readFile;
exports.exists = util_1.promisify(fs_1.default.exists);
exports.mkdir = util_1.promisify(fs_1.default.mkdir);
