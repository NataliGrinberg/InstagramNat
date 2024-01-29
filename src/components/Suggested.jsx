import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function Suggested() {
  const chunkSize = 5
  const userLoggin = useSelector((storeState) => storeState.userModule.user)
  const users = useSelector((storeState) => storeState.userModule.users)
  let userSuggested = users.filter(us => us._id !== userLoggin._id)
  //const userst = usersy.filter(us=> {us.followers !== userLoggin._id})
  //let userSuggested = []
  if (users) {
    userSuggested = (userSuggested.length > chunkSize
        ? userSuggested.splice(0, chunkSize)
        : userSuggested.splice(0, users.length))
  }
debugger
  return (
    <div className="suggested-container">
      <div className="suggested-container-div">
        <div className="suggested-container-flex">
          <div className="suggested-container-flex-title">
            <div className="title">
              <span className="title-span">
                <div className="span">Suggested for you</div>
              </span>
            </div>
            <div className="seeAll">
              <span className="seeAll-span">
                <div className="span">See All</div>
              </span>
            </div>
            {/* <a className="" href="/explore/people/" role="link">
            <span className="" dir="auto">
              See All
            </span>
          </a> */}
          </div>

          <div className="suggested-container-list">
            <div className="suggested-container-list-div">
              <div className="suggested-container-list-hidden">
                <div className="suggested-container-list-flex">
                  {/* <div className="post-suggested-list"> */}
                  {/* <div></div> */}
                  {!!userSuggested?.length &&
                    userSuggested.map((user) => (
                      <div className="user-container">
                        <div className="user-container-div">
                          <div className="user-container-flex">
                            <div className="user-container-flex-div">
                              <div className="user-container-img">
                                <div className="user-img">
                                  <div className="user-img-div">
                                    <div className="img-canvas-link">
                                      <canvas
                                        className="canvas"
                                        height="68"
                                        width="68"
                                      ></canvas>
                                      <Link
                                        className="link"
                                        to={`/profile/${user.username}`}
                                      >
                                        <img
                                          className="img"
                                          src={user.imgUrl}
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="user-container-username"> */}
                                <div className="user-container-flex-username">

                                  <div className="user-container-flex-div">
                                    <Link className="link" to={`/profile/${user.username}`}>
                                      {user.username}
                                    </Link>
                                  </div>

                                  <span className="user-container-flex-follow">
                                  <span className="span">{user?.followers ? 'Follows you' : 'Suggested for you'}</span>
                                  </span>
                                </div>
                              
                              {/* </div> */}

                              <div className="user-container-follwing">
                              <div className="user-container-follwing-div">
                                <div className="user-container-follwing-button">
                                <div className="button">Follow </div>
                                </div>
                                </div> 
                              </div>
                           
                            </div>
                          </div>
                        </div>
                      </div>

                      // <CommentDetails
                      //     key={comment.id}
                      //     comment={comment}
                      // />
                    ))}
                  {!userSuggested?.length && (
                    <h1 className="no-users-info">dont have users suggested</h1>
                  )}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
