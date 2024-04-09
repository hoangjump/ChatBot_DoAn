const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.cyan('» ❕ Lỗi rồi « ') + data);
			break;
		case "error":
			console.log(chalk.red('» ❕ Lỗi rồi « ') + data);
			break;
		default:
			console.log(chalk.red(`» ${option} « `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.cyan('» TOFU « ') + data);
			break;
		case "error":
			console.log(chalk.red('» TOFU « ') + data);
			break;
		default:
			console.log(chalk.blue(`» TOFU « `) + data);
			break;
	}
}
