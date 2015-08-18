var React = require('react');

var Step = require('./step');

var StepList = React.createClass({
    propTypes: {
        list: React.PropTypes.array
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        var list = this.props.list || [];
        var testList = [];
        
        list.map(function (step, index) {
            testList.push(
                <Step
                    step={step}
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
                    {testList}
                </tbody>
            </table>
        );
    },
    componentDidMount: function () {}
});

module.exports = StepList;