import React from 'react'
import MainLayout from '../templates/MainLayout'
const Home = () => {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Home Page</h1>
        <p className="text-center mt-4">Welcome to the Home Page</p>
      </div>
    </MainLayout>
  )
}

export default Home
