class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: []};

        let aggregator = new AggregatedEventSource(this.props.url);
        aggregator.subscribe((posts) => {
            this.setState({posts: _.sortBy(posts, dateSorter)});
        });

        // helper method
        function dateSorter(post) {
            return -new Date(post.created_at);
        }
    }

    render() {
        var {posts} = this.state;
        return (
            <div className="ui cards">
                {posts.map((post) => {
                    return (<Post post={post} key={post.id}/>);
                })}
            </div>
        );
    }
}