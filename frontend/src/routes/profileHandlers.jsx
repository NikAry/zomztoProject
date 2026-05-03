import React from 'react';
import Navbar from './homeElements/Navbar';
import FooterArea from './homeElements/FooterArea';
import './profile.css';
import axios from 'axios';
import { TruckElectric } from 'lucide-react';
import { use } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function FPid(props) {
  const token = props.token;
  const user = props.user;
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    if(token==null){  
      navigate('/user/signin', { state: { redirectTo: location.pathname } });
      return;
    }
  }, [token,navigate, location.pathname]);
  const id = useParams().id;
  // console.log("FPid component received id:", id);
  const [partnerData, setPartnerData] = React.useState(null);
  React.useEffect(() => {
    const apiCall = async() => {
        try {
            const response = await axios(`http://localhost:3000/view/food-partner/${id}`, {withCredentials:true})
            console.log("API response for food partner profile:", response.data);
            setPartnerData(response.data);
        } catch (error) {
            console.error("Error fetching food partner profile:", error);
            setPartnerData(null);
        }
    };
    apiCall();
  }, [id]);

  return (
    <div className="profile-shell">
      <Navbar dp={user ? user.fullName.substring(0, 1).toUpperCase() : 'G'} />
      <main className="profile-body">
        <section className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{partnerData ? partnerData.foodPartner.businessName.substring(0, 1).toUpperCase() : 'FP'}</div>
            <div className="profile-user">
              <h1 className="profile-name">{partnerData ? partnerData.foodPartner.businessName : 'Food Partner'}</h1>
              <div className="profile-email">{partnerData ? partnerData.foodPartner.businessEmail : 'partner@example.com'}</div>
              <p className="profile-welcome">
                Explore the partner profile and manage listings with a clean dashboard layout.
              </p>
            </div>
          </div>
        </section>

        <section className="profile-videos">
          <h2>Food Videos</h2>
          {partnerData && partnerData.foodInfo && partnerData.foodInfo.length > 0 ? (
            <div className="video-grid">
              {partnerData.foodInfo.map((food) => (
                <article key={food._id} className="video-card">
                  <video controls className="food-video">
                    <source src={food.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-meta">
                    <h3>{food.itemName || 'Untitled Dish'}</h3>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="no-videos">No food videos uploaded yet.</p>
          )}
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
      navigate('/user/signin', { state: { redirectTo: '/' } });
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
