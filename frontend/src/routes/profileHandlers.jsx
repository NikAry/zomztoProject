import React from 'react';
import Navbar from './homeElements/Navbar';
import FooterArea from './homeElements/FooterArea';
import './profile.css';
import axios from 'axios';
import { TruckElectric } from 'lucide-react';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

export function FPprofile(props) {
  return (
    <div className="profile-shell">
      <Navbar />
      <main className="profile-body">
        <section className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">FP</div>
            <div className="profile-user">
              <h1 className="profile-name">Food Partner</h1>
              <div className="profile-email">partner@example.com</div>
              <p className="profile-welcome">
                Explore the partner profile and manage listings with a clean dashboard layout.
              </p>
            </div>
          </div>
        </section>
      </main>
      <FooterArea />
    </div>
  );
}

export function UserProfile(props) {
  const token = props.token;
  const [userData, setUserData] = React.useState(null);
  const navigate = useNavigate()
  React.useEffect(() => {
    if(token==null){
      navigate('/user/signin');
      return;
    }
    // print("Token in UserProfile useEffect:", token);
    const apiCall = async() => {
        const response = await axios('http://localhost:3000/view/user/profile', {withCredentials:true})
        console.log("API response for user profile:", response.data);
        setUserData(response.data);

      }
    apiCall();
  }, [token,navigate]);
  console.log("User token:", token );
  console.log("User data in UserProfile:", userData );
  return (
    <div className="profile-shell">
      <Navbar dp={userData? userData.user.fullName.substring(0, 1).toUpperCase() : 'G'} />
      <main className="profile-body">
        <section className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{userData ? userData.user.fullName.substring(0, 1).toUpperCase() : 'Loading...'}</div>
            <div className="profile-user">
              <h1 className="profile-name">{userData ? userData.user.fullName : 'Loading...'}</h1>
              <div className="profile-email">{userData ? userData.user.email : 'Loading...'}</div>
              <p className="profile-welcome">
                Welcome back! Here’s your quick profile overview, favorite foods, order shortcuts and support access.
              </p>
            </div>
          </div>
        </section>

        <section className="profile-grid">
          <article className="profile-card-sm">
            <h3>Fav Food</h3>
            <p>Spicy Paneer Wrap</p>
            <p>Beach-style fries with cool chutney.</p>
          </article>
          <article className="profile-card-sm">
            <h3>Fav. Shop</h3>
            <p>Sunny Kitchen</p>
            <p>Reliable meals, fast delivery, and top ratings.</p>
          </article>
        </section>

        <section className="profile-actions">
          <button className="profile-button">Orders</button>
          <button className="profile-button">Cart</button>
        </section>

        <section className="profile-support">
          <h3>Contact Us and Feedback</h3>
          <p>
            Need help with your order or want to share feedback? Our support team is ready to listen.
          </p>
          <a href="/contact">Send a message</a>
        </section>
      </main>
      <FooterArea />
    </div>
  );
}
