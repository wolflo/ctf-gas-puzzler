const path = require('path');
const fs = require('fs');
const parser = require('../huff/src/parser');

const modulesPath = path.posix.resolve(__dirname, './huff_modules');
const OUT_PATH = '../out/';

const gasserParsed = parser.parseFile('gasser.huff', modulesPath);

const runtime = parser.processMacro(
  'RUNTIME',
  0,
  [],
  gasserParsed.macros,
  gasserParsed.inputMap,
  gasserParsed.jumptables
).data.bytecode;

const constructorShallow = parser.processMacro(
  'CONSTRUCTOR',
  0,
  [lenBytes(runtime).toString(), '00'],
  gasserParsed.macros,
  gasserParsed.inputMap,
  gasserParsed.jumptables,
).data.bytecode;

if (lenBytes(constructorShallow) > 255) throw "constructor whoops"

const constructor = parser.processMacro(
  'CONSTRUCTOR',
  0,
  [lenBytes(runtime).toString(), lenBytes(constructorShallow).toString()],
  gasserParsed.macros,
  gasserParsed.inputMap,
  gasserParsed.jumptables,
).data.bytecode;

writeBin('gasser-runtime.bin', runtime);
writeBin('gasser.bin', constructor + runtime);

console.log(`bytecode written to ${OUT_PATH}`);

function lenBytes(str) {
  return trimBytes(str).length / 2
}

function trimBytes(str) {
  if (str.length % 2 !== 0) {
    throw 'ERR: These aint bytes'
  }
  return str.replace(/^0x/,'')
}

function writeBin(filename, bytecode) {
  fs.writeFileSync(path.posix.resolve(__dirname, OUT_PATH + filename), bytecode);
}
