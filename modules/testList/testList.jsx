/**
 * 测试列表
 */
var React = require('react');

require('./testList.scss');

var ajax = require('ajax');
var copy = require('copy');

var Test = require('./test');

var TestList = React.createClass({
    propTypes: {
        pageId: React.PropTypes.number,
        pageUrl: React.PropTypes.string,
        testList: React.PropTypes.array,
        opentTestDetail: React.PropTypes.func,
        onAdd: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onRun: React.PropTypes.func,
        onViewImg: React.PropTypes.func,
        onViewResult: React.PropTypes.func
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
        var viewImg = this.props.onViewImg;
        var viewResult = this.props.onViewResult;
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
                    onViewImg={viewImg}
                    onViewResult={viewResult} />
            );
        });

        if (!list.length) {
            return (
                <div className="test-list">
                    <section className="operation-area">
                        <button className="btn btn-primary" onClick={this.openAddTestForm}>添加功能点</button>
                    </section>

                    <div>本页面还没有任何测试功能点,请先添加</div>
                </div>
            );
        }

        return (
            <div className="test-list">
                <section className="operation-area">
                    <button className="btn btn-primary" onClick={this.openAddTestForm}>添加功能点</button>
                </section>

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
            </div>
        );
    },
    openAddTestForm: function (e) {
        console.log('add test');
        var TestForm = require('testForm/testForm');

        e.preventDefault();
        
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        
        React.render(
            <TestForm
                pageId={this.props.pageId}
                onSave={this.addTest} />,
            document.getElementById('extraContainer')
        );
    },
    addTest: function (newTest) {
        this.props.onAdd && this.props.onAdd(newTest);
    }
});

module.exports = TestList;