#!/usr/bin/env bun
import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import * as cli from "@clack/prompts";
import { copy } from "fs-extra";
import c from "picocolors";
import { copyList } from "../src/share.js";
const execPromisify = promisify(exec);
const require2 = createRequire(import.meta.url);
const packageJSON = require2(
  process.env.DEV ? "../out/package.json" : "../package.json"
);
const cliBaseDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  process.env.DEV ? "../out" : ".."
);
const mkDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
  cli.log.success(`Created!
${c.dim(path.resolve(c.yellow(dir)))}`);
};
const checkDirTypes = (dir) => {
  return !!dir && typeof dir === "object" && "appName" in dir && "dest" in dir && "isExists" in dir;
};
const initAppName = process.argv.length > 2 ? process.argv.at(-1) : void 0;
await cli.group(
  {
    start: () => cli.intro(c.bgCyan(` ${packageJSON.name} `.toUpperCase())),
    appName: () => {
      if (initAppName)
        return Promise.resolve(initAppName);
      return cli.text({
        message: "App name?",
        placeholder: "ts-base-app",
        validate(value) {
          if (value.length === 0)
            return `required`;
        }
      });
    },
    dir: async ({ results: { appName } }) => {
      appName = String(appName).toString();
      const dest = path.resolve(appName);
      const isExists = await fs.stat(dest).then(() => true).catch(() => false);
      return {
        appName,
        dest,
        isExists
      };
    },
    mkdir: async ({ results: { dir } }) => {
      if (!checkDirTypes(dir))
        return;
      if (dir.isExists) {
        cli.log.error(`${dir.dest} is exists.`);
        const isForce = await cli.confirm({
          message: `Do you want to force create?`
        });
        if (isForce) {
          await mkDir(dir.appName);
        } else {
          process.exit(0);
        }
      } else {
        await mkDir(dir.appName);
      }
    },
    // packageManager: async () => {
    //   const pkgManager = await cli.select({
    //     message: 'Package manager?',
    //     options: ['npm', 'yarn', 'pnpm', 'bun'].map((label) => ({
    //       label,
    //       value: label,
    //     })),
    //   })
    //   return pkgManager
    // },
    initGit: async ({ results: { dir } }) => {
      if (!checkDirTypes(dir))
        return;
      const spinner = cli.spinner();
      spinner.start("Init git");
      const { stdout } = await execPromisify(`git init`, { cwd: dir.dest });
      spinner.stop(stdout);
    },
    install: async ({ results: { dir } }) => {
      if (!checkDirTypes(dir))
        return;
      const spinner = cli.spinner();
      await Promise.all([
        ...copyList.map(
          (src) => copy(path.join(cliBaseDir, src), `${dir.dest}/${src}`).then(
            () => src
          )
        ),
        fs.writeFile(
          path.join(dir.dest, "package.json"),
          JSON.stringify(
            {
              ...packageJSON,
              name: dir.appName,
              version: "0.0.1",
              bin: {},
              dependencies: {},
              scripts: {
                ...packageJSON.scripts,
                prepare: "simple-git-hooks"
              }
            },
            null,
            2
          )
        ).then(() => "package.json"),
        fs.writeFile(
          path.join(dir.dest, ".gitignore"),
          ["node_modules", "out"].join("\n")
        ).then(() => ".gitignore"),
        fs.writeFile(
          path.join(dir.dest, ".eslintrc.cjs"),
          `module.exports = {
      root: true,
      extends: ['@ts-mono'],
    }`
        ).then(() => ".eslintrc.cjs")
      ]).then((files) => {
        cli.log.success(
          `Created files:
${files.flat().map((file) => `- ${c.cyan(file)}
`).join("")}`
        );
      });
      spinner.start("Installing");
      Bun.spawnSync(["bun", "add", "-D", "rwu823/ts-mono#pkg/eslint-config"], {
        cwd: dir.dest
        // stdout: 'inherit',
      });
      Bun.spawnSync(
        [
          "bun",
          "add",
          "-D",
          "simple-git-hooks",
          "eslint",
          "lint-staged",
          "yarnhook",
          "typescript",
          "@types/node"
        ],
        {
          cwd: dir.dest,
          stdout: "inherit"
        }
      );
      spinner.stop(`Installed packages`);
    },
    // initGitHooks: async ({ results: { dir } }) => {
    //   if (!checkDirTypes(dir)) return
    //   Bun.spawn(['bunx', 'simple-git-hooks'], {
    //     cwd: dir.dest,
    //     stdout: 'inherit',
    //   })
    // },
    end: () => cli.outro(`\u2728You're all done!`)
  },
  {
    onCancel() {
      cli.cancel();
      process.exit(0);
    }
  }
);
