import React from "react";
import Post from "./Post";
class PostList extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>All Posts</h2>
          <span>Filter by: </span>
          <input
            className="radio"
            onChange={() => {
              this.props.recentPosts();
            }}
            type="radio"
            name="filter"
            value="recent"
          />{" "}
          Most Recent
          <input
            className="radio"
            onChange={() => {
              this.props.likedPosts();
            }}
            type="radio"
            name="filter"
            value="likes"
          />{" "}
          Likes
          <input
            className="radio"
            onChange={() => {
              this.props.dislikedPosts();
            }}
            type="radio"
            name="filter"
            value="dislikes"
          />{" "}
          Dislikes
          {this.props.posts.map(post => (
            <Post
              post={post}
              key={post.id}
              user={this.props.user}
              addLikes={this.props.addLikes}
              addDislikes={this.props.addDislikes}
              data={this.props.posts}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PostList;
