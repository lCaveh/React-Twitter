import React from 'react'

class PostList extends React.Component {




    render() {

        return (
            <div>
                <h2>All Posts</h2>
                <span>Filter by:  </span>

                <input className="radio" onChange={() => { this.props.recentPosts() }} type="radio" name="filter" value="recent" /> Most Recent
                <input className="radio" onChange={() => { this.props.likedPosts() }} type="radio" name="filter" value="likes" /> Likes
                <input className="radio" onChange={() => { this.props.dislikedPosts() }} type="radio" name="filter" value="dislikes" /> Dislikes
            

                {this.props.posts.map(post => (

                    <div key={post.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">Content: {post.content}</p><br/>
                                <hr />
                                <p className="card-text">Posted by <img className="postImg" src={post.userImage} alt=""/>{post.user} at {post.time}
                                <span><b> {post.likes}</b></span>
                                <button onClick={() => { this.props.addLikes(post) }} className="thumb">👍</button>
                                <span><b> {post.dislikes}</b></span>
                                <button onClick={() => { this.props.addDislikes(post) }} className="thumb">👎</button></p>

                            </div>
                        </div>
                    </div>

                ))}
            </div>
        )
    }
}

export default PostList;