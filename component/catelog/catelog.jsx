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
        onAdd: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            catelogList: this.props.catelogList
        };
    },
    render: function () {
        var list = this.state.catelogList;
        var prodList = [];
        var toggleProduct = this.toggleProduct;
        
        list && list.length &&
        list.forEach(function (product, index) {
            prodList.push(
                <Product
                    {...product}
                    toggle={toggleProduct}
                    key={index} />
            );
        });

        return (
            <div className="catelog">
                <div className="catelog-add">
                    <span>所有项目</span>
                    <a className="catelog-add-btn" onClick={this.addProd} title="添加项目">+</a>
                </div>
                <ul className="catelog-list">
                    {prodList}
                </ul>
            </div>
        );
    },
    componentWillReceiveProps: function (newProps) {

        // 更新产品列表
        newProps.catelogList &&
        newProps.catelogList.length &&
        this.setState({
            catelogList: copy(newProps.catelogList)
        });
    },
    toggleProduct: function (prodId) {
        console.log('toggle product');
        var list = copy(this.state.catelogList);

        // 更改各个产品线的展开状态
        list.map(function (product) {
            product.open = product.id === prodId;
            if (product.id !== prodId) {
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
    addProd: function () {
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <ProdForm onSave={this.props.onAdd}/>,
            document.getElementById('extraContainer')
        );
    }
});

module.exports = Catelog;