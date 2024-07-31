import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={'About us - Ecommerce App'}>
        <div className='aboutus'>
          <div className='col-md-6'>
            <img
            src='./images/about.jpeg'
            alt='about us'
            style={{width:'100%'}}
            />
          </div>
          <div className='col-md-4'>
            <p className='mt-5'> klasjdf lkasdf lkasdjf lkasdjf lkasd fa
              a sldkfj aldskfj asdlkfj asdlkfj alkdsjf lkdsafj lkdsaf jlk
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default About