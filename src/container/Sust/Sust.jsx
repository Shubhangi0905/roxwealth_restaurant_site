import React, { useState, useEffect } from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Sust.css';

const EventCard = ({ event }) => (
  <div className="app__laurels_awards-card">
    <p className="p__cormorant" style={{ color: '#DCCA87' }}>{event.date}</p>
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant">{event.name}</p>
      <p className="p__opensans">{event.description}</p>
    </div>
    <hr /> {/* Add horizontal line after each point */}
  </div>
);

const Sust = () => {
  const [events, setEvents] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/restaurant");
      const apiData = await response.json();

      setEvents(apiData.sustainability?.initiatives || []);
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
        <h1 className="headtext__cormorant">Sustainability</h1>

        <div className="app__laurels_awards">
          {/* Render events from the API response */}
          {dataIsLoaded ? (
            <div>
              {events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}<hr/>
            </div>
          ) : (
            <p className="p__opensans">Loading Data...</p>
          )}
        </div>
      </div>

      <div className="app__wrapper_img">
        <img src={images.sust} alt="laurels_img" />
      </div>
    </div>
  );
};

export default Sust;
