/**
 * 单条测试
 */
var React = require('react');

var ajax = require('../../lib/ajax');
var copy = require('../../lib/copy');

var Test = React.createClass({
    propTypes: {
        info: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired
        }),
        onDelete: React.PropTypes.func,
        opentTestDetail: React.PropTypes.func,
        onRun: React.PropTypes.func,
        onView: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            delUrl: '/autotest/api/pageHadFun/create',
            runUrl: '/autotest/api/task/exec'
        };
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
                    <a className="glyphicon del-btn" title="删除" onClick={this.showDelDialog}></a>
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
        var name = this.props.info.name;

        e.preventDefault();

        this.triggerTest(id);

        this.props.onRun && this.props.onRun(id, name);
    },
    triggerTest: function (id) {
        var self = this;
        ajax({
            url: this.state.runUrl,
            data: {
                fun_id: id
            },
            success: function () {},
            error: function () {
                self.triggerTest(id);
            }
        });
    },
    showDelDialog: function (e) {
        var id = this.props.info.id;

        var Dialog = require('../dialog/dialog');

        e.preventDefault();

        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <Dialog onConfirm={this.delTest}>
                <p style={{textAlign:'center'}}>删除后此功能点下的所有步骤也将同时删除，确定要删除？</p>
            </Dialog>,
            document.getElementById('extraContainer')
        );
    },
    delTest: function () {
        ajax({
            url: this.state.delUrl,
            type: 'post',
            data: {
                id: this.props.info.id,
                type: 'delete'
            },
            success: this.onDelete,
            error: function () {}
        });
    },
    onDelete: function () {
        var id = this.props.info.id;
        this.props.onDelete && this.props.onDelete(id);
    },
    viewTest: function (e) {
        var id = this.props.info.id;
        var name = this.props.info.name;
        
        e.preventDefault();

        this.props.onView && this.props.onView(id, name);
    }
});

module.exports = Test;