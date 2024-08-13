import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import { useCart } from "../Context/cart";
import { useNavigate } from "react-router-dom";
import '../styles/Homepage.css';

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(page ===1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async() => {
    try {
      setLoading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by cat

  const handleFilter = (value, id) => {
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter((d) => d!==id)
    }
    setChecked(all);
  };

    //getting all categories
    const getAllCategories = async () => {
      try {
        //we de-structure response directly to get only its data
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get-category`
        );
        if (data?.success) {
          setCategories(data?.category);  
        }                           
      } catch (error) {
        console.log(error);
      }
    };
  
    //to get categories loaded in intial
    useEffect(() => {
      getAllCategories();
      getTotal();
    }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //getTotal count
  const getTotal = async() => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
    
  }, []);

  useEffect(() => {
    if(checked.length  || radio.length) filterProduct();
  }, [checked, radio]);

  //get filter product
  const filterProduct = async() => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {checked, radio});
      setProducts(data?.products);
    } catch (error) {
      console.log(error);

    }
  };


  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Best Offers"}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox> 
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}  
            </Radio.Group> 
          </div>
          <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={() => window.location.reload()}>
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5>
                  <p className="card-title card-price">$ {p.price}</p>
                  </h5>
                  </div>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <div className="card-name-price">
                  <button className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  >More Details</button>
                  <button className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem('cart', 
                      JSON.stringify([...cart, p])
                    );
                    toast.success('Item added to Cart');
                  }}
                  >Add To Cart</button>
                </div>
              </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
              className="btn loadmore"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              >
                {loading ? 'loading...' : 'loadmore'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
