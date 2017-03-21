const prompt = require('prompt');
const Tools = require('./Tools.js');
const GameCtrl = require('./GameCtrl.js');

console.reset = () => {
  return process.stdout.write('\033c');
}

//run on open
prompt.start();
console.reset();
GameCtrl.startUp();
