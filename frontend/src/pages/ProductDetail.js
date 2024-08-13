import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/ProductDetailsStyles.css';

const ProductDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if(params?.slug) getProduct();
    }, [params?.slug]);

    //get-single detailed product
    const getProduct = async() => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    //get relatedproduct
    const getSimilarProduct = async(pid, cid) => {
        try {
            const { data } = await axios.get
            (`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Layout>
        <div className='row container product-details'>
            <div className='col-md-6'>
                <img 
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                className='card-img-op'
                alt={product.name}
                />
            </div>
            <div className='col-md-6' product-details-info>
                <h2 className='text-center'>Product Details</h2>
                <h6>Name: {product.name}</h6>
                <h6>Description: {product.description}</h6>
                <h6>Price: {product.price}</h6>
                <h6>Category: {product?.category?.name}</h6>
                <button className="btn btn-secondary ms-1">Add To Cart</button>
            </div>
        </div>
        <hr></hr>
        <div className='row container similar-products'>
            <h1>Similar Products</h1>
            {relatedProducts.length < 1 && (<p className='text-center'>No Similar Product found</p>) }
            <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-title card-price">$ {p.price}</p>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  
                  <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default ProductDetail