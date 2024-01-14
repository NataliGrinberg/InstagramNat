import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';

import { NavBar } from './components/NavBar';
import { PostDetails } from './pages/PostDetails';
import { PostIndex } from './pages/PostIndex';
import { Profile } from './pages/Profile';
import { Message } from './pages/Message';
import { loadUsers } from './store/actions/user.actions';
import { useEffect } from 'react';
import { DynamicModal } from './components/DynamicModal';
import { CreateDynamicModal } from './components/CreateDynamicModal';

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
          <Route path="/" element={<PostIndex />}>
             <Route path="/post/:postId" element={<PostDetails />} />
          </Route> 
          <Route path="/chat" element={<Message />} />
          <Route path="/profile/:profileId" element={<Profile />} />
        </Routes>
      </section>
      <DynamicModal />
      <CreateDynamicModal />
    </Router>
  )
}
export default App
