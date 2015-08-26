var React = require('react');

require('./testResult.scss');

var ajax = require('ajax');

var ResultList = require('./resultList');

var TestResult = React.createClass({
    propTypes: {
        from: React.PropTypes.string,
        onReturn: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            visible: true,
            list: null,
            resultUrl: '/autotest/api/task/getResult'
        };
    },
    render: function () {
        var resultList;

        if (!this.state.list || !this.state.list.length) {
            resultList =  (
                <p>暂无测试结果，请先运行测试或等待测试运行结束</p>
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
    showResults: function (id) {
        var id = id || this.props.testId;
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
        var list = result.list[0].last_result;

        this.setState({
            list: list,
            visible: true
        });

        if (!list || !list.length) {
            this.setLoadResultTimer();
        }
    },

    // 重新进入结果页时，需要请求结果数据
    componentWillReceiveProps: function (newProps) {
        this.showResults(newProps.testId);
    },

    // 当前还没有结果数据，则延迟3秒之后重新获取
    setLoadResultTimer: function () {
        var self = this;
        setTimeout(function () {
            if (self.state.visible) {
                self.showResults();
            }
        }, 3000);
    },
    return: function (e) {
        e.preventDefault();

        // 切换显示状态
        this.setState({
            visible: false
        });

        this.props.onReturn && this.props.onReturn(this.props.from);
    }
});

module.exports = TestResult;