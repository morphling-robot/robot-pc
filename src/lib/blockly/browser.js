const Blockly = require('./lib/blockly_compressed_browser');
// const En = require('./lib/i18n/en');
const Zh = require('./lib/i18n/zh-hans');

Blockly.setLocale = function(locale) {
  Blockly.Msg = Object.assign(locale, Blockly.Msg);
  Blockly.Msg = Blockly.Msg();
}

Blockly.utils.getMessageArray_ = function () {
  return Blockly.Msg
}

Blockly.setLocale(Zh);

Blockly.Blocks = Object.assign(Blockly.Blocks, require('./lib/blocks_compressed_browser')(Blockly));

Blockly.Python = require('./lib/python_compressed')(Blockly);

module.exports = Blockly;