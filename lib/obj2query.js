/**
 * 对象转成url query
 * {a:1,b:2} => a=1&b=2
 */

function obj2query(obj) {
    var query = '';
    var value;
    var i = 0;
    //var p2str = Object.prototype.toString;

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            value = obj[key];

            //null和未定义的值不放到query中
            if (value === null || value === undefined) {
                continue;
            }

            /*if (p2str.call(value) === '[object Object]') {
                value = '{' + obj2query(value) + '}';
            }

            if (p2str.call(value) === '[object Array]') {
                value = JSON.stringify(value);
            }*/

            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            // 别忘了转义一下
            query += (i > 0 ? '&' : '') + key + '=' + encodeURIComponent(value);

            i++;
        }
    }
    return query;
}

module.exports = obj2query;