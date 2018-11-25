const Blockly = require('./lib/blockly_compressed_browser');
const en = require('./lib/i18n/en');
const zh = require('./lib/i18n/zh-hans');

let message = { zh, en };

Blockly.setLocale = function(locale) {
  Blockly.Msg = Object.assign(message[locale], Blockly.Msg);
  Blockly.Msg = Blockly.Msg();
}

Blockly.updateLocale = function(newMessage) {
  message = newMessage;
}

Blockly.utils.getMessageArray_ = function () {
  return Blockly.Msg
}

Blockly.setLocale('zh');

Blockly.Blocks = Object.assign(Blockly.Blocks, require('./lib/blocks_compressed_browser')(Blockly));

Blockly.Python = require('./lib/python_compressed')(Blockly);

module.exports = Blockly;