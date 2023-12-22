import React, { useState, useEffect } from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Chef.css';

const Chef = () => {
  const [restaurants, setRestaurants] = useState({});
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/restaurant");
      const data = await response.json();

      setRestaurants(data);
      setDataIsLoaded(true);

      console.log(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error.message);
      console.error('Fetch error:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div className="app__bg app__wrapper section__padding">
      <div className="app__wrapper_img app__wrapper_img-reverse">
        {/* Use the chef image from the API response */}
        <img src={restaurants?.chef?.image || images.chef} alt="chef_image" />
      </div>
      
      <div className="app__wrapper_info">
      <p className="p__name">{restaurants?.chef?.name}</p>
       
        <h1 className="headtext__cormorant">What we believe in</h1>
        
        <div className="app__chef-content">
          <div className="app__chef-content_quote">
            <img src={images.quote} alt="quote_image" />
            {/* Use the chef's bio from the API response */}
            <p className="p__opensans">{restaurants?.chef?.bio}</p>
            
          </div>
          <div className="app__chef-content_quote">
          <h3 className='dish'>Signature Dish</h3>
            </div>
          <div className="app__chef-content_quote">
            <p className="p__opensans">{restaurants?.chef?.signature_dish}</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Chef;
