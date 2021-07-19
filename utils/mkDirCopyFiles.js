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
exports.mkDirCopyFiles = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = require("fs-extra");
const package_json_1 = __importDefault(require("../package.json"));
const tsBasePath = `node_modules/${package_json_1.default.name}`;
const mkDirCopyFiles = (dir) => __awaiter(this, void 0, void 0, function* () {
    return fs_extra_1.mkdirp(dir)
        .then(() => {
        console.log(`Copied from ${chalk_1.default.green(`${tsBasePath}/${dir}/`)} to ${chalk_1.default.cyan(`${dir}/`)}`);
        return fs_extra_1.copy(`${tsBasePath}/${dir}`, dir);
    })
        .catch(console.error);
});
exports.mkDirCopyFiles = mkDirCopyFiles;
