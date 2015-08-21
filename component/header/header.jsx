var React = require('react');

var ajax = require('../../lib/ajax');

require('./header.scss');

var User = require('../user/user');

var Header = React.createClass({
    getInitialState: function () {
        return {
            userUrl: '/user',
            user: {}
        };
    },
    componentWillMount: function () {
    },
    render: function () {
        return (
            <header>
                <div ref="logo" className="logo">
                    <span className="logo-img">LOGO</span>
                    <span className="description"> - slogen...</span>
                </div>

                <User
                    nick={this.state.user.nick || ''}
                    user={this.state.user.user || ''}
                    img={this.state.user.img || ''}
                />
            </header>
        );
    },
    componentDidMount: function () {
        // 获取用户信息
        ajax({
            url: this.state.userUrl,
            success: this.renderName
        });
    },
    renderName: function (data) {
        this.setState({
            user: data
        });
    }
});

module.exports = Header;