/**/
var React = require('react');

var ajax = require('../../lib/ajax');
var copy = require('../../lib/copy');

require('./testPage.less');

var TestList = require('./testList');
var TestSteps = require('../testSteps/testSteps');

var PageHeader = require('./pageHeader');

var TestPage = React.createClass({
    propTypes: {
        prodName: React.PropTypes.string,
        pageName: React.PropTypes.string,
        pageId: React.PropTypes.number.isRequired
    },
    getInitialState: function () {
        return {
            detailUrl: '/get_test_list',
            testList: [],
            show: 'list',
            testName: null
        };
    },
    render: function () {
        var prodName = this.props.prodName;
        var pageName = this.props.pageName;
        var testName = this.state.testName;

        var displayTestList = this.state.show === 'list' ? 'block' : 'none';
        var displayTestSteps = this.state.show === 'steps' ? 'block' : 'none';

        var testList = this.state.testList;

        return (
            <div className="test-page-container">

                <PageHeader
                    prodName={prodName}
                    pageName={pageName}
                    testName={testName} />
                
                
                
                <div className="test-list-container" style={{display: displayTestList}} ref="list">
                    
                    <section className="operation-area">
                        <button className="btn btn-primary" onClick={this.addTest}>添加功能点</button>
                    </section>
                    
                    <TestList testList={testList} opentTestDetail={this.showSteps} />
                
                </div>

                <div className="test-steps-container" style={{display: displayTestSteps}} ref="steps">
                </div>
            </div>
        );
    },
    componentDidMount: function () {

        // 第一次渲染拉取测试功能列表
        var pageId = this.props.pageId;
        this.showTestList(pageId);
    },
    componentWillReceiveProps: function (newProps) {

        // 切换页面时，显示状态切换回list
        if (this.props.pageId !== newProps.pageId) {
            this.setState({
                show: 'list'
            });
        }
    },
    componentDidUpdate: function (oldProps) {

        // 切换页面时，拉取新页面的测试功能列表
        if (this.props.pageId !== oldProps.pageId) {
            console.log('update test list');
            pageId = this.props.pageId;
            this.showTestList(pageId);
        }
    },
    showTestList: function (pageId) {
        ajax({
            url: this.state.detailUrl,
            data: {
                id: pageId
            },
            success: this.renderTestList
        });
    },
    renderTestList: function (data) {
        this.setState({
            testList: data.list
        });
    },
    addTest: function (e) {
        console.log('add test');
        var TestForm = require('../testForm/testForm');

        e.preventDefault();
        
        React.render(
            <span></span>,
            document.getElementById('extraContainer')
        );
        
        React.render(
            <TestForm
                pageId={this.props.pageId}
                onSave={this.renderNewTest} />,
            document.getElementById('extraContainer')
        );
    },
    renderNewTest: function (newTest) {
        console.log('new test');
        var list = copy(this.state.testList) || [];
        list.push(newTest);

        this.setState({
            testList: list
        });
    },

    // 渲染测试步骤(细节)
    showSteps: function (id, testName) {
        this.setState({
            show: 'steps',
            testName: testName
        });
        React.render(
            <TestSteps testId={id} onReturn={this.showList}></TestSteps>,
            this.refs.steps.getDOMNode()
        );
    },
    showList: function () {
        this.setState({
            show: 'list',
            testName: null
        });
    }

});

module.exports = TestPage;