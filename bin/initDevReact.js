#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cac from 'cac';
import cpy from 'cpy';
import { execa } from 'execa';
import c from 'picocolors';
const require = createRequire(import.meta.url);
const appPackageJSON = require('../package.json');
const log = (string) => console.log(c.bgGreen(c.black(` ${appPackageJSON.name} `.toUpperCase())), string);
const apolloClientPackages = ['@apollo/client'];
const apolloServerPackages = [
    'micro',
    'apollo-server-micro',
    'apollo-server-core',
    'apollo-server-plugin-response-cache',
    'graphql',
    'dataloader',
];
const mdxPackages = [
    'unist-util-visit',
    '@mdx-js/loader',
    '@mdx-js/react',
    'highlight.js',
];
const storybookPackages = [
    '@storybook/addon-essentials',
    '@storybook/core-common',
    '@storybook/addon-links',
    '@storybook/react',
    '@storybook/addons',
    '@storybook/theming',
];
const dirName = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CWD = process.cwd();
const pnpmInstall = (cmd) => execa('pnpm', ['add', ...cmd], { stdio: 'inherit' });
async function pkg(options) {
    if (options.apolloClient) {
        log('--apollo-client');
        console.debug(apolloClientPackages);
    }
    if (options.apolloServer) {
        log('--apollo-server');
        console.debug(apolloServerPackages);
    }
    if (options.mdx) {
        log('--mdx');
        console.debug(mdxPackages);
    }
    if (options.storybook) {
        log('--storybook');
        console.debug(storybookPackages);
    }
}
async function main(_, options) {
    log('start installing packages');
    cpy(['./**', '!bin', '!package.json'], CWD, { cwd: dirName });
    await pnpmInstall([
        '-D',
        '@types/node',
        '@types/react',
        '@types/react-dom',
        'typescript',
    ]);
    await pnpmInstall([
        'react',
        'react-dom',
        // 'modern-normalize',
        // '@emotion/styled',
        // '@emotion/react',
        'next',
    ]);
    const userPackageJSON = require(`${CWD}/package.json`);
    Object.assign(userPackageJSON, { type: 'module' });
    if (options.apolloClient) {
        log('--apollo-client');
        await pnpmInstall(apolloClientPackages);
    }
    if (options.apolloServer) {
        log('--apollo-server');
        await pnpmInstall(apolloServerPackages);
    }
    if (options.storybook) {
        log('--storybook');
        cpy(['.storybook'], CWD, { cwd: dirName });
        Object.assign(userPackageJSON, {
            scripts: {
                ...userPackageJSON.scripts,
                sb: appPackageJSON.scripts.sb,
            },
        });
        await pnpmInstall(['-D', ...storybookPackages]);
    }
    if (options.mdx) {
        log('--mdx');
        await pnpmInstall(mdxPackages);
    }
    await writeFile('package.json', JSON.stringify(userPackageJSON, null, 2));
}
const cli = cac('init-dev-react');
cli
    .command('[--options]')
    .option('-a, --apollo-server', 'Install apollo server packages')
    .option('-c, --apollo-client', 'Install apollo client packages')
    .option('-s, --storybook', 'Install storybook packages')
    .option('-m, --mdx', 'Install mdx packages')
    .action(main);
cli
    .command('pkg')
    .option('-a, --apollo-server', 'List apollo server packages')
    .option('-c, --apollo-client', 'List apollo client packages')
    .option('-s, --storybook', 'List storybook packages')
    .option('-m, --mdx', 'List mdx packages')
    .action(pkg);
cli.help();
try {
    cli.parse();
}
catch (error) {
    console.error(error.message);
}
