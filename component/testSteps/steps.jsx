var React = require('react');

var Step = require('./step');

var Steps = React.createClass({
    propTypes: {
        list: React.PropTypes.array,
        modifyStep: React.PropTypes.func,
        delStep: React.PropTypes.func
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        var list = this.props.list || [];
        var stepList = [];
        var modifyStep = this.modifyStep;
        var delStep = this.delStep;
        
        list.map(function (step, index) {
            stepList.push(
                <Step
                    step={step}
                    onChange={modifyStep}
                    onDel={delStep}
                    key={index}
                    index={index} />
            );
        });

        if (!list.length) {
            return (
                <div>还没有任何测试步骤，请添加</div>
            );
        }
        
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>描述</th>
                        <th>目标元素</th>
                        <th>动作</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {stepList}
                
                </tbody>
            </table>
        );
    },
    modifyStep: function (stepId, stepInfo) {
        this.props.modifyStep && this.props.modifyStep(stepId, stepInfo);
    },
    delStep: function (stepId) {
        this.props.delStep && this.props.delStep(stepId);
    }
});

module.exports = Steps;