import React, {useState, useEffect } from 'react'
import th from "../assets/th.png";
import useStore from '../store/store';
const cardsData = [
    {
      id: 1,
      image: th,
      title: "Card Title 1",
      
    },
    {
      id: 2,
      image: th,
      title: "Card Title 2",
    },
    {
      id: 3,
      image: th,
      title: "Card Title 3",
    },
    {
      id: 4,
      image: th,
      title: "Card Title 4",
    },
  ];
const Slide3Homepage = () => {
  const {internships,fetchinternships}=useStore();
  useEffect(()=>{
    fetchinternships();
  },[fetchinternships]);
    return (
        <div className="bg-gray py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">Available Internships </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {internships.map((internship) => (
                <div
                  key={internship._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2"
                >
                  <img
                    src={internship.imageUrl}
                    alt={internship.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{internship.title}</h3>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Slide3Homepage
