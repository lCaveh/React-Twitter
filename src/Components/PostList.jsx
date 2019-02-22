import React from 'react'
import Post from './Post';
class PostList extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <h2>All Posts</h2>
                    {this.props.posts.map(post => (
                        <Post post={post}
                            key={post.id}
                            user={this.props.user}
                            addLikes={this.props.addLikes}
                            addDislikes={this.props.addDislikes}
                            data={this.props.posts}
                        ></Post>
                    ))}
                </div>
            </div>
        );
    }
}


export default PostList;