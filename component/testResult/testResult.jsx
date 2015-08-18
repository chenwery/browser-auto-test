var React = require('react');

var ajax = require('../../lib/ajax');

var TestResult = React.createClass({
    propTypes: {
        onReturn: React.PropTypes.func
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div className="test-result">
                <section className="operation-area">
                    <button className="btn btn-default" onClick={this.return}>返回</button>
                </section>
                
                结果页{this.props.testName}
            </div>
        );
    },
    componentDidMount: function () {},
    return: function (e) {
        e.preventDefault();
        this.props.onReturn && this.props.onReturn();
    }
});

module.exports = TestResult;