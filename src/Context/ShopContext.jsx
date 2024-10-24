import React,{createContext, useEffect, useState} from 'react'



export let ShopContext = createContext(null);
let getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
    cart[index] = 0;
  }

  return cart;
}



let ShopContextProvider = (props) => {
    const [all_product,setAll_Product] = useState([])

  let [CartItems, setCartitems] = useState(getDefaultCart());
  

  useEffect(() => {
    fetch("https://garments-black.vercel.app/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));
    
    if (localStorage.getItem('auth-token')) {
      fetch(`https://garments-black.vercel.app/getcart`, {
        method: "POST",
        headers: {
          Accept: "appliction/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartitems(data));
            
        }
   },[])
   
   
    let addToCart = (itemId) => {
      setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
      if (localStorage.getItem('auth-token')) {
        fetch(`https://garments-black.vercel.app/addtocart`, {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "appplication/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
     
    }

    let removeFromCart = (itemId) => {
      setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

      if (localStorage.getItem('auth-token')) {
        fetch(`https://garments-black.vercel.app/removefromcart`, {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "appplication/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
  };
  

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in CartItems) {
      if (CartItems[item]>0) {
        let itemInfo = all_product.find((product) => product.id===Number(item))
        totalAmount += itemInfo.new_price * CartItems[item];
      
      }
    }
  return totalAmount;
    
  }


  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in CartItems) {
      if (CartItems[item] > 0) {
        totalItem += CartItems[item]
      }
    }

    return totalItem
  }





 let contextValue = {getTotalCartItems, getTotalCartAmount,all_product,CartItems,addToCart,removeFromCart };
    

    return (
        <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
       
    )
}


export default ShopContextProvider;



























