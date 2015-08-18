/**
 * (新增/编辑)产品表单
 */
var React = require('react');

var ajax = require('../../lib/ajax');

var Dialog = require('../dialog/dialog');

var ProdForm = React.createClass({
    getInitialState: function () {
        return {
            saveUrl: '/save_product',
            fadeOut: false,
            name: '',
            nameErr: false,
            description: '',
            descErr: false,
            cookie: '',
            cookieErr: false,
            rendered: 0
        };
    },
    render: function () {

        // 仅在第一次渲染时尝试获取传入的产品信息
        var currentProduct = !this.state.rendered && this.props.currentProduct || {};

        var name = currentProduct.name || this.state.name || '';
        var description = currentProduct.description || this.state.description || '';
        var cookie = currentProduct.cookie || this.state.cookie || '';
        
        var nameErr = this.state.nameErr ? ' has-error' : '';
        var descErr = this.state.descErr ? ' has-error' : '';
        var cookieErr = this.state.cookieErr ? ' has-error' : '';
        
        return (
            <Dialog title="添加项目" custom="true" fadeOut={this.state.fadeOut}>
                <form ref="form">
                    <div className="modal-body">

                        <div className={"form-group" + nameErr}>
                            <label className="control-label" htmlFor="name">项目名称</label>
                            
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="例如: PC腾讯网，手Q百度地图"
                                tabIndex="1"
                                autoFocus
                                value={name}
                                onChange={this.setName}/>
                        
                        </div>
                        
                        <div className={"form-group" + descErr}>
                            <label className="control-label" htmlFor="description">项目描述</label>
                            
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                placeholder="简单描述你的项目"
                                rows="3"
                                tabIndex="2"
                                value={description}
                                onChange={this.setDescription}>
                            </textarea>

                        </div>

                        <div className={"form-group" + cookieErr}>
                            <label className="control-label" htmlFor="cookie">cookie依赖</label>
                            
                            <input
                                id="cookie"
                                name="cookie"
                                type="text"
                                className="form-control"
                                placeholder="如: cookie1=abc&cookie2=efg或cookie1=abc;cookie2=efg或cookie1=abc cookie2=efg"
                                tabIndex="3"
                                value={cookie}
                                onChange={this.setCookie} />

                        </div>

                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={this.save}>确定</button>
                    </div>
                </form>
            </Dialog>
        );
    },
    componentDidMount: function () {
        var currentProduct = this.props.currentProduct;

        // 第一次渲染后，当前传入的产品信息同步到state中
        if (currentProduct) {
            this.setState({
                name: currentProduct.name,
                description: currentProduct.description,
                cookie: currentProduct.cookie,
                rendered: this.state.rendered + 1
            });
        }
    },
    setName: function (e) {
        this.setState({
            name: e.target.value,
            nameErr: !e.target.value
        });
    },
    setDescription: function (e) {
        this.setState({
            description: e.target.value,
            descErr: !e.target.value
        });
    },
    setCookie: function (e) {
        this.setState({
            cookie: e.target.value,
            cookieErr: !e.target.value
        });
    },
    save: function (e) {
        var name = this.state.name.trim();
        var description = this.state.description.trim();
        var cookie = this.state.cookie.trim();

        e.preventDefault();

        this.setState({
            nameErr: !name,
            descErr: !description,
            cookieErr: !cookie
        });

        if (!name || !description || !cookie) {
            console.log('input error');
            return;
        }

        this.postData({
            name: name,
            description: description,
            cookie: cookie
        });        
    },
    postData: function (data) {
        ajax({
            url: this.state.saveUrl,
            type: 'post',
            data: {
                name: data.name,
                description: data.description,
                cookie: data.cookie,

                // 修改时需要传当前id
                id: this.props.currentProduct ? this.props.currentProduct.id : null,
                
                // 区分是增加还是修改
                type: this.props.currentProduct ? 'edit' : 'add'
            },
            success: this.onSave,
            error: this.onErr
        });
    },
    onSave: function (data) {
        var save = this.props.onSave;
        
        save({
            id: this.props.currentProduct ? this.props.currentProduct.id : data.id,
            name: this.state.name.trim(),
            description: this.state.description.trim(),
            cookie: this.state.cookie.trim()
        });

        this.fadeOut();
    },
    onErr: function () {
        
    },
    fadeOut: function () {
        this.setState({
            fadeOut: !this.state.fadeOut
        });
    }
});

module.exports = ProdForm;