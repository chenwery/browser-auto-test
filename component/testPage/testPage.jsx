/**/
var React = require('react');

var ajax = require('../../lib/ajax');
var copy = require('../../lib/copy');

require('./testPage.scss');

var TestList = require('../testList/testList');
var TestSteps = require('../testSteps/testSteps');

var PageHeader = require('./pageHeader');

// 生成随机(伪随机)id
function randomId() {
    return 'id_' + parseInt(Math.random() * 100000);
}

var TestPage = React.createClass({
    propTypes: {
        prodName: React.PropTypes.string,
        pageName: React.PropTypes.string,
        pageId: React.PropTypes.number.isRequired,
        pageUrl: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            detailUrl: '/autotest/api/pageHadFun/get',
            editStepsUrl: '/autotest/api/pageHadFun/edit',
            testList: [],
            show: 'list',
            testName: null,
            testId: null,
            steps: []
        };
    },
    render: function () {
        var prodName = this.props.prodName;
        var pageName = this.props.pageName;
        var testName = this.state.testName;
        var pageUrl = this.props.pageUrl;

        var displayTestList = this.state.show === 'list' ? 'block' : 'none';
        var displayTestSteps = this.state.show === 'steps' ? 'block' : 'none';
        var displayTestResult = this.state.show === 'result' ? 'block' : 'none';

        var testList = this.state.testList;

        return (
            <div className="test-page-container">

                <PageHeader
                    prodName={prodName}
                    pageName={pageName}
                    testName={testName} />
                
                <div className="test-list-container" style={{display: displayTestList}} ref="list">
                    
                    <section className="operation-area">
                        <button className="btn btn-primary" onClick={this.addTest}>添加功能点</button>
                    </section>
                    
                    <TestList
                        pageUrl={pageUrl}
                        testList={testList}
                        opentTestDetail={this.showSteps}
                        onDelete={this.delTest}
                        onRun={this.runTest}
                        onView={this.runTest} />
                
                </div>

                <div className="test-steps-container" style={{display: displayTestSteps}} ref="steps">
                    <TestSteps
                        testId={this.state.testId}
                        onReturn={this.showList}
                        steps={this.state.steps}
                        onAdd={this.addStep}
                        onModify={this.modifyStep}
                        onDel={this.delStep}
                        onRun={this.runTest} />
                </div>

                <div className="test-result-container" style={{display: displayTestResult}} ref="result">
                </div>
            </div>
        );
    },
    componentDidMount: function () {

        // 第一次渲染拉取测试功能列表
        var pageId = this.props.pageId;
        this.showTestList(pageId);
    },
    componentWillReceiveProps: function (newProps) {

        // 切换页面时，显示状态切换回list
        if (this.props.pageId !== newProps.pageId) {
            this.setState({
                show: 'list'
            });
        }
    },
    componentDidUpdate: function (oldProps) {

        // 切换页面时，拉取新页面的测试功能列表
        if (this.props.pageId !== oldProps.pageId) {
            console.log('update test list');
            pageId = this.props.pageId;
            this.showTestList(pageId);
        }
    },
    showTestList: function (pageId) {
        ajax({
            url: this.state.detailUrl,
            data: {
                page_id: pageId
            },
            success: this.renderTestList
        });
    },
    renderTestList: function (data) {
        var list = JSON.parse(
            JSON.stringify(data.list)
                .replace(/\"description\"/g,'\"name\"')
                .replace(/\"fun_id\"/g,'\"id\"')
                .replace(/\"selector_operation\"/g,'\"steps\"')
        );
        list.map(function (test) {
            test.steps.map(function (step) {

                // 为每个步骤分配一个临时id
                !step.id && (step.id = randomId());
            });
        });
        this.setState({
            testList: list
        });
    },
    addTest: function (e) {
        console.log('add test');
        var TestForm = require('../testForm/testForm');

        e.preventDefault();
        
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        
        React.render(
            <TestForm
                pageId={this.props.pageId}
                onSave={this.renderNewTest} />,
            document.getElementById('extraContainer')
        );
    },
    delTest: function (testId) {
        var list = copy(this.state.testList) || [];
        var index;

        list.map(function (test, i) {
            console.log(test, i, testId);
            if (test.id === testId) {
                index = i;
            }
        });

        if (typeof index !== 'undefined') {
            list.splice(index, 1);

            this.setState({
                testList: list
            });
        }
    },
    renderNewTest: function (newTest) {
        console.log('new test');
        var list = copy(this.state.testList) || [];
        list.push(newTest);

        this.setState({
            testList: list
        });
    },

    // 渲染测试步骤(细节)
    showSteps: function (id, testName) {
        var steps;
        var list = copy(this.state.testList);

        list.map(function (test) {
            if (test.id === id) {
                steps = test.steps;
            }
        });

        this.setState({
            show: 'steps',
            testName: testName,
            testId: id,
            steps: steps
        });

    },
    showList: function () {
        this.setState({
            show: 'list',
            testName: null
        });
    },

    // 运行测试
    runTest: function (id, testName) {
        this.setState({
            show: 'result',
            testName: testName || this.state.testName
        });
        this.showResult(id, testName);
    },
    showResult: function (id, testName) {
        var TestResult = require('../testResult/testResult');
        
        React.render(
            <TestResult
                testId={id}
                testName={testName}
                onReturn={this.resultReturn}
                from={this.state.show} />,
            this.refs.result.getDOMNode()
        );
    },
    resultReturn: function (from) {
        if (from === 'list') {
            this.showList();
        } else {
            this.setState({
                show: from
            });
        }
    },

    // 增加测试步骤
    addStep: function (testId, newStep) {
        var list = copy(this.state.testList);
        var steps;
        list.map(function (test) {
            if (test.id === testId) {
                if (!test.steps || !test.steps.length) {
                    test.steps = [];
                }

                // 手动给新步骤增加一个id
                !newStep.id && (newStep.id = randomId());
                
                test.steps.push(newStep);
                steps = test.steps;
            }
        });

        this.setState({
            testList: list,
            steps: steps
        });

        this.postStepsData(testId, steps);
    },

    // 删除测试步骤
    delStep: function (testId, stepId) {
        var list = copy(this.state.testList);
        var steps;
        var index;
        list.map(function (test) {
            if (test.id === testId) {
                steps = test.steps;
                test.steps.map(function (step, i) {
                    if (step.id === stepId) {
                        index = i;
                    }
                });
                typeof index === 'number' && test.steps.splice(index, 1);
            }
        });

        this.setState({
            testList: list,
            steps: steps
        });

        this.postStepsData(testId, steps);
    },

    // 修改步骤
    modifyStep: function (testId, stepId, stepInfo) {
        var list = copy(this.state.testList);
        var steps;
        list.map(function (test) {
            if (test.id === testId) {
                steps = test.steps;
                test.steps.map(function (step) {
                    if (step.id === stepId) {
                        step.name = stepInfo.name;
                        step.selector = stepInfo.selector;
                        step.operation = stepInfo.operation;
                        step.inputValue = stepInfo.inputValue;
                    }
                });
            }
        });

        this.setState({
            testList: list,
            steps: steps
        });

        this.postStepsData(testId, steps);
    },

    // 增、删、改步骤后需要把新数据发送到后台
    postStepsData: function (testId, steps) {
        console.log('edit steps');
        var stepsStr = JSON.stringify(steps);
        console.log(testId, stepsStr);

        ajax({
            url: this.state.editStepsUrl,
            data: {
                fun_id: testId,
                selector_operation: stepsStr
            },
            success: function () {},
            error: function () {}
        });
    }

});

module.exports = TestPage;