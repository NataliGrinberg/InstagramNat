import { useState, useEffect, useRef } from "react"
import { userService } from "../services/user.service"
import { ImgUploader } from "./ImgUploader"
import { loadUsers, login } from "../store/actions/user.actions"
import { useSelector } from "react-redux"
import img1 from "../assets/images/img1.png"
import img2 from "../assets/images/img2.png"
import img3 from "../assets/images/img3.png"
import img4 from "../assets/images/img4.png"
import { AppFooter } from "./AppFooter"
import { Link, useNavigate } from "react-router-dom"

export function Login(props) {
  // const users = useSelector((storeState) => storeState.userModule.users)
  const [credentials, setCredentials] = useState(userService.getEmptyUser())

  const [textUserName, setTextUserName] = useState("")
  const [textPassword, setTextPassword] = useState("")
  const [displayError, setDisplayError] = useState("")

  const [passwordShown, setPasswordShown] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    //loadUsers()
    carousel()
  }, [])

  function clearState() {
    setCredentials(userService.getEmptyUser())
    setTextUserName("")
    setTextPassword("")
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

   async function onLogin(ev = null) {
    try {
      setDisplayError("")
      if (ev) ev.preventDefault()

      if (!credentials.emailOrNumber) {
        setDisplayError("Email or mobile phone is empty")
        return
      }
      const user = await login(credentials)
      navigate('/')
      clearState()
    } catch (err) {
      console.log('Cannot login login', err)
      setDisplayError(err?.message)
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  var myIndex = 0
  function carousel() {
    var i
    var x = document.getElementsByClassName("img-login")
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

  const valueUserName = textUserName !== "" && textUserName !== null
  const valuePassword = textPassword !== "" && textPassword !== null

  return (
    <div className="login-page">
      <article className="article-login">
        <div className="article-login-imgs">
          <div className="div-imgs">
            <img alt="img1" className="img1 img-login " src={img1} />
            <img alt="img2" className="img2 img-login " src={img2} />
            <img alt="img3" className="img3 img-login " src={img3} />
            <img alt="img4" className="img4 img-login " src={img4} />
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
              <div
                className="login-form"
                id="loginForm"
                //onSubmit={onSubmit}
              >
                <div className="login-form-container">
                  <div className="form-container-username">
                    <div className="username">
                      <label className="username-label">
                        <span
                          className={`username-span ${
                            valueUserName ? "username-span-value" : ""
                          }`}
                        >
                          Phone number, username or email address
                        </span>
                        <input
                          aria-label="Phone number, username or email address"
                          aria-required="true"
                          autoCapitalize="off"
                          autoCorrect="off"
                          maxLength="75"
                          className={`username-input ${
                            valueUserName ? "username-input-value" : ""
                          }`}
                          type="text"
                          onChange={(ev) => {
                            setTextUserName(ev.target.value)
                            handleChange(ev)
                          }}
                          value={textUserName}
                          name="emailOrNumber"
                        />
                      </label>
                      <div className="username-div"></div>
                    </div>
                  </div>
                  <div className="form-container-password">
                    <div className="password">
                      <label className="password-label">
                        <span
                          className={`password-span ${
                            valuePassword ? "password-span-value" : ""
                          }`}
                        >
                          Password
                        </span>
                        <input
                          aria-label="Password"
                          aria-required="true"
                          autoCapitalize="off"
                          autoCorrect="off"
                          className={`password-input ${
                            valuePassword ? "password-input-value" : ""
                          }  ${passwordShown ? "password-security" : ""}`}
                          name="password"
                          type={passwordShown ? "text" : "password"}
                          value={textPassword}
                          onChange={(ev) => {
                            setTextPassword(ev.target.value)
                            handleChange(ev)
                          }}
                        />
                      </label>
                      {valuePassword ? (
                        <div className="passwoed-div-button-flex">
                          <div className="passwoed-div-button">
                            <button
                              onClick={togglePassword}
                              className="passwoed-button"
                              type="button"
                            >
                              {passwordShown ? "Hide" : "Show"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="password-div"></div>
                      )}
                    </div>
                  </div>
                  <div className="login-button-div">
                    <button
                      className="login-button"
                      disabled=""
                      onClick={onLogin}
                    >
                      <div className="login-button-title">Log in</div>
                    </button>
                  </div>
                </div>

                {displayError && (
                  <span className="div-error">
                    <div className="error">{displayError}</div>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="signup-container">
            <span className="signup-container-span" dir="auto">
              <p className="signup-container-p">
                Don't have an account?&nbsp;
                <Link to={`/accounts/emailsignup`}
                  className="signup-container-link"
                  //href="/accounts/emailsignup"
                  //role="link"
                  //tabIndex="0"
                >
                  <span className="signup-container-link-span" dir="auto">
                    Sign up
                  </span>
                </Link>
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
