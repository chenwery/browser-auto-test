var React = require('react');

require('./signPage.scss');

var SignUp = require('./signUp');

var SignIn = require('./signIn');

var SignPage = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            show: 'signin'
        };
    },
    render: function () {
        var name = this.state.name;
        var showSignIn = this.state.show === 'signin';
        var showSignUp = this.state.show === 'signup';

        var cur = showSignIn ? '登录' : '注册';
        var to = showSignIn ? '注册' : '登录';

        return (
            <div className="sign-page">
                
                <div className="form-area">
                
                    <h2 className="sign-header">
                        <span>
                            {cur}
                        </span>
                        
                        <a href="#" className="pull-right" onClick={this.toggle}>
                            {to}
                            <span className="glyphicon glyphicon-circle-arrow-right"></span>
                        </a>
                    </h2>
                    
                    <SignUp name={name} show={showSignUp} onSuccess={this.showSignIn}/>

                    <SignIn name={name} show={showSignIn} onSuccess={this.showApp}/>

                </div>
            
            </div>
        );
    },
    toggle: function (e) {
        e.preventDefault();

        this.setState({
            show: this.state.show === 'signin' ? 'signup' : 'signin'
        });
    },
    showSignIn: function (name) {
        this.setState({
            name: name,
            show: 'signin'
        });
    },
    showApp: function () {
        window.location.replace('/pages/app.html');
    }
});

module.exports = SignPage;