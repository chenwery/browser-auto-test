var React = require('react');

require('page/page.scss');
require('header/header.scss');
require('user/user.scss');
require('main/main.scss');

var SignPage = require('signPage/signPage');

React.render(
    <SignPage />,
    document.getElementById('mainContainer')
);