var React = require('react');

var Step = React.createClass({
    propTypes: {
        step: React.PropTypes.object,
        onChange: React.PropTypes.func
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
        var step = this.props.step;
        var seq = this.props.index + 1;
        var op = this.state.OPERATION_MAP[step.operation];

        return (
            <tr>
                <td>
                    {seq}
                </td>
                <td>
                    {step.name}
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
        var currentStep = this.props.step;
        
        e.preventDefault();

        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <StepForm
                onSave={this.onSave}
                currentStep={currentStep} />,
            document.getElementById('extraContainer')
        );
    },
    onSave: function (stepInfo) {
        this.reset(stepInfo);
    },

    // 更改保存后更新当前视图内容
    reset: function (stepInfo) {
        var stepId = this.props.step.id;
        this.props.onChange && this.props.onChange(stepId, stepInfo);
    },

    // TODO
    del: function (e) {
        e.preventDefault();
    }
});

module.exports = Step;