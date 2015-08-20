/**
 * 增加/修改测试动作
 * 修改时会传入当前值currentStep作初始渲染：<StepForm currentStep={} />
 */
var React = require('react');
var ajax = require('../../lib/ajax');

require('./stepForm.less');

var Dialog = require('../dialog/dialog');

var StepForm = React.createClass({
    propTypes: {
        featureId: React.PropTypes.number,
        onSave: React.PropTypes.func,
        currentStep: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            saveUrl: '/save_step',
            fadeOut: false,
            selector: '',
            selectorErr: false,
            description: '',
            descErr: false,
            operation: 'capture',
            inputValue: '',
            inputErr: false,
            id: null,
        };
    },
    rendered: 0,
    render: function () {

        // 保证第一次渲染才从currentStep中取值
        var currentStep = !this.rendered && this.props.currentStep || {};
        this.rendered++;

        var description = currentStep.description || this.state.description;
        var descErr = this.state.descErr ? ' has-error' : '';
        
        var selector = currentStep.selector || this.state.selector;
        var selectorErr = this.state.selectorErr ? ' has-error' : '';
        
        var operation = currentStep.operation || this.state.operation;
        
        var inputValue = currentStep.inputValue || this.state.inputValue;
        var inputErr = this.state.inputErr ? ' has-error' : '';

        // 输入框的显示取决于选择的是不是文本输入或选择
        var displayInput = operation === 'input' || operation === 'select' ? 'block' : 'none';

        return (
            <Dialog title="测试步骤" custom={true} fadeOut={this.state.fadeOut}>
                <form>
                    <div className="modal-body">
                        
                        <div className={"form-group" + descErr}>
                            <label className="control-label" htmlFor="description">描述</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                className="form-control"
                                placeholder="描述你需要的动作，例如: 点击登录框, 截取屏幕..."
                                tabIndex="1"

                                // 假如是编辑，不需要自动聚焦
                                autoFocus={currentStep.selector ? false : true}
                                value={description}
                                onChange={this.setDescription} />
                        </div>

                        <div className={"form-group" + selectorErr}>
                            <label className="control-label" htmlFor="description">目标元素</label>
                            <input
                                id="selector"
                                name="selector"
                                type="text"
                                className="form-control"
                                placeholder="使用CSS3选择器来描述你要操作的元素，如: #btn, .div:nth-child(3)..."
                                tabIndex="2"
                                value={selector}
                                onChange={this.setSelector} />
                        </div>

                        <div className={"form-group"}>
                            <label className="control-label">选择动作</label>
                            <select
                                className="form-control"
                                tabIndex="3"
                                value={operation}
                                onChange={this.setOp} >
                                    <option value="capture">截图</option>
                                    <option value="click">点击</option>
                                    <option value="dblclick">双击</option>
                                    <option value="rightclick">右键</option>
                                    <option value="hover">鼠标悬浮</option>
                                    <option value="input">文本输入</option>
                                    <option value="select">选择</option>
                            </select>
                        </div>

                        <div className={"form-group" + inputErr} style={{display: displayInput}}>
                            <label className="control-label" htmlFor="description">输入/选择的值</label>
                            <input
                                id="inputValue"
                                name="inputValue"
                                ref="inputValue"
                                type="text"
                                className="form-control"
                                placeholder="输入文本框的值, 或option标签的value, 或checkbox/radio的值"
                                value={inputValue}
                                onChange={this.setInputValue} />
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
        if (this.props.currentStep) {
            this.setState(this.props.currentStep);
        }
    },
    setDescription: function (e) {
        var value = e.target.value;

        this.setState({
            description: value,
            descErr: !value
        });
    },
    setSelector: function (e) {
        var value = e.target.value;

        this.setState({
            selector: value,
            selectorErr: !value
        });
    },
    setOp: function (e) {
        var self = this;
        var value = e.target.value;

        this.setState({
            operation: value
        });

        // 选择“输入文本”(组件更新)后,输入框自动聚焦
        if (value === 'input' || value === 'select') {
            setTimeout(function () {
                self.refs.inputValue.getDOMNode().focus()
            }, 50);
        }
    },
    setInputValue: function (e) {
        var value = e.target.value;

        this.setState({
            inputValue: value,
            inputErr: !value
        });
    },
    save: function (e) {
        var id = this.state.id;

        var description = this.state.description.trim();
        var selector = this.state.selector.trim();
        var operation = this.state.operation;
        var inputValue = this.state.inputValue.trim();

        e.preventDefault();

        this.setState({
            descErr: !description,
            selectorErr: !selector,
            inputErr: !inputValue
        });

        if (!description || !selector) {
            return;
        }

        if ((operation === 'input' || operation === 'select') && !inputValue) {
            return;
        }

        this.postData({
            description: description,
            selector: selector,
            operation: operation,
            inputValue: inputValue,

            // 类型为新增时，id会是初始值null(即不传id)
            id: id,

            // 新增时需要传当前测试功能点的id（featureId）
            fun_id: this.props.featureId,

            // 类型为“修改”还是“新增”的标记位
            cmd: this.props.currentStep ? 'edit' : 'add',
        });
    },
    postData: function (data) {
        
        // 保存
        ajax({
            url: this.state.saveUrl,
            type: 'post',
            data: data,
            success: this.onSave,
            error: this.onErr
        });
    },
    onSave: function (data) {

        // 保存成功后执行父级回调
        this.props.onSave({
            id: this.props.currentStep ? this.props.currentStep.id : data.id,
            description: this.state.description.trim(),
            selector: this.state.selector.trim(),
            operation: this.state.operation,
            inputValue: this.state.inputValue.trim()
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

module.exports = StepForm;