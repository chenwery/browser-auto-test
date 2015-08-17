/**
 * 克隆对象
 */

function copy (object) {
    var rst;
    try {
        rst = JSON.parse(JSON.stringify(object));
    } catch (e) {
        rst = null;
    }
    return rst;
}

module.exports = copy;