var React = require('react');

var ajax = require('../../lib/ajax');

var Dialog = require('../dialog/dialog');

var TestForm = React.createClass({
    proTypes: {
        pageId: React.PropTypes.number,
        onSave: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            saveUrl: '/save_feature',
            fadeOut: false,
            name: '',
            nameErr: false,
            description: '',
            descErr: false,
        };
    },
    render: function () {
        var name = this.state.name;
        var nameErr = this.state.nameErr ? ' has-error' : '';

        var description = this.state.description;
        var descErr = this.state.descErr ? ' has-error' : '';
        
        return (
            <Dialog title="添加测试" custom={true} fadeOut={this.state.fadeOut}>
                <form>
                    <div className="modal-body">
                        <div className={"form-group" + nameErr}>
                            <label className="control-label" htmlFor="name">名称</label>
                            
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="请输入名称，如: 登录功能"
                                tabIndex="1"
                                autoFocus
                                value={name}
                                onChange={this.setName}/>
                        
                        </div>

                        <div className={"form-group" + descErr}>
                            <label className="control-label" htmlFor="description">描述</label>
                            
                            <input
                                id="description"
                                name="description"
                                type="text"
                                className="form-control"
                                placeholder=""
                                tabIndex="2"
                                value={description}
                                onChange={this.setDesc}/>
                        
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={this.save}>确定</button>
                    </div>
                </form>
            </Dialog>
        );
    },
    componentDidMount: function () {},
    setName: function (e) {
        var name = e.target.value;
        this.setState({
            name: name,
            nameErr: !name
        });
    },
    setDesc: function (e) {
        this.setState({
            description: e.target.value
        });
    },
    save: function (e) {
        var self = this;
        var name = this.state.name.trim();
        var description = this.state.description.trim();

        e.preventDefault();

        this.setState({
            nameErr: !name
        });

        if (!name) {
            console.log('input invalid');
            return;
        }

        this.postData({
            name: name,
            description: description
        });
    },
    postData: function (data) {
        ajax({
            url: this.state.saveUrl,
            type: 'post',
            data: {
                name: data.name,
                page_id: this.props.pageId,

                // 区分新增还是修改
                id: this.props.currentTest ? this.props.currentTest.id : null,
                type: this.props.currentTest ? 'edit' : 'add'
            },
            success: this.onSave,
            error: this.onErr
        });
    },
    onSave: function (data) {
        this.props.onSave({
            name: this.state.name.trim(),
            description: this.state.description.trim(),
            id: data.id
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

module.exports = TestForm;