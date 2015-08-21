/**
 * 测试列表
 */
var React = require('react');

var ajax = require('../../lib/ajax');
var copy = require('../../lib/copy');

var Test = require('./test');

var TestList = React.createClass({
    propTypes: {
        pageUrl: React.PropTypes.string,
        testList: React.PropTypes.array,
        opentTestDetail: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onRun: React.PropTypes.func,
        onView: React.PropTypes.func
    },
    getInitialState: function () {
        return {
        };
    },
    render: function () {
        var list = this.props.testList || [];
        var testList = [];
        var opentTestDetail = this.props.opentTestDetail;
        var del = this.props.onDelete;
        var run = this.props.onRun;
        var view = this.props.onView;
        var pageUrl = this.props.pageUrl;
        
        list.forEach(function (test, index) {
            testList.push(
                <Test
                    key={index}
                    index={index}
                    info={test}
                    pageUrl={pageUrl}
                    opentTestDetail={opentTestDetail}
                    onDelete={del}
                    onRun={run}
                    onView={view} />
            );
        });

        if (!list.length) {
            return (
                <div>本页面还没有任何测试功能点,请先添加</div>
            );
        }

        return (
            <table className="table test-list">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>功能点</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {testList}
                </tbody>
            </table>
        );
    },
    componentDidMount: function () {}
});

module.exports = TestList;