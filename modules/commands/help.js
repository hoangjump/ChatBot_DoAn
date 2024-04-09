module.exports.config = {
  name: "help",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Hướng dẫn cho người mới",
  commandCategory: "system",
  usages: "[Tên module]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 6120
  }
};

module.exports.languages = {
  "vi": {
    "moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
    "helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
    "user": "Người dùng",
    "adminGroup": "Quản trị viên nhóm",
    "adminBot": "Quản trị viên bot"
  },
  "en": {
    "moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
    "adminGroup": "Admin group",
    "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 20;
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += `: ${value.config.description}`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const startSlice = numberOfOnePage * page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

    for (let item of returnArray) msg += `»${++i}  ${item}\n\n`;

    const randomText = ["Ngay cả một lượng nhỏ rượu cồn đổ lên một con bọ cạp cũng sẽ làm nó phát điên và tự chích vào mình cho đến chết.", " Cá sấu không thể thè lưỡi của nó.", "Con vật cao tuổi nhất từng được biết đến trên thế giới là một con trai 405 tuổi, được phát hiện năm 2007.", "Cá mập, giống như các loài cá khác, có cơ quan sinh sản của chúng nằm trong lồng ngực.", "Mắt của loài bạch tuộc không có điểm mù. Tính trung bình, não của một con bạch tuộc có 300 triệu tế bào thần kinh. Khi bị căng thẳng cực điểm, một số con bạch tuộc thậm chí ăn cả những chiếc vòi của nó.", "Bộ não của voi nặng khoảng 6.000g, trong khi bộ não của mèo chỉ nặng xấp xỉ 30g.", "Mèo và chó có khả năng nghe siêu âm.", "Cừu có thể sống sót tới 2 tuần trong tình trạng bị tuyết chôn vùi.", "Con lợn thông minh nhất thế giới thuộc sở hữu của một giáo viên dạy toán ở Madison, bang Wisconsin (Mỹ). Nó có khả năng ghi nhớ các bảng tính nhân đến 12.", "Thống kê cho thấy, mỗi lần giao phối của rắn chuông kéo dài tới ... hơn 22 giờ", "Các nghiên cứu phát hiện, loài ruồi bị điếc.", "Trong tình trạng thiếu nước, chuột túi (kangaroo) có thể chống chịu lâu hơn so với lạc đà.", "", "Chó có 4 ngón trên các chân sau và 5 ngón ở mỗi chân trước của chúng.", "Tốc độ bay trung bình của ong mật là 24km/giờ. Chúng không bao giờ ngủ.", "Gián có thể sống tới 9 ngày sau khi bị cắt lìa đầu.", "Nếu bạn để một con cá vàng suốt thời gian dài trong bóng tối, nó cuối cùng sẽ chuyển sang màu trắng.", "Kỷ lục bay đối với một con gà là 13 giây.", "Loài vật gây tử vong nhiều nhất cho con người trên toàn thế giới là muỗi.", "Tiếng kêu quàng quạc của một con vịt không gây dội vang lại, và không ai biết tại sao lại như vậy.", "ao biển không có não. Chúng cũng nằm trong số ít những loài động vật có thể lộn ngược dạ dày của mình từ trong ra ngoài.", "Mối hoạt động 24 giờ mỗi ngày và chúng không ngủ. Các nghiên cứu còn phát hiện, mối gặm nhấm gỗ nhanh gấp hai lần khi nghe nhạc rock nặng.", "Hươu cao cổ con thường rơi từ độ cao 1,8 mét xuống khi chào đời.", " Một con hổ không chỉ có lớp lông vằn vện mà da của chúng cũng vằn vện.", " Chim kền kền bay mà không cần vỗ cánh.", "Gà tây có thể sinh sản mà không cần giao phối.", "Chim cánh cụt là loài chim duy nhất có thể bơi lội, nhưng không bay. Người ta cũng không tìm thấy bất kỳ con chim cánh cụt nào ở Bắc Cực.", " Nọc của rắn hổ mang chúa chứa độc tính cao đến mức chỉ cần một gram cũng có thể giết chết 150 người.", "Nọc độc của một con bọ cạp nhỏ nguy hiểm hơn nhiều so với nọc độc của một con bọ cạp lớn.", "Chiều dài dương vật của một con hàu có thể 'khủng' đến mức gấp 20 lần kích thước cơ thể của nó!", "Tim chuột đập 650 lần/phút.", "Bọ chét có thể nhảy cao gấp 350 lần chiều dài cơ thể của nó. Nếu cũng sở hữu khả năng đó, con người sẽ có thể nhảy một lần hết chiều dài của một sân bóng đá.", "Chuột túi (kangaroo) nhảy càng nhanh thì năng lượng nó tiêu thụ càng ít.", "Voi nằm trong số ít loài động vật có vú không thể nhảy! Người ta cũng phát hiện rằng, voi vẫn đứng sau khi chết.", "Nhện có máu trong suốt.", " Ốc sên thở bằng chân của chúng.", "Một số con sư tử giao phối hơn 50 lần một ngày.", "Chuột sinh sản nhanh tới mức chỉ trong 18 tháng, chỉ từ 2 con chuột bố, mẹ có thể cho ra đời tới 1 triệu người nối dõi.", "Nhím nổi trên nước.", "Alex là con vẹt xám châu Phi đầu tiên trên thế giới tự đặt câu hỏi về sự tồn tại của nó: Tôi màu gì?.", "Sở dĩ hồng hạc có màu đỏ hồng vì chúng có thể hấp thụ sắc tố từ vỏ tôm, tép ăn hằng ngày.", " Cú và chim bồ câu có thể ghi nhớ khuôn mặt người", "Bò nguy hiểm hơn cả cá mập", "Cặp cánh đơn trên lưng và bộ phận giữ thăng bằng phía sau giúp ruồi luôn bay liên tục, tuy nhiên tuổi đời của chúng không quá 14 ngày.", "Với cặp giò dài miên man có thể cao tới 1,5 m và cân nặng 20 – 25 kg, giúp đà điểu có thể chạy nhanh hơn ngựa. Ngoài ra, đà điểu đực có thể “gầm” giống sư tử.", "Kangaroo sử dụng đuôi để cân bằng, vì vậy nếu nhấc đuôi một con Kăng gu ru lên khỏi mặt đất, nó sẽ không thể nhảy và đứng vững.", "Hổ không chỉ có sọc trên lưng mà còn được in trên da của chúng. Mỗi cá thể hổ được sinh ra đều là sở hữu sọc riêng không hề giống nhau.", "Nếu bạn đang bị một chú cá sấu tấn công, đừng cố gắng thoát khỏi hàm răng sắc nhọn của chúng bằng cách đẩy chúng ra. Hãy chọc thẳng vào mắt cá sấu, đó là điểm yếu của chúng.", "Bọ chét có thể nhảy cao tới 200 lần chiều cao của chúng. Điều này tương đương với một người đàn ông nhảy lên tòa Empire State ở New York.", "Một con mèo có tới 32 cơ trong tai. Điều đó khiến cho chúng có khả năng nghe vượt trội", "Gấu túi có khẩu vị không hề thay đổi trong suốt cuộc đời, hầu như chúng không ăn gì khác ngoài .. lá cây bạch đàn.", "Răng hải ly không ngừng phát triển trong suốt phần đời của mình. Nếu không muốn răng quá dài và khó kiểm soát hải ly phải ăn những thực phẩn cứng để mài mòn chúng.", "Loài vật sống ở các ghềnh đá ven bờ biển hay các cửa sông có khả năng cực “dị”. Hàu có thể thay đổi giới tính để phù hợp với cách thức giao phối.", "Bướm sở hữu cặp mắt với hàng ngàn ống kính tương tự lens trên máy ảnh nhưng tuyệt nhiên chúng chỉ nhfin thấy màu đỏ, xanh lá cây và vàng.", "Đừng cố thử điều này ở nhà, sự thật là nếu một chú ốc sên bị mất một mắt, chúng có thể hồi phục lại bình thường.", "Hươu cao cổ không hề có dây thanh quản như loài động vật cùng họ khác, lưỡi của chúng có màu xanh-đen.", "Dấu mũi của chó cũng giống như dấu vân tay của con người và có thể được sử dụng để xác định cá thể chó khác nhau.", ];
    const text = `»Trang (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\n»Gõ: "${prefix}help <tên lệnh>" để biết thêm chi tiết về lệnh đó\n»Hiện tại có ${arrayInfo.length} lệnh \n»Dùng ${prefix}hép <Số trang>\n_________________________________\n[Bạn có biết] : ${randomText[Math.floor(Math.random()*randomText.length)]}`;
    return api.sendMessage(msg + "\n\n" + text, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    });
  }

  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};