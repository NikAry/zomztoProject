import React from 'react';
import './AuthPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthPage({ title, subtitle, buttonLabel, fields, linkText, linkTo, switchLink, submitHandler }) {
  return (
    <main className="auth-shell" aria-label={title}>
      <section className="auth-card">
        <div className="auth-top">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <form className="auth-form" onSubmit={submitHandler}>
          {fields.map((field) => (
            <label key={field.name} className="auth-label">
              <span>{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required !== false}
              />
            </label>
          ))}
          <button className="auth-btn" type="submit">{buttonLabel}</button>
        </form>

        <p className="auth-footer">
          {linkText}
          <a href={linkTo}>{linkTo.replace('/', '').replace('-', ' ')}</a>
        </p>
        {switchLink && (
          <p className="auth-switch">
            {switchLink.text}{' '}
            <a href={switchLink.to}>{switchLink.label}</a>
          </p>
        )}
      </section>
    </main>
  );
}

export function UserSignup({ setUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const phoneNumber = e.target.phone.value
    const fullName = e.target.fullName.value
    const password = e.target.password.value

    const response = await axios.post('http://localhost:3000/auth/user/signup', { email, phoneNumber, fullName, password },{withCredentials: true})
    console.log(response.data);

    if (setUser) {
      try {
        const profileResponse = await axios.get('http://localhost:3000/view/user/profile', { withCredentials: true })
        setUser(profileResponse.data.user || null)
      } catch (error) {
        console.error('Unable to load user profile after signup', error)
      }
    }

    navigate('/');
  }
  return (
    <AuthPage
      title="Hungry for more?"
      subtitle="Create your user account to explore food from nearby kitchens."
      buttonLabel="Create User Account"
      linkText="Already have an account? "
      linkTo="/user/signin"
      submitHandler={handleSubmit}
      switchLink={{ text: 'Want to list food instead?', label: 'Partner Signup', to: '/food-partner/signup' }}
      fields={[
        { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g., Maya Patel' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
        { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••••' },
      ]}
    />
  );
}

export function UserSignin({ setUser }) {
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    const response = await axios.post('http://localhost:3000/auth/user/signin', { email, password },{withCredentials: true})
    console.log(response.data);

    if (setUser) {
      try {
        const profileResponse = await axios.get('http://localhost:3000/view/user/profile', { withCredentials: true })
        setUser(profileResponse.data.user || null)
      } catch (error) {
        console.error('Unable to load user profile after signin', error)
      }
    }

    navigate('/');
  }
  return (
    <AuthPage
      title="Welcome back, food lover"
      subtitle="Sign in and get local meals delivered fast."
      buttonLabel="User Sign In"
      linkText="New here? "
      linkTo="/user/signup"
      submitHandler={handleSubmit}
      switchLink={{ text: 'Are you a partner?', label: 'Partner Sign In', to: '/food-partner/signin' }}
      fields={[
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••••' },
      ]}
    />
  );
}

export function PartnerSignup({ setUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const businessEmail = e.target.email.value
    const password = e.target.password.value
    const businessName = e.target.businessName.value
    const location = e.target.location.value
    const contactNumber = e.target.contactNumber.value

    const response = await axios.post('http://localhost:3000/auth/food-partner/signup', { businessEmail, password, businessName, location, contactNumber },{withCredentials: true})
    console.log(response.data);

    if (setUser) {
      try {
        const profileResponse = await axios.get('http://localhost:3000/view/user/profile', { withCredentials: true })
        setUser(profileResponse.data.user || null)
      } catch (error) {
        console.error('Unable to load user profile after partner signup', error)
      }
    }

    navigate('/');
    
  }

  return (
    <AuthPage
      title="Partner with us to feed more people"
      subtitle="Register your kitchen and reach hungry customers instantly."
      buttonLabel="Create Partner Account"
      linkText="Already partner? "
      linkTo="/food-partner/signin"
      submitHandler={handleSubmit}
      switchLink={{ text: 'Looking for meal orders?', label: 'User Signup', to: '/user/signup' }}
      fields={[
        { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'e.g., Tasty Truck' },
        { name: 'email', label: 'Business Email', type: 'email', placeholder: 'business@example.com' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'City, Area' },
        { name: 'contactNumber', label: 'Contact Number', type: 'tel', placeholder: '+91 98765 43210' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••••' },
      ]}
    />
  );
}

export function PartnerSignin({ setUser }) {
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const businessEmail = e.target.email.value
    const password = e.target.password.value
    const response = await axios.post('http://localhost:3000/auth/food-partner/signin', { businessEmail, password },{withCredentials: true})
    console.log(response.data);

    if (setUser) {
      try {
        const profileResponse = await axios.get('http://localhost:3000/view/user/profile', { withCredentials: true })
        setUser(profileResponse.data.user || null)
      } catch (error) {
        console.error('Unable to load user profile after partner signin', error)
      }
    }

    navigate('/');
  }
  return (
    <AuthPage
      title="Sign in as Food Partner"
      subtitle="Manage your menu, orders, and kitchen availability."
      buttonLabel="Partner Sign In"
      linkText="Need a partner account? "
      linkTo="/food-partner/signup"
      submitHandler={handleSubmit}
      switchLink={{ text: 'Visiting as a hungry customer?', label: 'User Sign In', to: '/user/signin' }}
      fields={[
        { name: 'email', label: 'Business Email', type: 'email', placeholder: 'business@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••••' },
      ]}
    />
  );
}
