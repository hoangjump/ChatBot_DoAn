module.exports.config = {
    name: "vnex",
    version: "1.0.2",
    hasPermssion: 2,
    credits: "Dũngkon",
    description: "Báo tin tức Vnex !",
    commandCategory: "media",
    usages: "news/search",
    cooldowns: 5,
    dependencies: {
        "cheerio": "",
        "request": "",
        "axios": "",
        "https": ""
    }
};
module.exports.run = async function ({ api, event, args }) {
    const request = global.nodemodule['request'];
    var cheerio = global.nodemodule['cheerio'];
    if (args[0] == "news") {
        var chovui = request.get('https://vnexpress.net/tin-tuc-24h', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var thoigian = $('.time-count');
                var tieude = $('.thumb-art');
                var noidung = $('.description');
                var time = thoigian.find('span').attr('datetime');
                var title = tieude.find('a').attr('title');
                var des = noidung.find('a').text();
                var link = noidung.find('a').attr('href');
                var description = des.split('.');
                api.sendMessage(`-Tin tức mới nhất\r\n\n-Thời gian đăng: ${time}\r\n\n-Tiêu đề: ${title}\r\n\n-Nội dung: ${description[0]}\r\n\n-Liên kết: ${link}\r\n\n`, event.threadID, event.messageID)
            }
        })
    }
    else if (args[0] == "search") {
        const https = global.nodemodule['https'];
        const axios = global.nodemodule["axios"];
        var cheerio = global.nodemodule['cheerio'];
        var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
        var q = args.slice(1).join(" ");
        if (!q) return out("Hãy nhập từ khóa bạn muốn tìm kiếm");
        function certificate(url) {
            return new Promise(async function (resolve, reject) {
                try {
                    var { data } = await axios.get(url);
                    return resolve(data);
                } catch (e) {
                    console.log(e);
                    return reject(e)
                };
            })
        };

        var data = await certificate(encodeURI(`https://timkiem.vnexpress.net/?q=${q}`));
        var $ = cheerio.load(data);
        if ($(".item-news.item-news-common").length == 0)
            return out("Không có kết quả nào với từ khóa của bạn");
        if ($(".item-news.item-news-common").length > 5) limit = 5
        else limit = $(".item-news.item-news-common").length
        for (let e = 0; e < limit; e++) {
            var title = JSON.stringify($('h3.title-news').eq(e).text()).replace(/\\n|\\t|\"/g, "");
            var desc = $('p.description').eq(e).text();
            var link = $('h3.title-news a').eq(e).attr('href');
            out(`${title}\n\n${desc}\n${link}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}