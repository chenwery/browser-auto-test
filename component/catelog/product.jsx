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
        toggle: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onAddPage: React.PropTypes.func,
        onPagesReceive: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            getPagesUrl: '/get_pages',
            pages: this.props.pages,
            open: false
        };
    },
    render: function () {
        var state = this.state.open ? 'open' : '';
        var pages = this.state.pages || [];
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
        console.log('change prod');
        this.setState({
            open: newProps.open,
            pages: newProps.pages
        });
    },
    openProd: function () {
        var prodId = this.props.id;
        
        // 通过父级修改open属性来切换各个产品线的展开收起状态
        this.props.toggle && this.props.toggle(prodId);

        // 渲染产品线详细信息，获取产品线下面的页面
        this.showProdInfo();
        (!this.state.pages || !this.state.pages.length) && this.showPages();
    },

    // 切换页面active状态
    toggleActive: function (pageId) {
        var prodId = this.props.id;
        this.props.togglePage(prodId, pageId);
    },

    addPage: function (newPage) {
        var prodId = this.props.id;
        this.props.onAddPage && this.props.onAddPage(prodId, newPage);

        // 新增页面时页面active
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

    showProdInfo: function () {
        var ProdInfo = require('../prodInfo/prodInfo');
        var info = {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            cookie: this.props.cookie
        };

        React.render(
            <ProdInfo
                info={info}
                onChange={this.onChange}
                onDelete={this.onDelete} />,
            document.querySelector('#index')
        );
    },

    showPages: function () {
        var id = this.props.id;
        this.getPages(id);
    },
    getPages: function (prodId) {
        ajax({
            url: this.state.getPagesUrl,
            data: {
                product_id: prodId
            },
            success: this.renderPages,
            error: function () {}
        });
    },
    renderPages: function (data) {
        var pages = copy(data.list);

        // 获取到产品线下的页面后，回传给上级维护
        this.props.onPagesReceive && this.props.onPagesReceive(this.props.id, pages);
    },

    onChange: function (newInfo) {
        this.props.onChange && this.props.onChange(newInfo);
    },
    onDelete: function (prodId) {
        this.props.onDelete && this.props.onDelete(prodId);
    }
});

module.exports = Product;