class Post extends React.Component {
    render() {
        var {post} = this.props;
        return (
            <div className="card">
                <div className="content">
                    <div className="header"> {post.title} </div>
                    <div className="description"> {post.text} </div>
                </div>
            </div>
        );
    }
}