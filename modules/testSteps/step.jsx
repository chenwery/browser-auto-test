var React = require('react');

var Step = React.createClass({
    propTypes: {
        step: React.PropTypes.object,
        onChange: React.PropTypes.func,
        onDel: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            OPERATION_MAP: {
                capture: '截图',

                click: '点击',
                doubleclick: '双击',
                rightclick: '右键',
                move: '鼠标进入',
                down: '鼠标按下',
                up: '鼠标松开',
                
                input: '输入文本',
                select: '选择',
                
                exist: '元素存在',
                text: '元素文本'
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
                    <a className="glyphicon del-btn" onClick={this.openDelDialog}></a>
                </td>
            </tr>
        );
    },
    componentDidMount: function () {},

    // 编辑(修改)动作
    edit: function (e) {
        var StepForm = require('stepForm/stepForm');
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

    openDelDialog: function (e) {
        var Dialog = require('dialog/dialog');

        e.preventDefault();

        React.render(
            <span></span>,
            document.querySelector('#extraContainer')
        );
        React.render(
            <Dialog onConfirm={this.del}>
                <p style={{textAlign: 'center'}}>确定删除此步骤吗？</p>
            </Dialog>,
            document.querySelector('#extraContainer')
        );
    },

    del: function () {
        var stepId = this.props.step.id;

        this.props.onDel && this.props.onDel(stepId);
    }
});

module.exports = Step;