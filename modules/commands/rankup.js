module.exports.config = {
	name: "rankup",
	version: "1.0.2",
	hasPermssion: 1,
	credits: "Mirai Team mod by Mank",
	description: "Thông báo rankup random gif cho từng nhóm, người dùng",
	commandCategory: "system",
	dependencies: {
		"fs-extra": ""
	},
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		unsendMessageAfter: 5
	}
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/rankup/`;// Thư mục dow về
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "rankup1.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://i.imgur.com/QrdwCAa.gif").pipe(fs.createWriteStream(dirMaterial + "rankup1.gif")); //link file & ten file khi luu ve
    if (!fs.existsSync(dirMaterial + "rankup2.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://i.imgur.com/jFo6mha.gif").pipe(fs.createWriteStream(dirMaterial + "rankup2.gif")); //link file & ten file khi luu ve
    if (!fs.existsSync(dirMaterial + "rankup3.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/on154FY.gif").pipe(fs.createWriteStream(dirMaterial + "rankup3.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup4.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/O4AxKQp.gif").pipe(fs.createWriteStream(dirMaterial + "rankup4.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup5.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/AQugIV7.gif").pipe(fs.createWriteStream(dirMaterial + "rankup5.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup6.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/FC0l3NL.gif").pipe(fs.createWriteStream(dirMaterial + "rankup6.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup7.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/FC0l3NL.gif").pipe(fs.createWriteStream(dirMaterial + "rankup7.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup8.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/GvE8lbp.gif").pipe(fs.createWriteStream(dirMaterial + "rankup8.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup9.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/0CH4Nxv.gif").pipe(fs.createWriteStream(dirMaterial + "rankup9.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup10.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/fPBunzV.gif").pipe(fs.createWriteStream(dirMaterial + "rankup10.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup11.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/EUMhDJb.gif").pipe(fs.createWriteStream(dirMaterial + "rankup11.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup12.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/vucF6bG.gif").pipe(fs.createWriteStream(dirMaterial + "rankup12.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup13.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/KdT6Do9.gif").pipe(fs.createWriteStream(dirMaterial + "rankup13.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup14.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/UBdke8H.gif").pipe(fs.createWriteStream(dirMaterial + "rankup14.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup15.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/ZXtouya.gif").pipe(fs.createWriteStream(dirMaterial + "rankup15.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup16.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/Rbv9v2w.gif").pipe(fs.createWriteStream(dirMaterial + "rankup16.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup17.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/yh9EwQ7.gif").pipe(fs.createWriteStream(dirMaterial + "rankup17.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup18.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/wBd0tBL.gif").pipe(fs.createWriteStream(dirMaterial + "rankup18.gif")); //link file & ten file khi luu ve
	if (!fs.existsSync(dirMaterial + "rankup1.gif")) request /*kiem tra file neu k co tu dong down ve */ 
    ("https://imgur.com/IaV5SWa.gif").pipe(fs.createWriteStream(dirMaterial + "rankup19.gif")); //link file & ten file khi luu ve
}
// Có sẵn hàm dowload cho newbie không biết thêm gif
module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
	var {threadID, senderID } = event;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];

	threadID = String(threadID);
	senderID = String(senderID);

	const thread = global.data.threadData.get(threadID) || {};

	let exp = (await Currencies.getData(senderID)).exp;
	exp = exp += 1;

	if (isNaN(exp)) return;

	if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
		await Currencies.setData(senderID, { exp });
		return;
	};

	const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
	const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

	if (level > curLevel && level != 1) {
		const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
		var messsage = (typeof thread.customRankup == "undefined") ? msg = getText("levelup") : msg = thread.customRankup,
			arrayContent;

		messsage = messsage
			.replace(/\{name}/g, name)
			.replace(/\{level}/g, level);
let random = Math.floor(Math.random() * 19) + 1;//random gif , có bao nhiêu thay sau dấu * bấy nhiêu . Thêm gif và đổi tên thành rankup1/2/3.gif
		if (existsSync(__dirname + "/cache/rankup/")) mkdirSync(__dirname + "/cache/rankup/", { recursive: true });
		if (existsSync(__dirname + `/cache/rankup/rankup${random}.gif`)) arrayContent = { body: messsage, attachment: createReadStream(__dirname + `/cache/rankup/rankup${random}.gif`), mentions: [{ tag: name, id: senderID }] };
		else arrayContent = { body: messsage, mentions: [{ tag: name, id: senderID }] };
		const moduleName = this.config.name;
		api.sendMessage(arrayContent, threadID, async function (error, info){
			if (global.configModule[moduleName].autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, global.configModule[moduleName].unsendMessageAfter * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	await Currencies.setData(senderID, { exp });
	return;
}

module.exports.languages = {
	"vi": {
		"off": "tắt",
		"on": "bật",
		"successText": "thành công thông báo rankup!",
		"levelup": "== Lên Cấp ==\nChúc mừng bé {name} đã đạt tới level {level}\nChăm tương tác để lên top 1 nào emiu<3"
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "success notification rankup!",
		"levelup": "{name}, your keyboard hero level has reached level {level}",
	}
}

module.exports.run = async function({ api, event, Threads, getText }) {
	const { threadID, messageID } = event;
	let data = (await Threads.getData(threadID)).data;
	
	if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
	else data["rankup"] = false;
	
	await Threads.setData(threadID, { data });
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}
