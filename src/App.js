import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import PostForm from "./Components/PostForm";
import PostList from "./Components/PostList";
import UserPosts from "./Components/UserPosts";
import Profile from "./Components/Profile";
import Header from "./Components/Header";
import base from "./firebase";
import firebase, { auth, provider } from "./firebase.js";

import toastr from 'toastr';
import "toastr/build/toastr.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      posts: [],
      userPosts: [],
      user: null
    };

    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
  }

  componentDidMount() {
    // this.firebaseEvents();
    this.fetchData();
    toastr.options = {
      positionClass: 'toast-top-right',
      hideDuration: 300,
      timeOut: 2000
    }
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });

      }
    });
  }
//   firebaseEvents() {
    
// const functions = require('firebase-functions');

// const admin = require('firebase-admin');
// admin.initializeApp();
// exports.updateRef = functions.database.ref('posts').onWrite((event) => {
//   console.log(event)
// });
//   };

  fetchData() {
    const postsRef = firebase.database().ref("posts");
    postsRef.on("value", snapshot => {
      let posts = snapshot.val();
      let newState = [];
      for (let key in posts) {
        newState.push({
          id: key,
          user: posts[key].user,
          userId: posts[key].userId,
          userImage: posts[key].userImage,
          title: posts[key].title,
          content: posts[key].content,
          likes: posts[key].likes,
          likedBy: posts[key].likedBy,
          dislikes: posts[key].dislikes,
          dislikedBy: posts[key].dislikedBy,
          time: posts[key].time,
          timeId: posts[key].timeId
        });
      }
      this.setState({
        posts: newState
      });
      this.getUserPosts();
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addPost = post => {
    const postsRef = firebase.database().ref("posts");
    this.filter();
    postsRef.push(post);

    setTimeout(() => {
      this.fetchData();
    }, 200)


    setTimeout(() => {
      toastr.success(`${this.state.user.displayName} has created a new post!`)
    }, 300)

  };

  deletePost = post => {
    const postRef = firebase.database().ref("posts/" + post.id);
    postRef.remove();
    setTimeout(() => {
      this.fetchData();
    }, 200)
    setTimeout(() => {
      toastr.warning(`${this.state.user.displayName} has deleted a post!`)
    }, 300)

  }

  editPost = post => {
    const postRef = firebase.database().ref("posts/" + post.id);

    postRef.update(post);
    setTimeout(() => {
      this.fetchData();
    }, 200)
  }

  getUserPosts = () => {
    if (this.state.user) {
      let userPosts = this.state.posts.filter(
        post => this.state.user.uid == post.userId
      );
      this.setState({
        userPosts: userPosts
      });
    }
  };

  addLikes = post => {
    if (this.state.user) {
      let likedBefore = false;
      post.likedBy.map(id => {
        if (id == this.state.user.uid) {
          likedBefore = true;
          post.likes--;
          let result = post.likedBy.filter(userId => userId != id);
          post.likedBy = [...result];
        }
      });
      if (!likedBefore) {
        post.likes++;
        post.likedBy.push(this.state.user.uid);
        likedBefore = true;
      }
      const postRef = firebase.database().ref("posts/" + post.id);
      postRef.update(post);
      this.filter();
      this.fetchData();
    }
  };

  addDislikes = post => {
    if (this.state.user) {
      let dislikedBefore = false;
      post.dislikedBy.map(id => {
        if (id == this.state.user.uid) {
          dislikedBefore = true;
          post.dislikes--;
          let result = post.dislikedBy.filter(userId => userId != id);
          post.dislikedBy = [...result];
        }
      });
      if (!dislikedBefore) {
        post.dislikes++;
        post.dislikedBy.push(this.state.user.uid);
        dislikedBefore = true;
      }
      const postRef = firebase.database().ref("posts/" + post.id);
      postRef.update(post);
      this.filter();
      this.fetchData();
    }
  };

  likedPosts = () => {
    this.state.posts.sort(function (a, b) {
      return a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0;
    });
    this.setState(this.state.posts);
    this.state.selected = "like";
  };

  dislikedPosts = () => {
    this.state.posts.sort(function (a, b) {
      return a.dislikes > b.dislikes ? -1 : b.dislikes > a.dislikes ? 1 : 0;
    });
    this.setState(this.state.posts);
    this.state.selected = "dislike";
  };

  recentPosts = () => {
    this.state.posts.sort(function (a, b) {
      return a.timeId > b.timeId ? -1 : b.timeId > a.timeId ? 1 : 0;
    });
    this.setState(this.state.posts);
    this.state.selected = "recent";
  };

  filter() {
    if (this.state.selected == "like") {
      this.likedPosts();
    } else if (this.state.selected == "dislike") {
      this.dislikedPosts();
    } else if (this.state.selected == "recent") {
      this.recentPosts();
    }
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  render() {
    return (
      <div>
        <Header
          user={this.state.user}
          handleLogin={this.login}
          handleLogout={this.logout}
          posts={this.state.posts}
        />
        <div className="main-content">
          <div className="profileDiv">
            <Profile user={this.state.user} />
            <PostForm addPost={this.addPost} user={this.state.user} />
          </div>
          <div className="postDiv">


            <UserPosts user={this.state.user} deletePost={this.deletePost} userPosts={this.state.userPosts} editPost={this.editPost} addLikes={this.addLikes} addDislikes={this.addDislikes}
              addLikes={this.addLikes}></UserPosts>
          </div>

          <PostList
            likedPosts={this.likedPosts}
            dislikedPosts={this.dislikedPosts}
            recentPosts={this.recentPosts}
            addDislikes={this.addDislikes}
            addLikes={this.addLikes}
            posts={this.state.posts}
            user={this.state.user}
            perPage={5}
          />
        </div>
      </div>
    );
  }
}

export default App;
