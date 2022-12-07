#! /usr/bin/env node
require('ts-node').register({
  // preserveSymlinks: true,
  logError: true,
});
require('./src/main.ts');