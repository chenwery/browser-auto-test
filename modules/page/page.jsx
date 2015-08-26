var React = require('react');

require('./page.scss');

var Header = require('header/header');
var Main = require('main/main');

var Page = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var id = this.props.id;
        return (
            <div id={id} className="page-wrapper">
                <Header />
                <Main>
                    {this.props.children}
                </Main>
            </div>
        );
    },
    componentDidMount: function () {}
});

module.exports = Page;