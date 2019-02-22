import React from 'react'

class EditPost extends React.Component {
    contentRef = React.createRef();
    titleRef = React.createRef();


    editPost = (event) => {
        event.preventDefault();
        const post = {
            id: this.props.post.id,
            title: this.titleRef.current.value,
            user: this.props.user.displayName,
            userId: this.props.user.uid,
            userImage: this.props.user.photoURL,
            content: this.contentRef.current.value,
            likes: this.props.post.likes,
            likedBy: this.props.post.likedBy,
            dislikes: this.props.post.dislikes,
            dislikedBy: this.props.post.dislikedBy,
            time: `Last edited: ${new Date().toDateString()} - ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
            timeId: Date.parse(new Date())
        };

        this.props.editPost(post);
        this.titleRef.current.value = "";
        this.contentRef.current.value = "";
    };


    render() {
        return (

            <div>
                {this.props.user ?
                    <form className="form-group" onSubmit={this.editPost} >
                        <label htmlFor="title">Title:</label>
                        <br />
                        <input ref={this.titleRef} type="text" defaultValue={this.props.post.title} />
                        <br />
                        <label htmlFor="content">Content: </label>
                        <br />
                        <textarea
                            ref={this.contentRef}
                            defaultValue={this.props.post.content}
                            name="content"
                            id=""
                            cols="30"
                            rows="5"
                        />{" "}
                        <br />
                        <button className="btn btn-lg btn-dark" type="submit">
                            Edit
        </button>
                    </form> : <div>Please Log in to Create and View User Posts</div>}
            </div>
        );
    }
}

export default EditPost;