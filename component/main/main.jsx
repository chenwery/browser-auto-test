var React = require('react');

require('./main.less');

var Main = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div className="main-container">
                {this.props.children}
            </div>
        );
    },
    componentDidMount: function () {}
});

module.exports = Main;