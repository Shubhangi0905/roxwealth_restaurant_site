import React, { useState, useEffect } from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Laurels.css';

const AwardCard = ({ award }) => (
  <div className="app__laurels_awards-card">
    <p className="p__cormorant" style={{ color: '#DCCA87' }}>{award.year}</p>
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant">{award.organization}</p>
      <p className="p__opensans">{award.award}</p>
    </div>
  </div>
);

const Laurels = () => {
  const [awards, setAwards] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/restaurant");
      const apiData = await response.json();

      setAwards(apiData.awards || []);
      setDataIsLoaded(true);

      console.log(apiData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      console.error('Fetch error:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div className="app__bg app__wrapper section__padding" id="awards">
      <div className="app__wrapper_info">
        <h1 className="headtext__cormorant">Awards</h1>

        <div className="app__laurels_awards">
          {/* Render awards from the API response */}
          {awards.map((award, index) => <AwardCard award={award} key={index} />)}
        </div>
      </div>

      <div className="app__wrapper_img">
        <img src={images.laurels} alt="laurels_img" />
      </div>
    </div>
  );
};

export default Laurels;
