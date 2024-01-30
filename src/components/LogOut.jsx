import { useNavigate } from "react-router-dom";
import {logout } from "../store/actions/user.actions";

export function LogOut() {
  const navigate = useNavigate()

    async function onLogout() {
  
        try {
            await logout()
            navigate('/login')
        } catch (err) {
          console.error('error:',err)  
        }
    }

  return (
    <div className="logout-container">
      <div className="logout-container-flex">
        <div className="logout-container-logout" onClick={onLogout}>
          <span className="span">Log out</span>
        </div>
      </div>
    </div>
  )
}
