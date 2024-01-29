import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function SwitchProfile() {
  const user = useSelector((storeState) => storeState.userModule.user)

  return (
    <div className="switch-container">
      <div className="switch-container-div">

        <div className="container-img">
          <Link to={`/profile/${user?.username}`}>
            <img className="img" src={user?.imgUrl} />
          </Link>
        </div>

        <div className="container-data">
          <div className="container-data-div">

            <Link className="container-data-username-date" to={`/profile/${user?.username}`}>
              
                <div className="container-data-username">{user?.username}</div>
              
            </Link>

            <div className="container-data-fullname">{user?.fullname}</div>

          </div>
        </div>

        <div className="container-switch">
          <div className="button">switch</div>
        </div>
      </div>
    </div>
  )
}
