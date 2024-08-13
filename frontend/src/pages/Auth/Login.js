import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import "../../styles/AuthStyles.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email:email,
            password:password,

        };
        console.log(data);
        //sending the data to our backend
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
            {email, password}
          );
          if(res.data && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token
            });
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate(location.state ||'/');
          }else{
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }



        // emptying input
        setEmail('');
        setPassword('');

        
    };

  return (
    <>
      <Layout title={"Login - E-commerce App"}>
        <div className="form-container">
          <h1>Login Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="InputEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="InputPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="submit" className="btn btn-primary" style={{marginLeft:'5px'}}
            onClick={()=> navigate('/forgot-password')}
            >
              Forgot Password
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default Login