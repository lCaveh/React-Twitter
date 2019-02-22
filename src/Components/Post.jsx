import React from 'react'
import EditPost from './EditPost';


class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAccess: false,
        }
    }

    editTriggered() {

        this.setState({ editAccess: !this.state.editAccess });
    }

    render() {
        return (

            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.post.title}</h5>
                        <p className="card-text">Content: {this.props.post.content}</p>
                        <br />
                        <hr />
                        <div className="post-info-container">

                            <div className="text-info">
                                <span className="card-text postedBy post-info">
                                    Posted by{" "}
                                    <img className="postImg" src={this.props.post.userImage} alt="" />

                                    {this.props.post.user}    -   {this.props.post.time}
                                </span>
                            </div>

                            <div className="clickable-info">
                                <span>
                                    <b> {this.props.post.likes}</b>
                                </span>
                                <span
                                    onClick={() => {
                                        this.props.addLikes(this.props.post);
                                    }}
                                    className="thumb">
                                    👍
                                    </span>

                                <span>
                                    <b> {this.props.post.dislikes}</b>
                                </span>
                                <span onClick={() => {
                                    this.props.addDislikes(this.props.post);
                                }}
                                    className="thumb">



                                    👎
                                </span>

                                {this.props.editPost ?
                                    <span>

                                        <span
                                            onClick={() => { this.editTriggered(this.props.post) }}
                                            className="thumb">
                                            🖋
                                        </span>
                                        <span onClick={() => { this.props.deletePost(this.props.post) }}
                                            className="thumb">
                                            🗑
                                     </span>
                                    </span> : <span></span>}
                            </div>
                        </div>


                    </div>
                </div>


                {(this.state.editAccess) ?
                    <div>
                        <EditPost user={this.props.user} post={this.props.post} editPost={this.props.editPost}></EditPost>
                    </div> : <div></div>
                }


            </div>

        )
    }
}



export default Post;