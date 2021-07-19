var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_glob_1 = __importDefault(require("fast-glob"));
exports.default = (pattern, opts) => fast_glob_1.default(pattern, Object.assign({ dot: true, suppressErrors: true }, opts));
