/**
 * 单个产品
 */
var React = require('react');
var copy = require('../../lib/copy');
var ajax = require('../../lib/ajax');

var PageList = require('./pageList');

var Product = React.createClass({
    propTypes: {
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        open: React.PropTypes.bool,
        toggle: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            pages: this.props.pages,
            open: false
        };
    },
    render: function () {
        var state = this.state.open ? 'open' : '';
        var pages = this.state.pages;
        var prodName = this.props.name;
        var prodId = this.props.id;
        
        return (
            <li className={state}>
                <a className="toggle-sub" onClick={this.openProd}>
                    {prodName}
                </a>
                
                <PageList
                    list={pages}
                    prodId={prodId}
                    prodName={prodName}
                    toggleActive={this.toggleActive}
                    onAdd={this.addPage} />
            </li>
        );
    },

    // 展开产品线时父级会改变open属性，从而会设置其他产品线为收起
    componentWillReceiveProps: function (newProps) {
        this.setState({
            open: newProps.open,
            pages: newProps.pages
        });
    },
    openProd: function () {
        var prodId = this.props.id;
        var toggleProduct = this.props.toggle;
        
        this.toggleOpen();
        
        toggleProduct && toggleProduct.call(null, prodId);

        this.showProdInfo();
    },

    // 展开收起
    toggleOpen: function () {
        this.setState({
            open: !this.state.open
        });
    },

    // 切换页面active状态
    toggleActive: function (pageId) {
        var list = copy(this.state.pages);

        list.forEach(function (page) {
            page.active = page.id === pageId;
        });

        this.setState({
            pages: list
        });
    },

    addPage: function (newPage) {
        var list = copy(this.state.pages) || [];

        list.push(newPage);

        this.setState({
            pages: list
        });

        this.toggleActive(newPage.id);

        this.renderNewPageDetail(newPage);
    },
    
    renderNewPageDetail: function (newPage) {
        var TestPage = require('../testPage/testPage');
        
        var prodName = this.props.name;
        var pageName = newPage.name;
        var pageId = newPage.id;

        React.render(
            <TestPage
                pageId={pageId}
                prodName={prodName}
                pageName={pageName} />,
            document.querySelector('#index')
        );
    },

    showProdInfo: function (prodId) {
        var ProdInfo = require('../prodInfo/prodInfo');
        
        React.render(
            <ProdInfo
                name={this.props.name}
                id={this.props.id} />,
            document.querySelector('#index')
        );
    }
});

module.exports = Product;