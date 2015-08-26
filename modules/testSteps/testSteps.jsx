var React = require('react');
var ajax = require('ajax');
var copy = require('copy');

require('./testSteps.scss');

var Steps = require('./steps');

var TestSteps = React.createClass({
    propTypes: {
        testId: React.PropTypes.number,
        onReturn: React.PropTypes.func,
        steps: React.PropTypes.array,
        onAdd: React.PropTypes.func,
        onModify: React.PropTypes.func,
        onDel: React.PropTypes.func,
        onRun: React.PropTypes.func,
        onView: React.PropTypes.func
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        var modifyStep = this.modifyStep;
        var delStep = this.delStep;

        if (!this.props.testId) {
            return false;
        }

        return (
            <div className="test-steps">
                <section className="operation-area">
                    <button className="btn btn-default" onClick={this.return}>返回</button>
                    <button className="btn btn-info" onClick={this.runTest}>运行测试</button>
                    <button className="btn btn-success" onClick={this.viewTest}>查看结果</button>
                    <button className="btn btn-primary" onClick={this.openAddDialog}>增加操作</button>
                </section>
                <div className="test-steps-container">
                    <Steps
                        list={this.props.steps}
                        modifyStep={modifyStep}
                        delStep={delStep} />
                </div>
            </div>
        );
    },
    runTest: function (e) {
        var testId = this.props.testId;

        e.preventDefault();
        this.props.onRun && this.props.onRun(testId);
    },
    viewTest: function (e) {
        var testId = this.props.testId;

        e.preventDefault();

        this.props.onView && this.props.onView(testId);
    },
    return: function (e) {
        e && e.preventDefault();

        this.props.onReturn && this.props.onReturn();
    },
    openAddDialog: function (e) {
        var StepForm = require('stepForm/stepForm');

        e.preventDefault();
        
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <StepForm
                onSave={this.addStep}
                testId={this.props.testId} />,
            document.getElementById('extraContainer')
        );
    },

    // 增加测试步骤
    addStep: function (newStep) {
        var testId = this.props.testId;
        console.log('add new step');
        this.props.onAdd && this.props.onAdd(testId, newStep);
    },

    // 修改步骤
    modifyStep: function (stepId, stepInfo) {
        var testId = this.props.testId;
        this.props.onModify && this.props.onModify(testId, stepId, stepInfo);
    },

    delStep: function (stepId) {
        var testId = this.props.testId;
        this.props.onDel && this.props.onDel(testId, stepId);
    }
});

module.exports = TestSteps;