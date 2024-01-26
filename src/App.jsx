import { Link, Route, HashRouter as Router, Routes } from "react-router-dom"

import { NavBar } from "./components/NavBar"
import { PostDetails } from "./pages/PostDetails"
import { PostIndex } from "./pages/PostIndex"
import { Profile } from "./pages/Profile"
import { Message } from "./pages/Message"
import { loadUsers } from "./store/actions/user.actions"
import { useEffect } from "react"
import { DynamicModal } from "./components/DynamicModal"
import { CreateDynamicModal } from "./components/CreateDynamicModal"
import { PostListPro } from "./components/PostListPro"
import { Tagged } from "./components/Tagged"
import { Saved } from "./components/Saved"
import { Login } from "./components/Login"
import { Signup } from "./components/Signup"

// import './App.css'

function App() {
  // useEffect(() => {
  //   loadUsers()
  // }, [])

  return (
    <Router>
      <section className="app">
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/accounts/emailsignup" element={<Signup />}/>
          <Route path="/" element={<PostIndex />}>
            <Route path="/post/:postId" element={<PostDetails />} />
          </Route>
          <Route path="/chat" element={<Message />} />
          <Route path="/profile/:username" element={<Profile />}>
            <Route path="/profile/:username" element={<PostListPro />} />
            <Route path="/profile/:username/saved" element={<Saved />} />
            <Route path="/profile/:username/tagged" element={<Tagged />} />
          </Route>
        </Routes>
      </section>
      <DynamicModal />
      <CreateDynamicModal />
    </Router>
  )
}
export default App
