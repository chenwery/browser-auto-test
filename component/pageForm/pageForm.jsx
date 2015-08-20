/**
 * (新增/编辑)页面表单
 */
var React = require('react');

var ajax = require('../../lib/ajax');

require('./pageForm.less');

var PageForm = React.createClass({
    propTypes: {
        onSave: React.PropTypes.func,
        prodId: React.PropTypes.number
    },
    getInitialState: function () {
        return {
            saveUrl: '/autotest/api/productLineHadPage/create',
            name: '',
            url: '',
            description: '',
            email: '',
            cookie: '',
            nameErr: false,
            urlErr: false,
            emailErr: false,
            descErr: false,
            cookieErr: false,
            rendered: 0
        };
    },
    render: function () {
        var type = this.props.currentPage ? '修改' : '新增';

        var pageName = this.state.name;
        var nameErr = this.state.nameErr ? ' has-error' : '';
        
        var pageUrl = this.state.url;
        var urlErr = this.state.urlErr ? ' has-error' : '';
        
        var description = this.state.description;
        var descErr = this.state.descErr ? ' has-error' : '';

        var email = this.state.email;
        var emailErr = this.state.emailErr ? ' has-error' : '';

        var cookie = this.state.cookie;
        var cookieErr = this.state.cookieErr ? ' has-error' : '';

        return (
            <div className="page-form">
                <h2 className="page-header">{type}页面</h2>
                    <form className="form-horizontal col-md-10">
                        <div className={"form-group" + nameErr}>
                            <label className="col-sm-2 control-label" htmlFor="pageName">页面名称</label>
                            <div className="col-sm-10">
                                <input
                                    id="pageName"
                                    name="pageName"
                                    type="text"
                                    className="form-control"
                                    placeholder="如: 首页"
                                    tabIndex="1"
                                    autoFocus
                                    value={pageName}
                                    onChange={this.setName} />
                            </div>
                        </div>
                        
                        <div className={"form-group" + urlErr}>
                            <label className="col-sm-2 control-label" htmlFor="pageUrl">页面URL</label>
                            <div className="col-sm-10">
                                <input
                                    id="pageUrl"
                                    name="pageUrl"
                                    type="text"
                                    className="form-control"
                                    tabIndex="2"
                                    value={pageUrl}
                                    onChange={this.setUrl} />
                            </div>
                        </div>

                        <div className={"form-group" + emailErr}>
                            <label className="col-sm-2 control-label" htmlFor="email">Email</label>
                            <div className="col-sm-10">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    tabIndex="3"
                                    value={email}
                                    onChange={this.setEmail} />
                            </div>
                        </div>
                        
                        <div className={"form-group" + descErr}>
                            <label className="col-sm-2 control-label" htmlFor="description">描述</label>
                            <div className="col-sm-10">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    className="form-control"
                                    tabIndex="4"
                                    value={description}
                                    onChange={this.setDesc} />
                            </div>
                        </div>

                        <div className={"form-group" + cookieErr}>
                            <label className="col-sm-2 control-label" htmlFor="cookie">cookie</label>
                            <div className="col-sm-10">
                                <input
                                    id="cookie"
                                    name="cookie"
                                    type="text"
                                    className="form-control"
                                    tabIndex="5"
                                    value={cookie}
                                    onChange={this.setCookie} />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary" onClick={this.save}>确定</button>
                            </div>
                        </div>

                </form>
            </div>
        );
    },
    componentDidMount: function () {},

    // 名称必填
    setName: function (e) {
        this.setState({
            name: e.target.value,
            nameErr: !e.target.value
        });
    },
    setEmail: function (e) {
        this.setState({
            email: e.target.value,
            emailErr: !e.target.value
        });
    },

    // 描述为选填
    setDesc: function (e) {
        this.setState({
            description: e.target.value
        });
    },
    // cookie为选填
    setCookie: function (e) {
        this.setState({
            cookie: e.target.value
        });
    },

    // URL为必填
    setUrl: function (e) {
        this.setState({
            url: e.target.value,
            urlErr: !e.target.value
        });
    },
    save: function (e) {
        var self = this;
        var name = this.state.name.trim();
        var url = this.state.url.trim();
        var email = this.state.email.trim();
        var description = this.state.description.trim();
        var cookie = this.state.cookie.trim();
        
        e.preventDefault();

        this.setState({
            nameErr: !name,
            urlErr: !url,
            emailErr: !email
        });

        if (!name || !url || !email) {
            return;
        }

        this.postData({
            name: name,
            url: url,
            email: email,
            description: description,
            cookie: cookie,
            prodId: this.props.prodId
        });
    },
    postData: function (data) {
        ajax({
            url: this.state.saveUrl,
            type: 'post',
            data: {
                name: data.name,
                url: data.url,
                email: data.email,
                description: data.description,
                cookie: data.cookie,
                product_id: data.prodId,

                // 区分新增/修改
                id: this.props.currentPage ? this.props.currentPage.id : null,
                type: this.props.currentPage ? 'edit' : 'add'
            },
            success: this.onSave,
            error: this.onErr
        });
    },
    onSave: function (newPage) {
        this.props.onSave({
            name: this.state.name.trim(),
            url: this.state.url.trim(),
            email: this.state.email.trim(),
            description: this.state.description.trim(),
            cookie: this.state.cookie.trim(),
            id: this.props.currentPage ? this.props.currentPage.id : newPage.id
        });
    },

    onErr: function () {
        var Dialog = require('../dialog/dialog');
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        React.render(
            <Dialog>添加失败，请稍后重试</Dialog>,
            document.getElementById('extraContainer')
        );
    }
});

module.exports = PageForm;