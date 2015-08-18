/**
 * 单条测试
 */
var React = require('react');

var ajax = require('../../lib/ajax');
var copy = require('../../lib/copy');

var Test = React.createClass({
    propTypes: {
        opentTestDetail: React.PropTypes.func
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <tr>
                <td>
                    {this.props.index + 1}
                </td>
                <td>
                    <a className="test-name" href="#" onClick={this.openTestDetail}>
                        {this.props.info.name}
                    </a>
                </td>
                <td>   
                    <a className="glyphicon edit-btn" title="编辑" onClick={this.openTestDetail}></a>
                    <a className="glyphicon del-btn" title="删除" onClick={this.delTest}></a>
                    <a className="glyphicon run-btn" title="运行" onClick={this.runTest}></a>
                    <a className="glyphicon view-btn" title="查看结果" onClick={this.viewTest}></a>
                </td>
            </tr>
        );
    },
    componentDidMount: function () {},
    openTestDetail: function (e) {
        var id = this.props.info.id;
        var name = this.props.info.name;
        var opentTestDetail = this.props.opentTestDetail;

        e.preventDefault();

        opentTestDetail && opentTestDetail.call(null, id, name);
    },
    runTest: function (e) {
        var id = this.props.info.id;

        e.preventDefault();
    },
    delTest: function (e) {
        var id = this.props.info.id;

        e.preventDefault();
    },
    viewTest: function (e) {
        var id = this.props.info.id;
        
        e.preventDefault();
    }
});

module.exports = Test;