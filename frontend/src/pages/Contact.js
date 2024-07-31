import React from 'react'
import Layout from '../components/Layout/Layout';
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
       <div className='contact-us'>
        <div className='col-md-6'>
          <img 
          src="./images/contactus.jpeg"
          alt='contactus'
          style={{width:'100%'}}
          />
        </div>
        <div className='col-md-4 m-4'>
          <div className='bg-dark p-2 text-white text-center'>
            Contact Us
          </div>
          <p className='text-justify mt-2'>
            any query about our product feel free to contact us 
          </p>
          <p className='mt-3'><CiMail />: www.demo666@gmail.com</p>
          <p className='mt-3'><FaPhone/>: +977 9841222222</p>
          <p className='mt-3'><MdSupportAgent/>: 01 222 2222 (toll free) </p>
        </div>
       </div>
    </Layout>
  )
}

export default Contact