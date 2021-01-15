const { default: UserCard } = require("./UserCard")

const SuggestedAccounts = ({users, toggleFollow}) => {
    return (
      <div className ="suggested-acc-col">
          <div className="suggested-box">
              <h2 className="label">Suggested accounts</h2>
              {users && users.map((user, index) =>(
                <div key={index} className="row">
                    <UserCard user={user} />    
                  {user.button_visible &&  <div 
                    className="follow-btn" 
                    onClick = {()=> toggleFollow(user)}>
                      Follow
                    </div>}         
              </div>
          ))}
          </div>
      </div>
    );
  }
  
  export default SuggestedAccounts;