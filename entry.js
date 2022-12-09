#! /usr/bin/env node
global.appRoot = __dirname;
require('ts-node').register({
  // preserveSymlinks: true, TODO: Test if this fixes the symlink issue with OneDrive folders on Windows
  files: './src/main.ts',
  logError: true,
});
require('./src/main.ts');