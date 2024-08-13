import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";


const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //sending the data to our backend
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address },
        { headers:{
            'Authorization': auth?.token
        }}
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({...auth, user:data?.updatedUser});
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('Profile updated Successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //get user initially in form
  useEffect(() => {
    const { name , email, phone, address} = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  return (
    <Layout title={"Your Profle"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <h1>User Profile</h1>
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
                    disabled
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
               
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
