/**
 * ajax简单封装
 */
var obj2query = require('./obj2query');

function http(config) {
    var url = config.url || '';
    var method = config.type && config.type.toUpperCase() || 'GET';

    var data = config.data;
    var params = '';
    
    if (typeof data === 'object') {
        params = obj2query(data);
    } else if (typeof data === 'string') {
        params = data;
    }

    if (method === 'GET' && params) {
        if (/\?/.test(url)) {
            url += '&' + params;
        } else {
            url += '?' + params;
        }
        params = '';
    }
    
    var ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function (event) {
        callback.call(this, event, config);
    };
    
    ajax.open(method, url);

    if (method === 'POST') {
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }

    ajax.send(params || null);
}

function callback(event, config) {
    var request = this;
    var response;
    var success = config.success || function () {};
    var fail = config.error || function () {};

    if (request.readyState === 4) {
        if (request.status === 200) {
            try {
                response = JSON.parse(request.responseText);
            } catch (e) {
                fail.call(request, request.status);
            }

            // 这个不能放try里面
            response && success.call(request, response);
        } else {
            fail.call(request, request.status);
        }
    }
}

module.exports = http;