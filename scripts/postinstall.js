let shell = require('shelljs');

const script = './node_modules/@umijs/max/dist/cli.js setup';

if (shell.which('node14')) {
  shell.exec(`node14 ${script}`);
} else {
  shell.exec(`node ${script}`);
}
