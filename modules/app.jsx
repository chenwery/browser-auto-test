var React = require('react');

var Page = require('page/page');
var Catelog = require('catelog/catelog');
var PageContent = require('pageContent/pageContent');

var Index = React.createClass({
    getInitialState: function () {
        return {
        };
    },
    render: function () {
        return (
            <Page>
                <Catelog />
                
                <PageContent>
                    <div id="index">
                    </div>
                </PageContent>
            </Page>
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