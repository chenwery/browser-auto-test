var React = require('react');
var ajax = require('./lib/ajax');
var copy = require('./lib/copy');

var Page = require('./component/page/page');
var Catelog = require('./component/catelog/catelog');
var PageContent = require('./component/pageContent/pageContent');

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