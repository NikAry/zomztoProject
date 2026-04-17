import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserSignup, UserSignin, PartnerSignup, PartnerSignin } from './routes/AuthPage'
import Home from './routes/home'
import Reels from './routes/Reels'
import {FPprofile,UserProfile} from './routes/profileHandlers'

const App_routes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/user/signup" element={<UserSignup />} />
                <Route path="/user/signin" element={<UserSignin />} />
                <Route path="/food-partner/signup" element={<PartnerSignup />} />
                <Route path="/food-partner/signin" element={<PartnerSignin />} />
                <Route path="/view/food-partner/:id" element={<FPprofile />} />
                <Route path="/view/user/profile" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/user/signin" replace />} />
            </Routes>
        </Router>
    )
}

export default App_routes