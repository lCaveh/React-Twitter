import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header bg-primary text-center text-white">
        <div className="login">
          <h3>User Login</h3>

          {this.props.user ? (
            <div>
              <p>Welcome {this.props.user.displayName}</p>
              <button
                className="btn btn-dark"
                onClick={this.props.handleLogout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button onClick={this.props.handleLogin}>Log In</button>
          )}
        </div>
        <h1>React Forum</h1>
       
        <h4>Total posts: {this.props.posts.length}</h4>
      </div>
    );
  }
}

export default Header;
