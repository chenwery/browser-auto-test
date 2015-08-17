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
                    <a className="glyphicon edit-btn" onClick={this.openTestDetail}></a>
                    <a className="glyphicon run-btn" onClick={this.runTest}></a>
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
    runTest: function () {
        var id = this.props.info.id;
    }
});

module.exports = Test;