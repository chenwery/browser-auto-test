// var namesInput = '/:product/:page/:feature/:type';
var namesInput;

//var urlHash = document.location.hash;
var urlHash;

var path = urlHash.replace(/^#!/, '');
var reg = new RegExp('\\/[^\\/]+','gi');
var paths = path.match(reg);

var names = namesInput.match(/\/:[^\/]+/g);

if (names && names.length) {
    names = names.map(function (name) {
        return name.match(/\/:([^\/]+)/)[1];
    });
}