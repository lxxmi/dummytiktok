const UserCard = ({user}) => {
  let {avatar, username, name } = user;
  
    return (
      <div className ="UserCard">
          <img className="user-avatar" alt="user-profile-pic" src={avatar} />
          <div className="username-container">
              <h4 className="user-Username bold">{username}</h4>
              <small className="user-Name">{name}</small>
          </div>
      </div>
    );
  }
  
  export default UserCard;