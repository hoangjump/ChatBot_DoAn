module.exports.config = {
    name: "boxname",
    eventType: ["log:thread-name","log:user-nickname"],
    version: "1.0.0",
    credits: "Judas",
    description: ""
};

module.exports.run = async function ({ event, api, Threads, Users }) {
    try {
   const { readFileSync, writeFileSync } = require("fs-extra");
      const { author, threadID, logMessageType, logMessageData } = event;
      //console.log()
   const { join } = require("path")
  const pathData = join(__dirname, '../commands', 'cache', "boxname.json");
  const pathDataNN = join(__dirname, '../commands', 'cache', "nickname", threadID + ".json");
      var dataJson2 = JSON.parse(readFileSync(pathDataNN, "utf-8"));
   var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  var Threads_1 = dataJson.find(item => item.boxid == threadID)
  if(!Threads_1) return
    const { setData, getData } = Threads;
  let dataThread = (await getData(threadID)).threadInfo;
  const threadInfo = await api.getThreadInfo(event.threadID);
    if(logMessageType == "log:thread-name"){
       if(Threads_1.boxname == true  && dataThread.adminIDs.some(item => item.id !== author ) && !global.config.ADMINBOT.includes(author)){
    const snames = dataJson2[0].name || "CHƯA CÓ DỮ LIỆU"
    if(author == api.getCurrentUserID()) return
    console.log(logMessageData)
    const f = dataThread.threadName
  dataThread.threadName = event.logMessageData.name || null;
    api.setTitle(`${snames}`, event.threadID);
     api.sendMessage(`[⚜️]➜ Bot đang ở chế độ cấm người dùng đổi tên`, threadID);
    } 
    } else if(logMessageType == "log:user-nickname"){
      if(Threads_1.username == true && dataThread.adminIDs.some(item => item.id !== author ) && !global.config.ADMINBOT.includes(author)){
        const sname = dataJson2[0].id[logMessageData.participant_id] || "CHƯA CÓ DỮ LIỆU"
        if(author !== api.getCurrentUserID()){
           api.changeNickname(`${sname}`, threadID, logMessageData.participant_id);
  api.sendMessage('[⚜️]➜ Box đang trong chế độ cấm đổi tên', threadID)
        }
      }
  }
} catch(e){console.log(e)}
      }