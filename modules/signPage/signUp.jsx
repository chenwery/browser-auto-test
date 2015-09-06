var React = require('react');

var ajax = require('ajax');

var Dialog = require('dialog/dialog');

var SignUp = React.createClass({
    propTypes: {
        onSuccess: React.PropTypes.func,
        show: React.PropTypes.bool,
        name: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            url: '/auth/register',
            name: '',
            email: '',
            password: '',
            passwordc: '',
            nameErr: false,
            emailErr: false,
            passwordErr: false,
            passwordcErr: false
        };
    },
    render: function () {
        var show = this.props.show ? '' : 'none';
        var focus = show === 'none' ? false : true;

        var name = this.state.name;
        var email = this.state.email;
        var password = this.state.password;
        var passwordc = this.state.passwordc;

        var nameErr = this.state.nameErr ? ' has-error' : '';
        var emailErr = this.state.emailErr ? ' has-error' : '';
        var passwordErr = this.state.passwordErr ? ' has-error' : '';
        var passwordcErr = this.state.passwordcErr ? ' has-error' : '';

        return (
            <form className="form-horizontal" style={{display: show}}>

                <div className={"form-group" + nameErr}>
                    
                    <div className="col-sm-12">
                        <input
                            value={name}
                            onChange={this.set}
                            type="text"
                            className="form-control"
                            id="name"
                            autoFocus={focus}
                            placeholder="用户名" />
                    </div>
                </div>
                
                <div className={"form-group" + emailErr}>
                    
                    <div className="col-sm-12">
                        <input
                            value={email}
                            onChange={this.set}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email" />
                    </div>
                </div>
                
                <div className={"form-group" + passwordErr}>
                    
                    <div className="col-sm-12">
                      <input
                          value={password}
                          onChange={this.set}
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="密码" />
                    </div>
                </div>

                <div className={"form-group" + passwordcErr}>
                    
                    <div className="col-sm-12">
                      <input
                          value={passwordc}
                          onChange={this.set}
                          type="password"
                          className="form-control"
                          id="passwordc"
                          placeholder="确认密码" />
                    </div>
                </div>
              
                <div className="form-group">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary" onClick={this.signup}>
                            注&nbsp;&nbsp;册
                        </button>
                    </div>
                </div>
            
            </form>
        );
    },
    set: function (e) {
        var field = e.target.id;
        var value = e.target.value;

        e.preventDefault();

        switch (field) {
            case 'name':
                this.setState({
                    name: value,
                    nameErr: !value
                });
                break;
            case 'email':
                this.setState({
                    email: value,
                    emailErr: !value
                });
                break;
            case 'password':
                this.setState({
                    password: value,
                    passwordErr: !value
                });
                break;
            case 'passwordc':
                this.setState({
                    passwordc: value,
                    passwordcErr: value !== this.state.password
                });
                break;
            default:
                break;
        }

    },
    signup: function (e) {
        var name = this.state.name.trim();
        var email = this.state.email.trim();
        var password = this.state.password.trim();
        var passwordc = this.state.passwordc.trim();

        e.preventDefault();

        this.setState({
            nameErr: !name,
            emailErr: !email,
            passwordErr: !password,
            passwordcErr: !passwordc || passwordc !== password
        });

        if (this.state.nameErr || this.state.emailErr || this.state.passwordErr || this.state.passwordcErr) {
            return;
        }

        this.postData({
            name: name,
            email: email,
            password: password,
            passwordc: passwordc
        });
    },
    postData: function (data) {
        ajax({
            url: this.state.url,
            type: 'post',
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.passwordc
            },
            success: this.onSignUp
        });
    },
    onSignUp: function (res) {
        var status = res.ec + '';

        React.render(
            <span></span>,
            document.querySelector('#extraContainer')
        );
        
        if (status === '200') {
            this.props.onSuccess && this.props.onSuccess(this.state.name.trim());
            React.render(
                <Dialog>
                    <div style={{textAlign: 'center'}}>
                        您已成功注册帐号，现在登录吧！
                    </div>
                </Dialog>,
                document.querySelector('#extraContainer')
            );
        } else {
            React.render(
                <Dialog>
                    <div style={{textAlign: 'center'}}>
                        {res.msg}
                    </div>
                </Dialog>,
                document.querySelector('#extraContainer')
            );
        }
    }
});

module.exports = SignUp;