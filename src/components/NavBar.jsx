import { Notification } from './Notification';
import { Create } from './Create';
import { More } from './More';
import { Reel } from './Reel';
import { Svgs } from '../assets/Svgs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';



export function NavBar() {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    return (
        <section className="navBar-grid-container">

            <div className='navBar-logo'>
                <Logo />
            </div>

            <div className="navBar-list">
                <Link className="home" to="/" >{Svgs.homeWhite}  Home</Link>
                <div className="search"> {Svgs.search}  Search</div>
                <Link className="explore" to="/" >{Svgs.explore} Explore</Link>
                <Link className="reel" to="/" > {Svgs.reels}  Reels</Link>
                <Link className="chat" to="/chat">{Svgs.messenger} Message</Link>
                <div className="notification"><Notification /> {Svgs.notifications}  Notification</div>
                <div className="create"><Create />  {Svgs.newPost}  Create</div>
                {/* <Link className="profile" to="/profile/:profileId" profileId={loggedInUser.id}>{Svgs.emoji} Profile</Link> */}
            </div>

            <div className='navBar-more'>
                <div onClick={() => { alert("more") }} > {Svgs.settingsMore} More</div>
            </div>

            {/* <Outlet context={{ onAddEmail, onUpdateEmail, onSaveDraftEmail }} /> */}
        </section>

    )
}
