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
            saveUrl: '/save_page',
            name: '',
            url: '',
            nameErr: false,
            urlErr: false,
            rendered: 0
        };
    },
    render: function () {
        var type = this.props.currentPage ? '修改' : '新增';

        var pageName = this.state.name;
        var nameErr = this.state.nameErr ? ' has-error' : '';
        var pageUrl = this.state.url;
        var urlErr = this.state.urlErr ? ' has-error' : '';

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
    setName: function (e) {
        this.setState({
            name: e.target.value,
            nameErr: !e.target.value
        });
    },
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
        
        e.preventDefault();

        this.setState({
            nameErr: !name,
            urlErr: !url
        });

        if (!name || !url) {
            return;
        }

        this.postData({
            name: name,
            url: url,
            id: this.props.prodId
        });
    },
    postData: function (data) {
        ajax({
            url: this.state.saveUrl,
            type: 'post',
            data: {
                name: data.name,
                url: data.url,
                prod: this.props.prodId,

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
            id: newPage.id
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