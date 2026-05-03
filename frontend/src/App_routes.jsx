import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserSignup, UserSignin, PartnerSignup, PartnerSignin } from './routes/AuthPage'
import Home from './routes/home'
import Reels from './routes/Reels'
import Cart from './routes/Cart'
import { FPid, UserProfile } from './routes/profileHandlers'
import getCookie from './routes/cookieExtractor'

const App_routes = () => {
    const [user, setUser] = useState(null)
    const token = getCookie('token')

    useEffect(() => {
        if (!token) {
            setUser(null)
            return
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/view/user/profile', {
                    withCredentials: true,
                })
                setUser(response.data.user || null)
            } catch (error) {
                console.error('Failed to load current user profile', error)
                setUser(null)
            }
        }

        fetchUser()
    }, [token])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/user/signup" element={<UserSignup setUser={setUser} />} />
                <Route path="/user/signin" element={<UserSignin setUser={setUser} />} />
                <Route path="/food-partner/signup" element={<PartnerSignup />} />
                <Route path="/food-partner/signin" element={<PartnerSignin />} />
                <Route path="/view/food-partner/:id" element={<FPid token={token} user={user} />} />
                <Route path="/view/user/profile" element={<UserProfile token={token} />} />
                <Route path="/cart" element={<Cart user={user} />} />
                <Route path="*" element={<Navigate to="/user/signin" replace />} />
            </Routes>
        </Router>
    )
}

export default App_routes