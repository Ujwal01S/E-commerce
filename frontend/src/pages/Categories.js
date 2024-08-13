
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
import React from 'react'
import Layout from '../components/Layout/Layout'

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title = {'All Categories'}>
        <div className='container' style={{ marginTop: "100px" }}>
            <div className='row container'>
                {categories?.map((c) => (
                    <div className='col-md-6 mt-3 mb-3 gx-3 gy-3' key={c._id} >
                    <Link to={`/category/${c.slug}`} className='btn-cate' style={{
                        color: 'white',
                        textDecoration: 'none',
                        backgroundColor: '#ADD8E6',
                        padding: '5px 12px',
                        borderRadius:'5px'
                    }}>
                        {c.name}
                    </Link>
                    </div>   
                ))}
            </div>
        </div>

    </Layout>
  )
}

export default Categories