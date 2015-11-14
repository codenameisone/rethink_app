var Posts = React.createClass({
  getInitialState: function () {
    console.log(this.props);
    return this.props;
  },

  render: function () {
    return (
      <div className="comment-box">
        <span> {this.posts} </span>
      </div>
    );
  }
});