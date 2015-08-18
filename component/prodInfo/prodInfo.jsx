var React = require('react');

var copy = require('../../lib/copy');

var ajax = require('../../lib/ajax');

var ProdInfo = React.createClass({
    proTypes: {
        info: React.PropTypes.shape({
            id: React.PropTypes.number.isRequire,
            name: React.PropTypes.string,
            description: React.PropTypes.string,
            cookie: React.PropTypes.string
        }),
        onChange: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            infoUrl: '/get_prod_info',
        };
    },
    render: function () {
        var name = this.state.name || this.props.info.name;
        var description = this.state.description || this.props.info.description;
        var cookie = this.state.cookie || this.props.info.cookie;

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
        if (this.props.info.description) {

            // 包含description说明传入了具体信息
            // 已经传入了具体信息info，则第一次渲染之后把传入的info同步到当前state
            this.setState(this.props.info);
        } else {

            // 否则，网络拉取产品信息
            this.showProdInfo();
        }
    },

    // 切换产品时会传入新的info,需要同步到当前state中
    componentWillReceiveProps: function (newProps) {
        if (newProps.info.description) {

            // 已经传入了具体信息info，则第一次渲染之后把传入的info同步到当前state
            this.setState(newProps.info);
        } else {

            // 否则，网络拉取产品信息
            this.showProdInfo();
        }
    },

    // 切换产品(更新)时重新拉取新的产品信息
    componentDidUpdate: function (oldProps) {
        if (oldProps.id !== this.props.id) {
            console.log('open new product');
            //this.showProdInfo();
        }
    },

    // 通过网络获取产品信息
    showProdInfo: function () {
        var id = this.props.info.id;
        this.getProdInfo(id);
    },

    // 真正的网络请求
    getProdInfo: function (id) {
        ajax({
            url: this.state.infoUrl,
            data: {
                id: id
            },
            success: this.renderInfo,
            error: function () {}
        });
    },
    renderInfo: function (data) {
        this.setState(data);
    },
    edit: function (e) {
        e.preventDefault();

        this.openEditForm();
    },
    openEditForm: function () {
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
    resetInfo: function (newInfo) {
        console.log('new info');
        this.setState(newInfo);

        this.props.onChange && this.props.onChange(newInfo);
    }
});

module.exports = ProdInfo;