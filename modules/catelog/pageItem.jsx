/**
 * 单个页面
 */

var React = require('react');
var copy = require('copy');
var ajax = require('ajax');

var PageItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        id: React.PropTypes.number,
        prodName: React.PropTypes.string,
        onClick: React.PropTypes.func
    },
    getInitialState: function () {
        return {
        };
    },
    render: function () {
        var status = this.props.active ? ' active' : '';
        var pageName = this.props.name;

        return (
            <li>
                <a
                    className={"page-item" + status}
                    onClick={this.openPage}>
                        {pageName}
                </a>
            </li>
        );
    },
    componentDidMount: function () {
        if (this.props.active) {
            this.renderPageDetail();
        }
    },
    openPage: function () {
        console.log('open page');
        var pageId = this.props.id;

        this.props.onClick(pageId);

        this.renderPageDetail();
    },
    renderPageDetail: function () {
        var TestPage = require('testPage/testPage');
        
        var prodName = this.props.prodName;
        var pageName = this.props.name;
        var pageId = this.props.id;
        var pageUrl = this.props.url;

        React.render(
            <TestPage
                pageId={pageId}
                pageUrl={pageUrl}
                prodName={prodName}
                pageName={pageName} />,
            document.querySelector('#index')
        );
    }
});

module.exports = PageItem;