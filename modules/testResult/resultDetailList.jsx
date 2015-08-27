var React = require('react');

var DetailList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var info = this.props.info;
        var attrs = info['@attributes'] || {};

        var failiur = this.props.info.failure;
        var status;

        if (failiur) {
            status = (<span>fail</span>)
        } else {
            status = (<span>pass</span>)
        }

        return (
            <tr>
                <td>
                    {this.props.index + 1}
                </td>
                <td>
                    {attrs.name}
                </td>
                <td>
                    {attrs.time}
                </td>
                <td>
                    {status}
                </td>
            </tr>
        );
    },
    componentDidMount: function () {}
});

var ResultDetailList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var detailList = [];

        this.props.list.map(function (info, index) {
            detailList.push(
                <DetailList info={info} index={index} key={index} />
            );
        });

        return (
            <table className="table test-result">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>time</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {detailList}
                </tbody>
            </table>
        );
    },
    componentDidMount: function () {}
});

module.exports = ResultDetailList;