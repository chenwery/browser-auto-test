var React = require('react');
var ajax = require('./lib/ajax');
var copy = require('./lib/copy');

var Page = require('./component/page/page');
var Catelog = require('./component/catelog/catelog');
var PageContent = require('./component/pageContent/pageContent');

var Index = React.createClass({
    getInitialState: function () {
        return {
            getProdsUrl: '/get_products',
            catelogList: []
        };
    },
    render: function () {
        return (
            <Page>
                <Catelog
                    catelogList={this.state.catelogList}
                    onAdd={this.addProd} />
                
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
            url: this.state.getProdsUrl,
            success: this.listLoaded,
            error: function () {}
        });
    },
    listLoaded: function (data) {
        this.setState({
            catelogList: data.list
        });
    },
    addProd: function (newProd) {
        var list = copy(this.state.catelogList);
        list.push(newProd);
        this.setState({
            catelogList: list
        });
    }
});

React.render(
    <Index></Index>,
    document.getElementById('mainContainer')
);