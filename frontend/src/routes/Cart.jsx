import React, { useMemo, useState } from 'react'
import Navbar from './homeElements/Navbar'
import FooterArea from './homeElements/FooterArea'
import './cart.css'

const initialCartItems = [
  {
    id: 1,
    name: 'Spicy Paneer Wrap',
    shop: 'Zomzto Kitchen',
    price: 189,
  },
  {
    id: 2,
    name: 'Classic Veg Burger',
    shop: 'Green Bite',
    price: 149,
  },
  {
    id: 3,
    name: 'Mango Smoothie',
    shop: 'Fruit Fusion',
    price: 99,
  },
]

export default function Cart({ user }) {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const dp = user?.fullName ? user.fullName.substring(0, 1).toUpperCase() : 'G'

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems]
  )

  const handleRemove = (itemId) => {
    setCartItems((current) => current.filter((item) => item.id !== itemId))
  }

  return (
    <div className="cart-shell">
      <Navbar dp={dp} />
      <main className="cart-body">
        <section className="cart-card">
          <div className="cart-heading">
            <h1>Zomzto Cart</h1>
            <p>Your bill summary is ready. Remove items as needed before checkout.</p>
          </div>

          <div className="cart-list">
            <div className="cart-list-header">
              <span>Item</span>
              <span>Price</span>
            </div>
            {cartItems.length === 0 ? (
              <div className="cart-empty">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-info">
                    <strong>{item.name}</strong>
                    <span>{item.shop}</span>
                  </div>
                  <div className="item-right">
                    <span className="item-price">₹{item.price}</span>
                    <button
                      className="item-remove"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>
        </section>
      </main>
      <FooterArea />
    </div>
  )
}
