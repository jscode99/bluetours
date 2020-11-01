import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import { Layout } from '../../components/Layout'

function Home() {
    return (
        <Layout>
            <Jumbotron className='text-center'>
                <h2>Welcome to Admin Dashboard</h2>
            </Jumbotron>
        </Layout>
    )
}

export default Home
