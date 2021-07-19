Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parseJSON = void 0;
const parseJSON = (stringLikeJSON = '') => new Function(`return ${stringLikeJSON}`)();
exports.parseJSON = parseJSON;
const stringify = (jsonObj, indent = 2) => JSON.stringify(jsonObj, null, indent);
exports.stringify = stringify;
