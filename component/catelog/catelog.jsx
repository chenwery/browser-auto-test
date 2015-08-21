/**
 * 目录(产品)列表
 */

var React = require('react');
var copy = require('../../lib/copy');
var ajax = require('../../lib/ajax');

require('./catelog.scss');

var ProdForm = require('../prodForm/prodForm');

var Product = require('./product');

var Catelog = React.createClass({
    propTypes: {
    },
    getInitialState: function () {
        return {
            getProdsUrl: '/autotest/api/userHadProductLine/get',
            catelogList: []
        };
    },
    render: function () {
        var toggleProd = this.toggleProd;
        var changeProd = this.changeProd;
        var deleteProd = this.deleteProd;
        var addPage = this.addPage;
        var togglePage = this.togglePage;
        var receivePages = this.receivePages;
        
        var list = this.state.catelogList || [];
        var prodList = [];
        
        list && list.length &&
        list.forEach(function (product, index) {
            prodList.push(
                <Product
                    {...product}
                    toggle={toggleProd}
                    onChange={changeProd}
                    onDelete={deleteProd}
                    onAddPage={addPage}
                    togglePage={togglePage}
                    onPagesReceive={receivePages}
                    key={index} />
            );
        });

        return (
            <div className="catelog">
                <div className="catelog-add">
                    <span>所有项目</span>
                    <a className="catelog-add-btn" onClick={this.openAddDialog} title="添加项目">+</a>
                </div>
                <ul className="catelog-list">
                    {prodList}
                </ul>
            </div>
        );
    },
    componentDidMount: function () {
        this.showProdList();
    },
    showProdList: function () {
        ajax({
            url: this.state.getProdsUrl,
            success: this.renderProdList,
            error: function () {}
        });
    },
    renderProdList: function (data) {

        // 把后台的product_id/product_name转换为id/name
        var list = JSON.stringify(data.list);
        list = list.replace(/\"product_id\"/g, '\"id\"').replace(/\"product_name\"/g, '\"name\"');
        list = JSON.parse(list);
        
        this.setState({
            catelogList: list
        });
    },
    openAddDialog: function () {
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <ProdForm onSave={this.addProd}/>,
            document.getElementById('extraContainer')
        );
    },
    addProd: function (newProd) {
        var list = copy(this.state.catelogList);
        list.push(newProd);
        this.setState({
            catelogList: list
        });
    },
    changeProd: function (newInfo) {
        var list = copy(this.state.catelogList);

        list.map(function (product) {
            if (product.id === newInfo.id) {
                product.name = newInfo.name;
                product.description = newInfo.description;
                product.cookie = newInfo.cookie;
                product.pages = newInfo.pages ? newInfo.pages : product.pages;
            }
        });

        this.setState({
            catelogList: list
        });
    },

    // 更改各个产品线的展开状态
    toggleProd: function (prodId) {
        console.log('toggle product');
        var list = copy(this.state.catelogList);

        list.map(function (product) {
            if (product.id === prodId) {

                // 当前点击的产品线切换收起展开状态
                product.open = !product.open;
            
            } else {

                // 非当前产品全部设为收起
                product.open = false;
                product.pages && product.pages.map(function (page) {

                    // 收起其他产品线时，顺便将其下的所有页面active状态切换为false
                    page.active = false;
                });
            }
        });

        this.setState({
            catelogList: list
        });
    },

    deleteProd: function (prodId) {
        var list = copy(this.state.catelogList);
        var index;
        list.map(function (product, i) {
            if (product.id === prodId) {
                index = i;
            }
        });

        if (typeof index !== 'undefined') {
            list.splice(index, 1);

            this.setState({
                catelogList: list
            });

            React.render(
                <h2 className="page-header">前端自动化测试</h2>,
                document.querySelector('#index')
            );
        }
    },
    addPage: function (prodId, newPage) {
        var list = copy(this.state.catelogList);
        list.map(function (product) {
            if (product.id === prodId) {
                if (!product.pages) {
                    product.pages = [];
                }
                product.pages.push(newPage);
            }
        });

        this.setState({
            catelogList: list
        });
    },

    // 切换页面active
    togglePage: function (prodId, pageId) {
        var list = copy(this.state.catelogList);
        list.map(function (product) {
            if (product.id === prodId) {
                product.pages.map(function (page) {
                    page.active = page.id === pageId;
                });
            }
        });

        this.setState({
            catelogList: list
        });
    },

    receivePages: function (prodId, pages) {
        var list = copy(this.state.catelogList);
        list.map(function (product) {
            if (product.id === prodId) {
                if (!product.pages) {
                    product.pages = pages;
                }
            }
        });

        this.setState({
            catelogList: list
        });
    }
});

module.exports = Catelog;