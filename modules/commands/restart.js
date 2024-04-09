module.exports.config = {
	name: "restart",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Khánh Milo & Fix By DuyVuong",
	description: "Khởi động lại bot",
	commandCategory: "admins",
	cooldowns: 0,
	dependencies: {
		"eval": ""
	}
};

module.exports.run = async ({ api, event, args, client, utils }) => {
    const eval = require("eval");
    return api.sendMessage("[Bot]- Đang khởi động lại....", event.threadID, () => eval("module.exports = process.exit(1)", true), event.messageID);

   }
