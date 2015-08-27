var React = require('react');

require('./testResult.scss');

var ajax = require('ajax');

var ResultList = require('./resultList');
var ResultDetailList = require('./resultDetailList');

var TestResult = React.createClass({
    propTypes: {
        testId: React.PropTypes.number,
        testName: React.PropTypes.string,
        from: React.PropTypes.string,
        onReturn: React.PropTypes.func,
        type: React.PropTypes.string,
        onRun: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            runningStatus: '400',
            unrunStatus: '300',
            visible: true,
            list: [],
            unrun: false,
            running: false,
            imgUrl: '/autotest/api/task/getResult',
            detailUrl: '/autotest/api/task/getDetail',
            logsUrl: 'autotest/api/task/getEcho',
            logs: '',
            receiveAllLogs: false,
            logsReceiveStatus: '200'
        };
    },
    render: function () {
        var resultList;

        // 运行中
        if (this.state.running) {
            var receiveAllLogs = !!this.state.receiveAllLogs;
            
            var logs = [];
            
            this.state.logs
            .split(/<br\s*\/?>/)
            .map(function (str, index) {
                logs.push(
                    <p key={index}>{str}</p>
                );
            });

            // 运行logs
            // loading，log全部获取了就隐藏
            // 查看结果按钮，log全部获取了才显示
            resultList =  (
                <div>
                    <p>测试还在运行中，请稍候，您可以退出稍后再进来查看结果...</p>

                    
                    <p>
                        {logs}
                    </p>

                    
                    <p style={{display: receiveAllLogs ? 'none' : ''}}>
                        <span className="loading-icon loading"></span>
                    </p>
                    
                    
                    <p style={{display: receiveAllLogs ? '' : 'none'}}>
                        <span>测试已经运行结束</span>
                        <br />
                        
                        <button
                            className="btn btn-primary btn-xs"
                            onClick={this.showResults}>
                                查看结果
                        </button>
                    </p>
                    
                </div>
            );
        } else if (this.state.unrun) {
            
            resultList = (
                <p>还没有运行该测试，请先运行</p>
            );
        
        } else {
            
            if (this.props.type === 'img') {
                resultList = (
                    <ResultList list={this.state.list} testId={this.props.testId} />
                );
            } else if (this.props.type === 'detail') {
                resultList = (
                    <ResultDetailList list={this.state.list} testId={this.props.testId} />
                );
            }
        
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

    // 重新进入结果页时，需要请求结果数据
    componentWillReceiveProps: function (newProps) {
        var self = this;
        var testId = newProps.testId;

        // 注意延迟队列，不要阻塞当前setProps(render)
        setTimeout(function () {
            self.showResults(testId);
        }, 0);
    },

    showResults: function (id) {
        var id = typeof id === 'number' || typeof id === 'string' ?
            id :
            this.props.testId;

        var type = this.props.type || 'img';
        
        this.getResults(id, type);
    },
    getResults: function (testId, type) {
        var url = type === 'img' ? this.state.imgUrl : this.state.detailUrl;

        ajax({
            url: url,
            data: {
                fun_id: testId
            },
            success: this.renderResult,
            error: function () {}
        });
    },
    renderResult: function (result) {
        var status = result.ec + '';
        var list;
        var resultType = this.props.type;

        // 测试是否未运行
        this.setState({
            unrun: status === this.state.unrunStatus
        });

        // 测试是否在运行中
        this.setState({
            running: status === this.state.runningStatus
        });

        // 测试未运行，则触发运行
        if (status === this.state.unrunStatus) {
            console.log('unrun');            
            
            this.runTest();
            return;
        }

        // 测试运行中(未结束)
        if (status === this.state.runningStatus) {
            console.log('runing');

            this.getTestLogs();

            return;
        }

        // 截图结果
        if (resultType === 'img') {
            list = result.list ? result.list[0].last_result : [];

        // 详细结果(功能测试)
        } else if (resultType === 'detail') {
            list = result.content.testsuite.testcase || [];
        }

        this.setState({
            list: list,
            visible: true
        });
    },

    runTest: function () {
        this.props.onRun && this.props.onRun(this.props.testId);
    },

    // 获取运行log作展示
    getTestLogs: function () {
        var testId = this.props.testId;

        this.fetchLogs(testId);
    },
    fetchLogs: function (testId) {
        ajax({
            url: this.state.logsUrl,
            data: {
                fun_id: testId
            },
            success: this.showLogs
        });
    },
    showLogs: function (result) {
        var status = result.ec + '';
        var log = result.logs || result.msg;

        this.setState({
            receiveAllLogs: status === this.state.logsReceiveStatus
        });

        // 当前有log则显示
        if (log) {
            this.setState({
                logs: log
            });
        }

        // logs还没有完成
        if (status !== this.state.logsReceiveStatus) {

            // 轮询获取log
            this.setLoadLogsTimer();
            
            return;
        }
    },

    // 轮询获取测试运行log
    setLoadLogsTimer: function () {
        var self = this;
        var testId;

        setTimeout(function () {
            if (self.state.visible) {
                testId = self.props.testId;
                self.fetchLogs(testId);
            }
        }, 2000);
    },

    // 返回测试suits页面
    return: function (e) {
        e && e.preventDefault();

        // 切换显示状态
        this.setState({
            visible: false
        });

        this.props.onReturn && this.props.onReturn(this.props.from);
    }
});

module.exports = TestResult;