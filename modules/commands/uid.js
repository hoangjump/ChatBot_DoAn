module.exports = {
    config: {
        name: "uid",
        version: "1.0.1",
        hasPermssion: 0,
        credits: "NDK",
        description: "Lấy UID Facebook",
        usages: [
            'uid: Lấy uid của bạn',
            'uid @tag: Lấy uid người bạn tag',
            'uid <xxxx>: Lấy uid bằng link'
        ],
        cooldowns: 5,
        commandCategory: "tiện ích",
        dependencies: {
            "eval": ""
        }
    },

    finidfb: async function(event) {

        var name = (event.attachments[0].target.actors ? event.attachments[0].target.actors[0].name : event.attachments[0].target ? event.attachments[0].target.name : "");

        var uid = (event.attachments[0].target.actors ? event.attachments[0].target.actors[0].id : event.attachments[0].target.id);

        findid = {
            uid: uid,
            name: name
        }
        return findid
    },

    run: async function({
        api,
        event,
        args,
        Users
    }) {
        try {
            if (event.type == "message_reply") {
                var {
                    name
                } = await Users.getData(event.messageReply.senderID)
                return api.sendMessage(`• ${name}\n• UID: ${event.messageReply.senderID}`, event.threadID, event.messageID);
            } else if (!args[0]) {
                return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
            } else if (Object.keys(event.mentions) == 0) {
                if (event.attachments[0]) {
                    if (event.attachments[0].target == null) return api.sendMessage(`Không tìm thấy dữ liệu!`, event.threadID, event.messageID);
                    var getdata = await this.finidfb(event)
                    if (getdata.name == undefined) return api.sendMessage(`Không tìm thấy dữ liệu!`, event.threadID, event.messageID);
                    return api.sendMessage(`• ${getdata.name}\n• UID: ${getdata.uid}`, event.threadID, event.messageID);
                }
                const data = await global.utils.findfbid(args.join(" "))
                if (data.status == 200) return api.sendMessage(`${(event.attachments[0] ? `• ${event.attachments[0].title}`: "")}\n• UID: ${data.data.uid}`, event.threadID, event.messageID);
                else return api.sendMessage(`Không tìm thấy dữ liệu!`, event.threadID, event.messageID);
            } else {
                for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: ${Object.keys(event.mentions)[i]}`, event.threadID);
                return;
            }
        } catch (e) {
            console.log(e)
            return api.sendMessage(`có cái nịt`, event.threadID, event.messageID);
        }
    }
}