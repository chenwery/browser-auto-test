var React = require('react');

require('page/page.scss');
require('header/header.scss');
require('user/user.scss');
require('main/main.scss');

require('signPage/signPage.scss');

var SignIn = require('signPage/signIn');

React.render(
    <div className="sign-page">
                
        <div className="form-area">
        
            <h2 className="sign-header">
                <span>
                    登录
                </span>
                
                <a href="/signup.html" className="pull-right">
                    注册
                    <span className="glyphicon glyphicon-circle-arrow-right"></span>
                </a>
            </h2>

            <SignIn show={true}/>

        </div>
    
    </div>,
    document.getElementById('mainContainer')
);