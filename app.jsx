var React = require('react');
var ajax = require('./lib/ajax');
var copy = require('./lib/copy');

var Page = require('./component/page/page');
var Catelog = require('./component/catelog/catelog');
var PageContent = require('./component/pageContent/pageContent');

var Index = React.createClass({
    getInitialState: function () {
        return {
            getCatelogsUrl: '/get_catelogs',
            addCatelogUrl: '/add_catelog'
        };
    },
    render: function () {
        return (
            <Page>
                <Catelog
                    catelogList={this.state.catelogList}
                    addHandler={this.addCatelog} />
                <PageContent>
                    <div id="index">
                    </div>
                </PageContent>
            </Page>
        );
    },
    componentDidMount: function () {
        React.render(
            <h2 className="page-header">前端自动化测试</h2>,
            document.querySelector('#index')
        );
        this.getCatelogList();
    },
    getCatelogList: function () {
        var self = this;
        ajax({
            url: this.state.getCatelogsUrl,
            success: function (list) {
                self.listLoaded(list);
            }
        });
    },
    listLoaded: function (data) {
        this.setState({
            catelogList: data
        });
    },
    addCatelog: function (form) {
        if (form.name && form.description) {
            console.log('add catelog');
            this.setState({
                cnameCache: form.name
            });
            ajax({
                url: this.state.addCatelogUrl,
                type: 'post',
                data: form,
                success: this.afterAddCatelog
            });
        }
    },
    afterAddCatelog: function (data) {
        var list;

        if (!data.id) {
            console.log('add fail');
        }
        
        list = copy(this.state.catelogList);
        list.push({
            name: this.state.cnameCache,
            id: data.id
        });
        
        this.setState({
            catelogList: list
        });
    }
});

React.render(
    <Index></Index>,
    document.getElementById('mainContainer')
);