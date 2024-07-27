import React from 'react'
import Home_head from "./Home_head";
import About from "./About";
import Courses from "./Courses";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Home_head />
      <About/>
      <Courses />
      <Footer />
    </div>
  )
}

export default HomePage
