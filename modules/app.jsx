var React = require('react');

require('page/page.scss');
require('header/header.scss');
require('user/user.scss');
require('main/main.scss');

var Catelog = require('catelog/catelog');
var PageContent = require('pageContent/pageContent');

var Index = React.createClass({
    getInitialState: function () {
        return {
        };
    },
    render: function () {
        return (
            <div className="app">
                
                <Catelog />
                
                <PageContent>
                    
                    <div id="index">
                    </div>
                
                </PageContent>
            
            </div>
        );
    },
    componentDidMount: function () {
        React.render(
            <h2 className="page-header">前端自动化测试</h2>,
            document.querySelector('#index')
        );
    }
});

React.render(
    <Index></Index>,
    document.getElementById('mainContainer')
);