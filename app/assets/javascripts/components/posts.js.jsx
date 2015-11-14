var ShowPost = React.createClass({
  getInitialState: function () {
    return this.props;
  },

  render: function () {
    var rows = [];
    for(var prop in this.props) {
      // если свойство унаследовано - continue
      if (!this.props.hasOwnProperty(prop)) continue

      rows.push(<tr>
        <td>{this.props[prop].title}</td>
        <td>{this.props[prop].text}</td>
        <td>id: {this.props[prop].id}</td>
      </tr>);
    }
    return (
      <table className="table">{rows}</table>
    );
  }
});