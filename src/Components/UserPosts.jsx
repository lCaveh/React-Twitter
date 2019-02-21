import React from "react";

class UserPosts extends React.Component {
  render() {
    return (
      <div>
       <h2>User Posts</h2>
        {this.props.userPosts.map(post => (
          <div key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">Content: {post.content}</p>
                <br />
                <hr />
                <p className="card-text">
                  Posted by{" "}
                  <img className="postImg" src={post.userImage} alt="" />
                  {post.user} at {post.time}
                  <span>
                    <b> {post.likes}</b>
                  </span>
                  <button
                    onClick={() => {
                      this.props.addLikes(post);
                    }}
                    className="thumb"
                  >
                    👍
                  </button>
                  <span>
                    <b> {post.dislikes}</b>
                  </span>
                  <button
                    onClick={() => {
                      this.props.addDislikes(post);
                    }}
                    className="thumb"
                  >
                    👎
                  </button>

                  <button
                
                    className="thumb"
                  >
                    🖋
                  </button>
                  <button onClick={() => {this.props.deletePost(post)}}
                    className="thumb"
                  >
                    🗑
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserPosts;
