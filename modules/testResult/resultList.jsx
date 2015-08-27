var React = require('react');

var ajax = require('ajax');

var Result = React.createClass({
    propTypes: {
        testId: React.PropTypes.number
    },
    getInitialState: function () {
        return {
            setBaseImgUrl: '/autotest/api/task/setbase'
        };
    },
    render: function () {
        return (
            <tr key={index}>
                <th>{this.props.description}</th>
                <td>
                    <img src={this.props.historyImg} alt="基准图" />
                </td>
                <td>
                    <img src={this.props.currentImg} alt="当前图" />
                    <button
                        className="btn btn-default set-base-btn"
                        onClick={this.setBaseImg}
                        disabled={this.state.set}>
                            设为基准图
                    </button>
                </td>
                <td>
                    <img src={this.props.diffImg} alt="对比图" />
                </td>
            </tr>
        );
    },
    setBaseImg: function (e) {
        var imgName = this.props.imgName;

        e.preventDefault();

        this.postData(imgName, this.props.testId);
    },
    postData: function (imgName, testId) {
        ajax({
            url: this.state.setBaseImgUrl,
            type: 'post',
            data: {
                img_name: imgName,
                fun_id: testId
            },
            success: this.onSet
        });
    },
    onSet: function () {
        var Dialog = require('dialog/dialog');
        React.render(
            <span></span>,
            document.querySelector('#extraContainer')
        );
        React.render(
            <Dialog>
                <p style={{textAlign: 'center'}}>设置成功，下次运行测试时将会使用当前图片作为基准图</p>
            </Dialog>,
            document.querySelector('#extraContainer')
        );

        this.setState({
            set: true
        });
    }
});

var ResultList = React.createClass({
    propTypes: {
        testId: React.PropTypes.number
    },
    getInitialState: function () {
        return {};
    },
    render: function () {
        var staticBasePath = 'http://' + window.location.host + '/';
        var list = this.props.list;
        var resultList = [];

        var testId = this.props.testId;

        var setBaseImg = this.setBaseImg;
        
        list.map(function (result, index) {
            var description = result.name;

            // 拼接图片路径
            var historyImg = staticBasePath + result.basePath + '/' + result.imgName + '.history.png?' + Date.now();
            var currentImg = staticBasePath + result.basePath + '/' + result.imgName + '.png?' + Date.now();
            var diffImg = staticBasePath + result.basePath + '/' + result.imgName + '.fail.png?' + Date.now();

            resultList.push(
                <Result
                    key={index}
                    testId={testId}
                    index={index}
                    description={description}
                    imgName={result.imgName}
                    historyImg={historyImg}
                    currentImg={currentImg}
                    diffImg={diffImg} />
            );
        });
        
        return (
            <table className="table test-result">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>基准图</th>
                        <th>当前图</th>
                        <th>对比图</th>
                    </tr>
                </thead>
                <tbody>
                    {resultList}
                </tbody>
            </table>
        );
    }
});

module.exports = ResultList;