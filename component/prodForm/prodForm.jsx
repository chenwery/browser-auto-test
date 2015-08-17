/**
 * (新增/编辑)产品表单
 */
var React = require('react');

var Dialog = require('../dialog/dialog');

var ProdForm = React.createClass({
    getInitialState: function () {
        return {
            fadeOut: false,
            name: '',
            nameErr: false,
            description: '',
            descErr: false
        };
    },
    render: function () {
        var name = this.state.name || '';
        var description = this.state.description || '';
        var nameErr = this.state.nameErr ? ' has-error' : '';
        var descErr = this.state.descErr ? ' has-error' : '';
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
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={this.add}>确定</button>
                    </div>
                </form>
            </Dialog>
        );
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
    add: function (e) {
        var addHandler = this.props.addHandler;
        var name = this.state.name.trim();
        var description = this.state.description.trim();

        e.preventDefault();

        this.setState({
            nameErr: !name,
            descErr: !description
        });

        if (!name || !description) {
            console.log('input error');
            return;
        }

        addHandler({
            name: name,
            description: description
        });
        
        this.setState({
            fadeOut: !this.state.fadeOut
        });
    }
});

module.exports = ProdForm;