var React = require('react');

require('./dialog.scss');

var Dialog = React.createClass({
    getInitialState: function () {
        return {
            show: typeof this.props.show !== 'undefined' ? this.props.show : true,
            in: false,
            dissmiss: false
        }
    },
    render: function () {
        var display = this.state.show ? 'block' : 'none';
        var fadeIn = this.state.in ? ' in' : '';
        var status = 'ui-dialog modal fade' + fadeIn;

        var dialogContent;
        var dialogFooter;
        
        // 销毁dialog
        if (this.state.dissmiss) {
            return (<span></span>);
        }

        // 自定义对话框内容
        if (this.props.custom) {
            dialogContent = this.props.children;
        } else {
            dialogContent = (
                <div className="modal-body">
                   {this.props.children}
                </div>
            );
        }

        // 自定义对话框内容的时候，footer也需要自定义
        if (!this.props.custom) {
            dialogFooter = (
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.confirm}>确定</button>
                    <button type="button" className="btn btn-default" onClick={this.dissmiss}>取消</button>
                </div>
            );
        }
        
        return (
            <div className={status} tabIndex="-1" style={{display: display}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.dissmiss}><span>&times;</span></button>
                            
                            <h4 className="modal-title">
                                {this.props.title || '提示'}
                            </h4>

                        </div>
                        
                        {dialogContent}
                        {dialogFooter}

                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        if (this.props.show || this.state.show) {
            this.show();
        }
    },

    // fadeOut属性为true时销毁dialog
    componentWillReceiveProps: function (newProps) {
        var fadeOut = newProps.fadeOut;
        if (fadeOut) {
            this.dissmiss();
        }
    },

    confirm: function () {
        this.dissmiss();
        this.props.onConfirm && this.props.onConfirm()
    },

    // 销毁
    dissmiss: function () {
        var self = this;
        
        self.hide();
        
        // 动画结束时销毁
        setTimeout(function () {
            self.setState({
                dissmiss: true
            });
        }, 150);
    },

    // 隐藏
    hide: function () {
        var self = this;
        self.setState({
            in: false
        });

        // 动画结束时隐藏
        setTimeout(function () {
            self.setState({
                show: false
            });
        }, 150);
    },

    // (重新)显示
    show: function () {
        var self = this;
        this.setState({
            show: true
        });
        setTimeout(function () {
            self.setState({
                in: true
            });
        }, 50);
    }
});

module.exports = Dialog;