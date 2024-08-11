import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name:name,
            email:email,
            password:password,
            phone: phone,
            address:address,
        };
        console.log(data);
        //sending the data to our backend
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
            {name, email, password, phone, address, answer}
          );
          if(res.data && res.data.success){
            toast.success(res.data && res.data.message);
            navigate('/login');
          }else{
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }

        
       

        // emptying input
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setAddress('');
        
    };

  return (
    <>
      <Layout title={"Register - E-commerce App"}>
        <div className="register">
          <h1>Register Page</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="InputName"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="InputPhone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="InputAdress"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="InputAnswer"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
