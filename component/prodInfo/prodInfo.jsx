var React = require('react');

var copy = require('../../lib/copy');

var ajax = require('../../lib/ajax');

var ProdInfo = React.createClass({
    proTypes: {
        id: React.PropTypes.number.isRequire,
        name: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            infoUrl: '/get_prod_info',
        };
    },
    render: function () {
        var name = this.state.name || this.props.name;
        var description = this.state.description;
        var description = this.state.description;
        var cookie = this.state.cookie;

        return (
            <div className="product-info">
                <h2 className="page-header">
                    <span>{name}</span>
                    <button className="btn btn-primary pull-right" onClick={this.edit}>编辑</button>
                </h2>

                <div className="product-info-container">
                    <p>{description}</p>
                    <p>{cookie}</p>
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        this.showProdInfo();
    },
    componentDidUpdate: function (oldProps) {

        // 切换产品(更新)时重新拉取新的产品信息
        if (oldProps.id !== this.props.id) {
            console.log('open new product');
            this.showProdInfo();
        }
    },
    showProdInfo: function () {
        var id = this.props.id;
        this.getProdInfo(id);
    },
    getProdInfo: function (id) {
        ajax({
            url: this.state.infoUrl,
            data: {
                id: id
            },
            success: this.renderInfo
        });
    },
    renderInfo: function (data) {
        this.setState(data);
    },
    edit: function (e) {
        e.preventDefault();

        this.openProdForm();
    },
    openProdForm: function () {
        var ProdForm = require('../prodForm/prodForm');
        var currentProduct = copy(this.state);

        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <ProdForm
               onSave={this.resetInfo}
               currentProduct={currentProduct} />,
            document.getElementById('extraContainer')
        );
    },
    resetInfo: function (info) {
        console.log('new info');
        console.log(info);
        this.setState(info);
    }
});

module.exports = ProdInfo;