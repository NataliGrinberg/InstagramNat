import { Notification } from './Notification';
import { Create } from './Create';
import { More } from './More';
import { Reel } from './Reel';
import { Svgs } from '../assets/Svgs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { onToggleModalCreate } from '../store/actions/create.actions'



export function NavBar() {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    return (
        <section className="navBar-grid-container">

            <div className='flex'>

                <div className='navBar-logo'>
                    <div className='div-navBar-logo'>
                        <div className='logo'>{Svgs.logo} </div>
                    </div>
                </div>

                <div className="navBar-list">

                    <div className="div-navBar-list home" >
                        <a className="flex-navBar-list" href="/" role='link'>
                            <div className="svgs">
                                {Svgs.homeWhite}
                            </div>
                            <div className='div-name'>
                                <div className="name">Home</div>
                            </div>
                        </a>
                    </div>


                    <div className="div-navBar-list search" >
                        <div className="flex-navBar-list">
                            <div className="svgs">
                                {Svgs.search}
                            </div>
                            <div className='div-name'>
                                <div className="name">Search</div>
                            </div>
                        </div>
                    </div>

                    <div className="div-navBar-list explore" >
                        <a className="flex-navBar-list" href="/" role='link'>
                            <div className="svgs">
                                {Svgs.explore}
                            </div>
                            <div className='div-name'>
                                <div className="name">Explore</div>
                            </div>
                        </a>
                    </div>

                    <div className="div-navBar-list reel" >
                        <a className="flex-navBar-list" href="/" role='link'>
                            <div className="svgs">
                                {Svgs.reels}
                            </div>
                            <div className='div-name'>
                                <div className="name">Reels</div>
                            </div>
                        </a>
                    </div>

                    <div className="div-navBar-list chat" >
                        <a className="flex-navBar-list" href="/chat" role='link'>
                            <div className="svgs">
                                {Svgs.messenger}
                            </div>
                            <div className='div-name'>
                                <div className="name">Messages</div>
                            </div>
                        </a>
                    </div>


                    <div className="div-navBar-list notifications" >
                        <div className="flex-navBar-list">
                            <div className="svgs">
                                {Svgs.notifications}
                            </div>
                            <div className='div-name'>
                                <div className="name">Notifications</div>
                            </div>
                        </div>
                    </div>


                    <div className="div-navBar-list create" >
                        <div className="flex-navBar-list" onClick={() => { onToggleModalCreate({ type: 'UploadImg' }) }}>
                            <div className="svgs">
                                {Svgs.newPost}
                            </div>
                            <div className='div-name'>
                                <div className="name">Create</div>
                            </div>

                        </div>
                    </div>

                    <div className="div-navBar-list profile" >
                        <a className="flex-navBar-list" href="/profile/:profileId" role='link'>
                            <div className="svgs">
                                {Svgs.emoji}
                            </div>
                            <div className='div-name'>
                                <div className="name">Profile</div>
                            </div>
                        </a>
                    </div>

                </div>
                {/* <Link className="profile" to="/profile/:profileId" profileId={loggedInUser.id}>{Svgs.emoji} Profile</Link> */}


                <div className='navBar-more'>
                    <div className="flex-navBar-list" onClick={() => { alert("more") }} >
                        <div className="svgs">
                            {Svgs.settingsMore}
                        </div>
                        <div className='div-name'>
                            <div className="name">More</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Outlet context={{ onAddEmail, onUpdateEmail, onSaveDraftEmail }} /> */}

        </section >

    )
}
