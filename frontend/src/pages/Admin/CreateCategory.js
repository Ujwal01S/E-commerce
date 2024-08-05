import { useState, useEffect } from "react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../Context/auth";
import {Modal} from 'antd';

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  //handle submit & send that data to backend
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
        name,
      },
      {
        headers:{
            "Authorization" : auth?.token
        }
    }
    );
      if(data?.success){
        toast.success(`${data.name} is created`);
        getAllCategories();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in input form');
    }
  };

  //getting all categories
  const getAllCategories = async () => {
    try {
      //we de-structure response directly to get only its data
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);  
      }                           
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  //to get categories loaded in intial
  useEffect(() => {
    getAllCategories();
  }, []);

  //update Category
  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        {name:updatedName},
        {
          headers:{
              "Authorization" : auth?.token
          }
      }
      );
      if(data.success){
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getAllCategories();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  //Delete Category
  const handleDelete = async(id) => {
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,
        {
          headers:{
              "Authorization" : auth?.token
          }
      }
      );
      if(data.success){
        toast.success(`category is deleted`);

        getAllCategories();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };


  return (
    <Layout title={"Dashboard - CreateCategory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="w-50 p-3">
              <CategoryForm 
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {categories?.map((c) => (
                  <tr>
                      <>
                      <td key = {c._id}>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2"
                        onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c);

                        }}
                        >Edit</button>
                        <button className="btn btn-danger ms-2"
                        onClick={() =>{handleDelete(c._id)}}
                        >Delete</button>
                      </td>
                      </>
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} 
            footer={null}
            open = {visible}  
            >
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
