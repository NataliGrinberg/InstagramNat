import { Svgs } from "../assets/Svgs"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { onToggleModalCreate } from "../store/actions/create.actions"
import { useEffect, useState } from "react"
import { LogOut } from "./LogOut"
import instaNat from "../assets/images/InstaNat.png"

export function NavBar() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const location = useLocation()
  const [openMore, setOpenMore] = useState(false)

  let [svgHome, setSvgHome] = useState(Svgs.homeBlack)

  useEffect(() => {
    setOpenMore(false)

    if (location.pathname !== "/") setSvgHome(Svgs.homeWhite)
    else setSvgHome((svgHome = Svgs.homeBlack))
  }, [location])

  return (
    <section className="navBar-grid-container">
      <div className="flex">
        <div className="navBar-logo">
          <a className="flex-navBar-list" href="/" role="link">
            <div className="div-navBar-logo-instagram">
              <div className="svgs">{Svgs.instagram}</div>
            </div>
            <div className="div-navBar-logo">
              <img className="logo" src={instaNat} />
            </div>
          </a>
        </div>

        <div className="navBar-list">
          <div className="div-navBar-list home">
            <a className="flex-navBar-list" href="/" role="link">
              <div className="svgs">{svgHome}</div>
              <div className="div-name">
                <div className="name">Home</div>
              </div>
            </a>
          </div>

          <div className="div-navBar-list search">
            <div className="flex-navBar-list">
              <div className="svgs">{Svgs.search}</div>
              <div className="div-name">
                <div className="name">Search</div>
              </div>
            </div>
          </div>

          <div className="div-navBar-list explore">
            <a className="flex-navBar-list" href="/" role="link">
              <div className="svgs">{Svgs.explore}</div>
              <div className="div-name">
                <div className="name">Explore</div>
              </div>
            </a>
          </div>

          <div className="div-navBar-list reel">
            <a className="flex-navBar-list" href="/" role="link">
              <div className="svgs">{Svgs.reels}</div>
              <div className="div-name">
                <div className="name">Reels</div>
              </div>
            </a>
          </div>

          <div className="div-navBar-list chat">
            <a className="flex-navBar-list" href="/chat" role="link">
              <div className="svgs">{Svgs.messenger}</div>
              <div className="div-name">
                <div className="name">Messages</div>
              </div>
            </a>
          </div>

          <div className="div-navBar-list notifications">
            <div className="flex-navBar-list">
              <div className="svgs">{Svgs.notifications}</div>
              <div className="div-name">
                <div className="name">Notifications</div>
              </div>
            </div>
          </div>

          <div className="div-navBar-list create">
            <div
              className="flex-navBar-list"
              onClick={() => {
                onToggleModalCreate({ type: "UploadImg" })
              }}
            >
              <div className="svgs">{Svgs.newPost}</div>
              <div className="div-name">
                <div className="name">Create</div>
              </div>
            </div>
          </div>

          <div className="div-navBar-list profile">
            <Link
              className="flex-navBar-list"
              to={`/profile/${loggedInUser?.username}`}
            >
              <div className="navBar-list-profile-img-div">
                <img
                  className="navBar-list-profile-img"
                  src={loggedInUser?.imgUrl}
                />
              </div>

              <div className="div-name">
                <div className="name">Profile</div>
              </div>
            </Link>
          </div>
        </div>
        {/* <Link className="profile" to="/profile/:profileId" profileId={loggedInUser.id}>{Svgs.emoji} Profile</Link> */}

        <div className="navBar-more">
          <div
            className="flex-navBar-list"
            onClick={() => {
              setOpenMore(!openMore)
            }}
          >
            <div className="svgs">{Svgs.settingsMore}</div>
            <div className="div-name">
              <div className="name">More</div>
            </div>
          </div>
          {openMore && <LogOut />}
        </div>
      </div>
      {/* <Outlet context={{ onAddEmail, onUpdateEmail, onSaveDraftEmail }} /> */}
    </section>
  )
}
