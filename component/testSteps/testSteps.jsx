var React = require('react');
var ajax = require('../../lib/ajax');
var copy = require('../../lib/copy');

require('./testSteps.less');

var StepList = require('./stepList');

var TestSteps = React.createClass({
    propTypes: {
        testId: React.PropTypes.number.isRequired,
        onReturn: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            saveUrl: '/save_steps',
            getUrl: '/get_steps',
            stepList: []
        };
    },
    render: function () {
        return (
            <div className="test-steps">
                <section className="operation-area">
                    <button className="btn btn-default" onClick={this.return}>返回</button>
                    <button className="btn btn-info" onClick={this.runTest}>运行测试</button>
                    <button className="btn btn-primary" onClick={this.addStep}>增加操作</button>
                </section>
                <div className="test-steps-container">
                    <StepList list={this.state.stepList} />
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        this.showSteps();
    },
    runTest: function (e) {
        e.preventDefault();
    },
    showSteps: function () {
        ajax({
            url: this.state.getUrl,
            data: {
                id: this.props.testId
            },
            success: this.renderSteps
        });
    },
    renderSteps: function (data) {
        this.setState({
            stepList: data.list
        });
    },
    return: function (e) {
        e && e.preventDefault();

        this.props.onReturn && this.props.onReturn();
    },
    addStep: function (e) {
        var StepForm = require('../stepForm/stepForm');

        e.preventDefault();
        
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <StepForm
                onSave={this.onAdd}
                testId={this.props.testId}>
            </StepForm>,
            document.getElementById('extraContainer')
        );
    },
    onAdd: function (newStep) {
        console.log('add new step');
        // 增加测试动作
        var list = copy(this.state.stepList);
        list.push(newStep);

        this.setState({
            stepList: list
        });
    }
});

module.exports = TestSteps;