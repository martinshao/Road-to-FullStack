var InputControlES5 = React.createClass({
    propTypes: {
        initialValue: React.PropTypes.string
    },
    defaultProps: {
        initialValue: ''
    },
    // 设置 initial state
    getInitialState: function() {
        return {
            text: this.props.initialValue || 'placeholder'
        };
    },
    handleChange: function(event) {
        this.setState({
            text: event.target.value
        });
    },
    render: function() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange} value={this.state.text} />
            </div>
        );
    }
});