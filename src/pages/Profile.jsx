import { useSelector } from "react-redux"
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"
import { postService } from "../services/post.service"
import { Svgs } from "../assets/Svgs"
import { userService } from "../services/user.service"
import { useEffect, useRef, useState } from "react"
import { PostListPro } from "../components/PostListPro"
import { AppFooter } from "../components/AppFooter"
import { loadUserPosts } from "../store/actions/post.actions"

export function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const posts = useSelector((storeState) => storeState.postModule.userPosts)
  const userLoggin = useSelector((storeState) => storeState.userModule.user)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isUserLogginProfile, setIsUserLogginProfile] = useState(false)

  useEffect(() => {
    loadUser()
  }, [username])

  async function loadUser() {
    try {
      const userByName = await userService.getByUserName(username)
      setUser(userByName)
      loadPosts(userByName)

    const userFollows = userByName?.followers?.filter(
      (fol) => fol._id === userLoggin._id
    )

    if (userFollows !== null && userFollows?.length > 0) return true
    return false


      // if (userLoggin._id === userByName._id) setIsUserLogginProfile(true)
      // else {
      //   const isFoll = userService.checkIsFollowing(userByName)
      //   setIsFollowing(isFoll)
      // }
    } catch (err) {
      console.log("err:", err)
    }
  }

  async function loadPosts(userByName) {
    try {
      console.log("load post from pro")
      loadUserPosts(userByName)
    } catch (err) {
      console.log("err:", err)
    }
  }

  if (!user) return <div>Loading...</div>
  if (!posts) return <div>Loading posts...</div>

  return (
    <section className="profile-container">
      <div className="profile-container-data">
        <div className="profile-container-data-div">
          <header className="profile-container-data-header">
            <div className="profile-container-header-img">
              <div className="profile-container-header-img-div">
                <img className="img" src={user.imgUrl} />
              </div>
            </div>
            <section className="profile-container-header-section">
              <div className="profile-container-user">
                <div className="profile-container-user-username">
                  {user.username}
                </div>
                <div className="profile-container-user-buttons">
                  {/* <div className="profile-container-user-buttons-flex"> */}

                  {(isUserLogginProfile && (
                    <div className="profile-container-user-buttons-flex">
                      <div className="button-edit">
                        <a className="button-edit-link" href="/" role="link">
                          Edit profile
                        </a>
                      </div>
                      <div className="button-view">
                        <a className="button-view-link" href="/" role="link">
                          View archive
                        </a>
                      </div>
                    </div>
                  )) ||
                    (isFollowing && (
                      <div className="profile-container-user-buttons-flex">
                        <div className="button-edit">
                          <a className="button-edit-link" href="/" role="link">
                            Following
                          </a>
                        </div>
                        <div className="button-view">
                          <a className="button-view-link" href="/" role="link">
                            message
                          </a>
                        </div>
                      </div>
                    )) || (
                      <div className="profile-container-user-buttons-flex">
                        <div className="button-edit">
                          <a
                            className="button-edit-link follow"
                            href="/"
                            role="link"
                          >
                            Follow
                          </a>
                        </div>
                        <div className="button-view">
                          <a className="button-view-link" href="/" role="link">
                            message
                          </a>
                        </div>
                      </div>
                    )}
                </div>
                <div className="profile-container-user-option">
                  <div className="profile-container-user-svg">
                    {isUserLogginProfile
                      ? Svgs.optionsProfile
                      : Svgs.profileMore}
                  </div>
                </div>
              </div>
              <div className="profile-container-empty"></div>
              <div className="profile-container-count">
                <div className="profile-post-length">
                  <span className="weight">{posts.length}</span> posts
                </div>
                <div className="profile-post-followers">
                  <span className="weight">
                    {user.followers?.length > 0 ? user.followers?.length : 0}
                  </span>{" "}
                  followers
                </div>
                <div className="profile-post-following">
                  <span className="weight">
                    {user.following?.length > 0 ? user.following?.length : 0}
                  </span>{" "}
                  following
                </div>
              </div>

              <div className="profile-container-fullname-flex">
                <div className="profile-container-fullname">
                  <span className="profile-container-fullname-div">
                    {user.fullname}
                  </span>
                </div>
                <div className="profile-container-fullname-empty"></div>
              </div>
            </section>
          </header>

          <div className="profile-container-tabs">
            <NavLink
              className="profile-container-tab-posts"
              end
              to={`/profile/${user?.username}`}
            >
              <div className="link">
                <div className="post-svg">{Svgs.posts}</div>
                <div className="post-name">POSTS</div>
              </div>
            </NavLink>

            {/* <div className=" profile-container-tab-posts">
              <NavLink className="link" end to={`/profile/${user?.username}`}>
                <div className="post-svg">{Svgs.posts}</div>
                <div className="post-name">POSTS</div>
              </NavLink>
            </div> */}

            {isUserLogginProfile && (
              <NavLink
                className="profile-container-tab-saved"
                to={`/profile/${user?.username}/saved`}
              >
                <div className="link">
                  <div className="saved-svg">{Svgs.saved}</div>
                  <div className="saved-name">SAVED</div>
                </div>
              </NavLink>
            )}
            <NavLink
              className="profile-container-tab-tagged"
              to={`/profile/${user?.username}/tagged`}
            >
              <div className="link">
                <div className="tagged-svg">{Svgs.tagged}</div>
                <div className="tagged-name">TAGGED</div>
              </div>
            </NavLink>
          </div>

          <div className="profile-container-tabs-data">
            <Outlet context={{ posts: posts }} />
          </div>
        </div>
      </div>

      <div className="profile-container-police">
        <AppFooter />
      </div>
    </section>
  )
}
