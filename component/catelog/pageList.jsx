/**
 * 页面列表
 */

var React = require('react');
var copy = require('../../lib/copy');
var ajax = require('../../lib/ajax');

var PageItem = require('./pageItem');

var PageList = React.createClass({
    propTypes: {
        list: React.PropTypes.array,
        prodName: React.PropTypes.string,
        prodId: React.PropTypes.number,
        toggleActive: React.PropTypes.func,
        onAdd: React.PropTypes.func
    },
    getInitialState: function () {
        return {
        };
    },
    render: function () {
        var toggleActive = this.toggleActive;
        var list = this.props.list;
        var pageList = [];
        var prodName = this.props.prodName;
        
        list && list.length &&
        list.forEach(function (page, index) {
            pageList.push(
                <PageItem
                    {...page}
                    prodName={prodName}
                    onClick={toggleActive}
                    key={index} />
            );
        });

        return (
            <ul className="page-list">
                {pageList}
                
                <li onClick={this.renderAddForm}>添加页面+</li>
            </ul>
        );
    },

    // 定位当前页的active状态
    toggleActive: function (pageId) {
        this.props.toggleActive(pageId);
    },

    renderAddForm: function () {
        var PageForm = require('../pageForm/pageForm');

        React.render(
            <PageForm
                prodId={this.props.prodId}
                onSave={this.addPage} />,
            document.querySelector('#index')
        );
    },
    addPage: function (newPage) {
        this.props.onAdd(newPage);
    }
});

module.exports = PageList;