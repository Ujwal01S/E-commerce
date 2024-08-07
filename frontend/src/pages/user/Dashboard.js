import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../Context/auth'

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Dashboard - E-commerce App'}>
        <div className='container-fluid  m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu />
            </div>
            <div className='col-md-9'>
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>

    </Layout>
  )
}

export default Dashboard


//Dashboard user lae login gare pachi pathauney kina ki homepage sabai lai available garunu parxa
//ra dashboard lai protected garney i.e login vaisakya lai matra available garney