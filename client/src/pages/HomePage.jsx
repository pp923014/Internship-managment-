import React from 'react'
import Navbar from '../components/Navbar'
import Slide1Homepage from '../components/Slide1Homepage'
import Slide2Homepage from '../components/Slide2Homepage'
import Slide3Homepage from '../components/Slide3Homepage'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";
import ApplyNowButton from '../components/ApplyNowButton'

const HomePage = () => {
    return (
        <div>
      
            <Slide1Homepage/>
            <Slide2Homepage/>
            <Slide3Homepage/>
            <ApplyNowButton/>
      
        </div>
      );
}

export default HomePage
