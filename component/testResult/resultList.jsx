var React = require('react');

var ResultList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var list = this.props.list;
        var resultList = [];
        list.map(function (result) {
            resultList.push(
                <tr>
                    <th>{result.description}</th>
                    <td><img src={result.history_img} alt="历史图" /></td>
                    <td><img src={result.current_img} alt="当前图" /></td>
                    <td><img src={result.diff_img} alt="对比图" /></td>
                </tr>
            );
        });
        
        return (
            <table className="table test-result">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>历史截图</th>
                        <th>本次截图</th>
                        <th>截图对比</th>
                    </tr>
                </thead>
                <tbody>
                    {resultList}
                </tbody>
            </table>
        );
    },
    componentDidMount: function () {}
});

module.exports = ResultList;