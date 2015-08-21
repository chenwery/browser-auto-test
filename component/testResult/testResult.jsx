var React = require('react');

require('./testResult.less');

var ajax = require('../../lib/ajax');

var ResultList = require('./resultList');

var TestResult = React.createClass({
    propTypes: {
        onReturn: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            resultUrl: '/get_test_result'
        };
    },
    render: function () {
        var resultList;

        if (!this.state.list || !this.state.list.length) {
            resultList =  (
                <p>暂无测试结果，请先等待自动测试运行结束</p>
            );
        } else {
            resultList = (
                <ResultList list={this.state.list} />
            );
        }

        return (
            <div className="test-result">
                <section className="operation-area">
                    <button className="btn btn-default" onClick={this.return}>返回</button>
                </section>
                
                {resultList}

            </div>
        );
    },
    componentDidMount: function () {
        this.showResults();
    },
    showResults: function () {
        var id = this.props.testId;
        this.getResults(id);
    },
    getResults: function (testId) {
        ajax({
            url: this.state.resultUrl,
            data: {
                fun_id: testId
            },
            success: this.renderResult,
            error: function () {}
        });
    },
    renderResult: function (result) {
        if (!result.list || !result.list.length) {
            this.setState({
                list: null
            });
        }

        this.setState({
            list: result.list
        });
    },
    return: function (e) {
        e.preventDefault();
        this.props.onReturn && this.props.onReturn();
    }
});

module.exports = TestResult;