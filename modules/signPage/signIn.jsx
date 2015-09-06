var React = require('react');

var ajax = require('ajax');

var Dialog = require('dialog/dialog');

var SignIn = React.createClass({
    propTypes: {
        onSuccess: React.PropTypes.func,
        show: React.PropTypes.bool,
        name: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            url: '/auth/login',
            name: '',
            password: '',
            remember: true,
            nameErr: false,
            passwordErr: false
        };
    },
    render: function () {
        var show = this.props.show ? '' : 'none';
        var focus = show === 'none' ? false : true;

        var name = this.state.name;
        var password = this.state.password;
        var remember = this.state.remember;

        var nameErr = this.state.nameErr ? ' has-error' : '';
        var passwordErr = this.state.passwordErr ? ' has-error' : '';

        return (
            <form className="form-horizontal" style={{display: show}} action={this.state.url} method="POST">

                <input type="hidden" name="_token" ref="token" />
                
                <div className={"form-group" + nameErr}>
                    
                    <div className="col-sm-12">
                        <input
                            value={name}
                            type="text"
                            className="form-control"
                            id="name"
                            name="email"
                            autoFocus={focus}
                            placeholder="用户名/Email"
                            onChange={this.set} />
                    </div>
                </div>
                
                <div className={"form-group" + passwordErr}>
                    
                    <div className="col-sm-12">
                        <input
                            value={password}
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="密码"
                            onChange={this.set} />
                    </div>
                </div>
                
                <div className="form-group">
                    
                    <div className="col-sm-12">
                        <div className="checkbox">
                            <label>
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    value="on"
                                    checked={remember}
                                    onChange={this.set} /> 记住我
                            </label>
                        </div>
                    </div>
                </div>
              
                <div className="form-group">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary" onClick={this.submit}>
                            登&nbsp;&nbsp;录
                        </button>
                    </div>
                </div>
            
            </form>
        );
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            name: newProps.name
        });
    },
    set: function (e) {
        var field = e.target.id;
        var value = e.target.value;

        if (field !== 'remember') {
            e.preventDefault();
        }

        switch (field) {
            case 'name':
                this.setState({
                    name: value,
                    nameErr: !value
                });
                break;
            case 'password':
                this.setState({
                    password: value,
                    passwordErr: !value
                });
                break;
            case 'remember':
                this.setState({
                    remember: !this.state.remember
                });
                break;
            default:
                break;
        }

    },
    submit: function (e) {
        this.refs.token.getDOMNode().value = document.querySelector('[name=_token]').value;

        var name = this.state.name.trim();
        var password = this.state.password.trim();
        var remember = this.state.remember;

        this.setState({
            nameErr: !name,
            passwordErr: !password
        });

        if (!name || !password) {
            e.preventDefault();
        }

        /*this.postData({
            name: name,
            password: password,
            remember: remember
        });*/
        return true;
    },
    postData: function (data) {
        ajax({
            url: this.state.url,
            type: 'post',
            data: {
                name: data.name,
                password: data.password,
                remember: data.remember
            },
            success: this.onSignIn
        });
    },
    onSignIn: function (res) {
        var status = res.ec + '';
        
        if (status === '200') {
            this.props.onSuccess && this.props.onSuccess();
        } else {
            React.render(
                <span></span>,
                document.querySelector('#extraContainer')
            );
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

module.exports = SignIn;