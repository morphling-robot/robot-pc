const zh = require('./zh.json');
const en = require('./en.json');

module.exports = function i18n(locale) {
	const message = { zh, en };

	return message[locale];
}