import React from "react";
import Post from "./Post";

class UserPosts extends React.Component {
  render() {
    return (
      <div>
        {this.props.user ? (
          <div>
            <h2>{this.props.user.displayName}'s Posts</h2>
            {this.props.userPosts.map(post => (
              <Post
                post={post}
                key={post.id}
                user={this.props.user}
                editPost={this.props.editPost}
                addLikes={this.props.addLikes}
                addDislikes={this.props.addDislikes}
                deletePost={this.props.deletePost}
              />
            ))}
          </div>
        ) : (
          <div>
            <h1>Please login to see your posts</h1>
          </div>
        )}
      </div>
    );
  }
}

export default UserPosts;
