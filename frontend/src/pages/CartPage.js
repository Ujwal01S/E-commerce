import Layout from "../components/Layout/Layout";
import React from "react";
import { useAuth } from "../Context/auth";
import { useCart } from "../Context/cart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  //total  calculation
  const totalPrice =() => {
    try {
        let total = 0;
        cart?.map(item => {total = total + item.price});
        return total.toLocaleString('en-US', {
            style:'currency',
            currency: 'USD'
        });
    } catch (error) {
        console.log(error);
    }
  };
  
  //remove item
  const removeCartItem =(pid) => {
    try {
        let myCart = [...cart];
        let index = myCart.findIndex(item => item._id === pid);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 m-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length 
                ? `You hanve ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row mb-2 p-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={'130px'}
                    width={'100px'}
                  />
                </div>
                <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                    <button className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                    >Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 ml-2">
            <h2>Cart Summary</h2>
            <hr />
            <p>Total || CheckOut || Payment</p>
            <h4>Total : {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;