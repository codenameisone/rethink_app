var ShowPost = React.createClass({
  getInitialState: function () {
    return this.props;
  },

  componentDidMount: function () {
    var self = this;
    var rows = [];
    $.ajax({
      url: this.props.source,
      dataType: 'json'
    })
    .done(function(result) {
      if ( !result.posts || !result.posts.length ) {
        return;
      } 
      var posts = result.posts;

      for(var i = 0, length = posts.length; i < length; i++) {
        // если свойство унаследовано - continue

        rows.push(<li key={i}>
          <span>{posts[i].title} </span>
          <span>{posts[i].text} </span>
          <span>id: {posts[i].id} </span>
        </li>);
      };

      if (self.isMounted()) {
        self.setState({
          rows: rows
        });
      };

      var evtSource = new EventSource('/posts/stream');
      evtSource.onmessage = function(e) {
        var data = JSON.parse(e.data);
        rows.push(<li key={i}>
            <span>{data.title} </span>
            <span>{data.text} </span>
            <span>id: {data.id} </span>
          </li>);

        if (self.isMounted()) {
          self.setState({
            rows: rows
          });
        };
      }

    });
  },

  render: function () {
    console.log(this.state);
    return (
      <ul id="postsList">{this.state.rows}</ul>
    );
  }
});