import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile">
        <h3>Profile</h3>
        {this.props.user ? (
          <div>
            <br />
            <h4>{this.props.user.displayName}</h4>
            <img
              className="profileImg"
              src={this.props.user.photoURL}
              alt="user"
            />
            <p>{this.props.user.email}</p>
            <p>{this.props.user.uid}</p>
          </div>
        ) : (
          <span>Guest image will go here...</span>
        )}
      </div>
    );
  }
}

export default Profile;
