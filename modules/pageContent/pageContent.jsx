var React = require('react');

require('./pageContent.scss');

var PageContent = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div className="page-content">
                {this.props.children}
            </div>
        );
    },
    componentDidMount: function () {}
});

module.exports = PageContent;