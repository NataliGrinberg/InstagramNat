import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';

import { AppFooter } from './components/AppFooter';
import { NavBar } from './components/NavBar';
import { Logo } from './components/Logo';
import { PostDetails } from './pages/PostDetails';
import { PostIndex } from './pages/PostIndex';
import { Profile } from './pages/Profile';
import { Message } from './pages/Message';
import { loadUsers } from './store/actions/user.actions';
import { useEffect } from 'react';

// import './App.css'

function App() {

  useEffect(() => {
    loadUsers()
}, [])

  return (
    <Router>
      <section className='app'>
        <NavBar />
          <Routes>
            <Route path="/" element={<PostIndex />} />
            <Route path="/chat" element={<Message />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/post/:postId" element={<PostDetails />} />
          </Routes>
      </section>
    </Router>
  )
}
export default App
