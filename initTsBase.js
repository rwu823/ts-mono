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
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const package_json_1 = __importDefault(require("./package.json"));
const fs_1 = require("./utils/fs");
const glob_1 = __importDefault(require("./utils/glob"));
const json_1 = require("./utils/json");
const mkDirCopyFiles_1 = require("./utils/mkDirCopyFiles");
const write_1 = __importDefault(require("./utils/write"));
const tsBasePath = `node_modules/${package_json_1.default.name}`;
const ESLINTRC = '.eslintrc';
const PRETTIER = 'prettier';
const TSCONFIG = 'tsconfig.json';
const VSCODE = '.vscode';
const JEST_CONFIG = 'jest.config.ts';
const CIRCLE_CI = '.circleci';
const GIT_IGNORE = '.gitignore';
const GIT_ATTRIBUTES = '.gitattributes';
const HUSKY = '.husky';
const ENV = '.env.ts';
const STYLE_LINT = 'stylelint';
const TYPES = '@types';
const BROWSER_LIST_RC = '.browserslistrc';
Promise.all([
    glob_1.default(`${ESLINTRC}*`),
    glob_1.default(`*${PRETTIER}*`),
    glob_1.default(TSCONFIG),
    glob_1.default(`${VSCODE}/**`),
    glob_1.default(JEST_CONFIG),
    glob_1.default(`${CIRCLE_CI}/**`),
    glob_1.default(GIT_IGNORE),
    glob_1.default(GIT_ATTRIBUTES),
    glob_1.default(ENV),
    glob_1.default(HUSKY),
    glob_1.default(`*${STYLE_LINT}*`),
    glob_1.default(TYPES),
    glob_1.default(BROWSER_LIST_RC),
]).then(([eslintrc, prettiers, tsconfigs, vscode, jestConf, circleCIConf, gitignore, gitattr, envTs, husky, styleLintConfigs, globalTypes, browserslist,]) => __awaiter(this, void 0, void 0, function* () {
    var _a, _b, _c;
    if (browserslist.length > 0) {
        console.log(`${chalk_1.default.cyan(BROWSER_LIST_RC)} is already exist.`);
    }
    else {
        yield write_1.default(yield fs_1.readFile(`${tsBasePath}/${BROWSER_LIST_RC}`)).to(BROWSER_LIST_RC);
    }
    if (gitignore.length > 0) {
        console.log(`${chalk_1.default.cyan(GIT_IGNORE)} is already exist.`);
    }
    else {
        yield write_1.default(yield fs_1.readFile(`${tsBasePath}/${GIT_IGNORE}`)).to(GIT_IGNORE);
    }
    if (gitattr.length > 0) {
        console.log(`${chalk_1.default.cyan(GIT_ATTRIBUTES)} is already exist.`);
    }
    else {
        yield write_1.default(yield fs_1.readFile(`${tsBasePath}/${GIT_ATTRIBUTES}`)).to(GIT_ATTRIBUTES);
    }
    if (envTs.length > 0) {
        console.log(`${chalk_1.default.cyan(ENV)} is already exist.`);
    }
    else {
        yield write_1.default('').to(ENV);
    }
    if (prettiers.length > 0) {
        console.log(`${chalk_1.default.cyan(prettiers[0])} is already exist.`);
    }
    else {
        yield write_1.default(`const base = require('${package_json_1.default.name}/prettier.config')

module.exports = {
  ...base,
}
`).to(`${PRETTIER}.config.js`);
    }
    if (eslintrc.length > 0) {
        console.log(`${chalk_1.default.cyan(eslintrc[0])} is already exist.`);
    }
    else {
        yield write_1.default(`${json_1.stringify({
            root: true,
            extends: [`@ts-mono`],
        })}`).to(ESLINTRC);
    }
    if (styleLintConfigs.length > 0) {
        console.log(`${chalk_1.default.cyan(styleLintConfigs[0])} is already exist.`);
    }
    else {
        write_1.default(`module.exports = { extends: ['@ts-mono/stylelint-config'] }`).to(`${STYLE_LINT}.config.js`);
    }
    if (tsconfigs.length > 0) {
        console.log(`${chalk_1.default.cyan('tsconfig.json')} is already exist.`);
    }
    else {
        yield write_1.default(json_1.stringify({
            extends: `${package_json_1.default.name}/tsconfig`,
            exclude: ['node_modules', 'out/**/*', '**/*.spec.ts', '**/*.test.ts'],
            compilerOptions: {
                outDir: 'out',
            },
        })).to(TSCONFIG);
    }
    const pkg = json_1.parseJSON(yield fs_1.readFile('package.json'));
    pkg.scripts = (_a = pkg.scripts) !== null && _a !== void 0 ? _a : {};
    pkg['lint-staged'] = (_b = pkg['lint-staged']) !== null && _b !== void 0 ? _b : package_json_1.default['lint-staged'];
    Object.assign(pkg.scripts, {
        prepare: 'husky install',
    });
    yield write_1.default(json_1.stringify(pkg)).to('package.json');
    if (jestConf.length > 0) {
        console.log(`${chalk_1.default.cyan(JEST_CONFIG)} is already exist.`);
    }
    else {
        yield write_1.default(yield fs_1.readFile(`${tsBasePath}/${JEST_CONFIG}`)).to(JEST_CONFIG);
    }
    if (globalTypes.length > 0) {
        console.log(`${chalk_1.default.cyan(globalTypes[0])} is already exist.`);
    }
    else {
        yield mkDirCopyFiles_1.mkDirCopyFiles(TYPES);
    }
    if (vscode.length > 0) {
        console.log(`${chalk_1.default.cyan(vscode[0])} is already exist.`);
    }
    else {
        yield mkDirCopyFiles_1.mkDirCopyFiles(VSCODE);
    }
    if (husky.length > 0) {
        console.log(`${chalk_1.default.cyan(husky[0])} is already exist.`);
    }
    else {
        (_c = child_process_1.exec(`
git init
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
git br -M main
`).stdout) === null || _c === void 0 ? void 0 : _c.pipe(process.stdout);
    }
    if (circleCIConf.length > 0) {
        console.log(`${chalk_1.default.cyan(circleCIConf[0])} is already exist.`);
    }
    else {
        yield mkDirCopyFiles_1.mkDirCopyFiles(CIRCLE_CI);
    }
}));
process.on('unhandledRejection', (r) => {
    if (r instanceof Error) {
        console.error(r.stack);
    }
});
