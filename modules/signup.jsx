var React = require('react');

require('page/page.scss');
require('header/header.scss');
require('user/user.scss');
require('main/main.scss');

require('signPage/signPage.scss');

var SignUp = require('signPage/signUp');

React.render(
    <div className="sign-page">
                
        <div className="form-area">
        
            <h2 className="sign-header">
                <span>
                    注册
                </span>
                
                <a href="/signin.html" className="pull-right">
                    登录
                    <span className="glyphicon glyphicon-circle-arrow-right"></span>
                </a>
            </h2>

            <SignUp show={true}/>

        </div>
    
    </div>,
    document.getElementById('mainContainer')
);