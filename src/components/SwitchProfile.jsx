import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function SwitchProfile() {
  const user = useSelector((storeState) => storeState.userModule.user)
  console.log("user swic: ", user)
  return (
    <Link to={`/profile/${user?.username}`}>
    <div className="post-user-info">
      <div className="post-user-info-container">
       
          <div className="container-img">
            <img className="img" src={user?.imgUrl} />
          </div>
          <div className="container-data">
            <div className="container-data-div">
              <div className="container-data-fullName-date">
                <div className="container-data-fullName">{user?.username}</div>
              </div>
              <div className="container-data-loc">{user?.fullname}</div>
            </div>
          </div>

          <div className="container-moreOptions">switch</div>
       
      </div>
    </div>
    </Link>
  )
}
