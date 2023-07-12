const moment = require('moment');

function getOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

function getCurrentDateTime(extraTime) {
    let min = 0;
    if (extraTime !== undefined) {
        min = extraTime;
    }

    let current_time = moment().add(min, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    return current_time;
}

function convertUTCToLocal(datetime, format) {
    if (datetime == null || datetime == undefined) {
        return datetime;
    }

    let convertedTime = '';
    if (format === 'datetime') {
        convertedTime = moment(datetime).local().format('YYYY-MM-DD HH:mm:ss');
    }

    if (format === 'date') {
        convertedTime = moment(datetime).local().format('YYYY-MM-DD');
    }

    return convertedTime;
}


module.exports = { getOtp, getCurrentDateTime, convertUTCToLocal };