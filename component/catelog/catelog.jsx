/**
 * 目录(产品)列表
 */

var React = require('react');
var copy = require('../../lib/copy');
var ajax = require('../../lib/ajax');

require('./catelog.less');

var ProdForm = require('../prodForm/prodForm');

var Product = require('./product');

var Catelog = React.createClass({
    propTypes: {
    },
    getInitialState: function () {
        return {
            getProdsUrl: '/get_products',
            catelogList: []
        };
    },
    render: function () {
        var toggleProd = this.toggleProd;
        var changeProd = this.changeProd;
        
        var list = this.state.catelogList || [];
        var prodList = [];
        
        list && list.length &&
        list.forEach(function (product, index) {
            prodList.push(
                <Product
                    {...product}
                    toggle={toggleProd}
                    onChange={changeProd}
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
        this.setState({
            catelogList: data.list
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
    }
});

module.exports = Catelog;