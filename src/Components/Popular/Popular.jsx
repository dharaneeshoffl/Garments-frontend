import React, { useState ,useEffect} from 'react'
import "./Popular.css"

import Item from '../Items/Item'

export default function Popular() {

    let [popularProducts, setPopularproducts] = useState([]);

      useEffect(() => {
        fetch(`https://garments-backend-o7ag.onrender.com/popularinwomen`)
          .then((response) => response.json())
          .then((data) => setPopularproducts(data));
      }, []);


  return (
      <div className='popular'>
          <h1>TRENDING IN WOMENS</h1>
          <hr />
          <div className="popular-item">
              {popularProducts.map((item,i)=>{
                  return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price = {item.old_price} />
              })}
          </div>
      </div>
  )
}
