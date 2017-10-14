var captchapng  = require('captchapng');
var cryptoJS    = require('crypto-js');
var config      = require('./config');

function getCaptcha(width, height) {
    var num = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(width, height, num); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = 'data:image/png;base64,' + p.getBase64();
    var cr = cryptoJS.AES.encrypt(num.toString(), config.get('security:crypto-key')).toString();
    return {data: img, crypto: cr};
}

function checkCaptcha(crypto, data) {
    var decrypt = cryptoJS.AES.decrypt(crypto, config.get('security:crypto-key')).toString(cryptoJS.enc.Utf8);
    if (decrypt === data)
        return {status: 0 };
    else return {status: -1, message: 'Неверный ввод' };
}

module.exports.getCaptcha = getCaptcha;
module.exports.checkCaptcha = checkCaptcha;
