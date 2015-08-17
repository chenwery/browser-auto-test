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
            infoUrl: '/get_prod_info',
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
                    onAdd={this.addPage}/>
            </li>
        );
    },
    openProd: function () {
        var prodId = this.props.id;
        var toggleProduct = this.props.toggle;
        
        this.getProdInfo(prodId);
        
        toggleProduct && toggleProduct.call();
        
        this.toggleSub();
    },

    // 展开收起
    toggleSub: function () {
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

    getProdInfo: function (prodId) {
        ajax({
            url: this.state.infoUrl,
            data: {
                id: prodId
            },
            success: this.renderInfo
        });
    },

    renderInfo: function (data) {
        console.log('prod info');
        console.log(data);
    }
});

module.exports = Product;