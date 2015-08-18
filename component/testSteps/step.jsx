var React = require('react');

var Step = React.createClass({
    propTypes: {
        step: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            OPERATION_MAP: {
                click: '点击',
                dblclick: '双击',
                rightclick: '右键',
                hover: '鼠标悬浮',
                input: '表单输入',
                capture: '截图',
                select: '选择'
            },
            step: null
        };
    },
    render: function () {
        var step = this.state.step || this.props.step;
        var seq = this.props.index + 1;
        
        var op = this.state.OPERATION_MAP[step.operation];

        return (
            <tr>
                <td>
                    {seq}
                </td>
                <td>
                    {step.description}
                </td>
                <td>
                    {step.selector}
                </td>
                <td>
                    {op}
                </td>
                <td>
                    <a className="glyphicon edit-btn" onClick={this.edit}></a>
                    <a className="glyphicon del-btn" onClick={this.del}></a>
                </td>
            </tr>
        );
    },
    componentDidMount: function () {},

    // 编辑(修改)动作
    edit: function (e) {
        var StepForm = require('../stepForm/stepForm');
        var currentStep = this.state.step || this.props.step;
        
        e.preventDefault();

        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <StepForm
                onSave={this.onSave}
                currentStep={currentStep}>
            </StepForm>,
            document.getElementById('extraContainer')
        );
    },
    onSave: function (newStep) {
        this.reset(newStep);
    },

    // 更改保存后更新当前视图内容
    reset: function (newStep) {
        this.setState({
            step: {
                description: newStep.description,
                selector: newStep.selector,
                operation: newStep.operation,
                inputValue: newStep.inputValue
            }
        });
    },
    del: function (e) {
        e.preventDefault();
    }
});

module.exports = Step;