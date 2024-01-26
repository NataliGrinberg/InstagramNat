import { useState, useEffect } from "react"
import { userService } from "../services/user.service"
import { ImgUploader } from "./ImgUploader"
import { loadUsers } from "../store/actions/user.actions"
import { useSelector } from "react-redux"
import img1 from "../assets/images/img1.png"
import img2 from "../assets/images/img2.png"
import img3 from "../assets/images/img3.png"
import img4 from "../assets/images/img4.png"
import { AppFooter } from "./AppFooter";

export function Signup(props) {
  const users = useSelector((storeState) => storeState.userModule.users)
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const [isSignup, setIsSignup] = useState(false)

  useEffect(() => {
    console.log("hello")
    loadUsers()
    carousel()
  }, [])

  function clearState() {
    setCredentials(userService.getEmptyUser())
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function onLogin(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    props.onLogin(credentials)
    clearState()
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    props.onSignup(credentials)
    clearState()
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials((prevCredentials) => ({ ...prevCredentials, imgUrl }))
  }

  var myIndex = 0
  function carousel() {
    var i
    var x = document.getElementsByClassName("img-login5")
    for (i = 0; i < x.length; i++) {
      x[i].style.opacity = 0
    }
    myIndex++
    if (myIndex > x.length) {
      myIndex = 1
    }
    x[myIndex - 1].style.opacity = 1
    setTimeout(carousel, 4000)
  }

  return (
    <div className="login-page">
      <article className="article-login">
        <div className="article-login-imgs">
          <div className="div-imgs">
            <img alt="img1" className="img1 img " src={img1} />
            <img alt="img2" className="img2 img " src={img2} />
            <img alt="img3" className="img3 img " src={img3} />
            <img alt="img4" className="img4 img " src={img4} />
          </div>
        </div>

        <div className="container-login">
          <div className="container-login-flex">
            <div className="login-flex-insta">
              <div
                aria-disabled="false"
                role="button"
                tabIndex="0"
                className="login-flex-insta-div"
              >
                <i
                  data-visualcompletion="css-img"
                  aria-label="Instagram"
                  className="login-flex-insta-i"
                  role="img"
                ></i>
              </div>
            </div>


            <div className="login-data">
              <form className="login-form" id="loginForm" onSubmit={()=>{console.log("click")}}>
                <div className="login-form-container">
                  <div className="form-container-username">
                    <div className="username">
                      <label className="username-label">
                        <span className="username-span">
                          Phone number, username or email address
                        </span>
                        <input
                           aria-label="Phone number, username or email address"
                           aria-required="true"
                           autoCapitalize="off"
                           autoCorrect="off"
                          maxLength="75"
                          className="username-input"
                          //dir=""
                          type="text"
                          //value=""
                          name="username"
                        />
                      </label>
                      <div className="username-div"></div>
                    </div>
                  </div>
                  <div className="form-container-password">
                    <div className="password">
                      <label className="password-label">
                        <span className="password-span">Password</span>
                        <input
                          aria-label="Password"
                          aria-required="true"
                          autoCapitalize="off"
                          autoCorrect="off"
                          className="password-input"
                          type="password"
                          //value=""
                          name="password"
                        />
                      </label>
                      <div className="passwoed-div"></div>
                    </div>
                  </div>
                  <div className="login-button-div">
                    <button className="login-button" disabled="" type="submit">
                      <div className="login-button-title">Log in</div>
                    </button>
                  </div>
                
                  {/* <div className="_ab39">
                    <div className="x78zum5 x1q0g3np">
                      <div className=""></div>
                      <div className="">or</div>
                      <div className=""></div>
                    </div>
                  </div> */}
                  {/* <div className="">
                    <button
                      className=" _acan _acao _acas _aj1- _ap30"
                      type="button"
                    >
                      <span className=" _a04s _ab36"></span>
                      <span className="_ab37">Log in with Facebook</span>
                    </button>
                  </div> */}
                </div>
                {/* <a className="" href="/accounts/password/reset/"
                  role="link"
                  tabIndex="0">
                  <span className="" dir="auto">
                    Forgotten your password?
                  </span>
                </a> */}
               
              </form>
            </div>
          </div>


          <div className="signup-container">
            <span className="signup-container-span" dir="auto">
              <p className="signup-container-p">
                Have an account?&nbsp;  
                <a className="signup-container-link" href="/login"
                  role="link" tabIndex="0" >
                  <span className="signup-container-link-span" dir="auto">
                    Log in
                  </span>
                </a>
              </p>
            </span>
          </div>
          <div className="get-app-container">
            <div className="get-app-container-div">
              <span className="get-app-container-span" dir="auto">
                Get the app.
              </span>
            </div>
            <div className="get-app-buttons">
              <a
              aria-label="Get it on Google Play"
              className="get-app-buttons-google"
              href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=ig_mid%3DB323B72A-5040-41B4-AE3C-6152CA31A19B%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%253A%252F%252Fwww.instagram.com%252F"
              rel="nofollow noreferrer"
              role="link"
              tabIndex="0"
              target="_blank"
            >
              <img
                alt="Get it on Google Play"
                className="get-app-buttons-google-img"
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              />
            </a>
            <a
              aria-label="Get it from Microsoft"
              className="get-app-buttons-microsoft"
              href="ms-windows-store://pdp/?productid=9nblggh5l9xt&amp;referrer=appbadge&amp;source=www.instagram.com&amp;mode=mini&amp;pos=0%2C0%2C1920%2C1020"
              rel="nofollow noreferrer"
              role="link"
              tabIndex="0"
              target="_blank"
            >
              <img
                alt="Get it from Microsoft"
                className="get-app-buttons-microsoft-img"
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              />
            </a>
            </div>
          </div>
        </div>
      </article>
      <AppFooter />
    </div>

   
  )
}


{/* <label class="_aa48 _aa49">
    <span class="_aa4a">Phone number, username or email address</span>
    <input aria-label="Phone number, username or email address" aria-required="true" autocapitalize="off" autocorrect="off" maxlength="75" class="" dir="" type="text" value="gbbgfgbgfbf" name="username">

</label> */}