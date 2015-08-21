var React = require('react');

require('./user.scss');

var User = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div className="user">
            	<div className="user-name">
            		{this.props.nick}
            	</div>
            	<div className="user-avatar">
            		<img alt={this.props.user} src={this.props.img} />
            	</div>
            	<div className="user-operation">
            		<a className="set-btn"><span className="glyphicon glyphicon-align-justify"></span></a>
            	</div>
            </div>
        );
    },
    componentDidMount: function () {}
});

module.exports = User;