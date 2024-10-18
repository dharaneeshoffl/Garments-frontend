import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import "./CartItems.css"

export default function CartItems() {

 
  
  const handleSubmit = () => {
     const amount = getTotalCartAmount();
    const options = {
      key: "rzp_test_zn6RTHGabYStIV",
      key_secret: "BpOnwmLstFQ1kziw8OJN7Afx",
      amount: amount * 100,
      currency: "USD",
      name: "The Weavers Thread",
      description: "Products Payments from threads",
      handler: function (response) {
        alert("response.razorpay_payment_id");
      },
      prefill: {
        name: "Dharaneesh",
        email: "dharaneeshdharaneesh76@gmail.com",
        contact: "6382209175",
      },
      notes: {
        address: "Rrazorpay Office",
      },
      theme: {
        color: "#ffff",
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  }

    const {getTotalCartAmount,
      all_product,
      CartItems,
      removeFromCart,
    } = useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (CartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {CartItems[e.id]}
                </button>
                <p>${e.new_price * CartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  alt=""
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                />
              </div>
              <hr />
            </div>
          );
        }

        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <button
        
            onClick={() => {
              handleSubmit();
            }}
          >
            Proceed To Checkout
          </button>
        </div>
        <div className="cartitems-promo-code">
          <p>If you have a promo code,Enter it Here!</p>
          <div className="cartitems-promo-box">
            <input type="text" placeholder="Promo Code" />
            <button type="submit">Apply Here</button>
          </div>
        </div>
      </div>
    </div>
  );
}
