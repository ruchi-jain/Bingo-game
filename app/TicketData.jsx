
var getTicketData = function() {
    var data = [];
    var low = 1, high = 100;
    while(data.length < 25){
        var rand = Math.floor(Math.random()*(high - low + 1) + low);
        if(data.indexOf(rand) > -1) continue;
        data[data.length] = rand;
    }
    return data;
}

module.exports = {
    'getTicketData': getTicketData
}