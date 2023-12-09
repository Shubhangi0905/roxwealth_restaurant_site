import React, { useState, useEffect } from 'react';

import { SubHeading, MenuItem } from '../../components';
import { images } from '../../constants';
import './SpecialMenu.css';

const SpecialMenu = () => {
  const [menuData, setMenuData] = useState({});
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/restaurant");
      const apiData = await response.json();

      setMenuData(apiData.menu || {});
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

  const handleViewMore = () => {
    setShowFullMenu(true);
  };

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
      <h1 className="headtext__cormorant">Menu</h1>
        <SubHeading title="that fits your palate..." />
        
      </div>

      <div className="app__specialMenu-menu">
        <div className="app__specialMenu-menu_wine flex__center">
        <p className="app__specialMenu-menu_heading">Today's Menu</p>
          {/* <p className="app__specialMenu-menu_heading"> </p>  fetch categories name here */}
          <div className="app__specialMenu_menu_items">
            {menuData.categories &&
              menuData.categories.map((category, index) => (
                <React.Fragment key={category.name + index}>
                  
                  <p className="app__specialMenu-menu_subheading">{category.name}</p>
                  {category.items &&
                    category.items.map((item, itemIndex) => (
                      <MenuItem
                        key={item.name + itemIndex}
                        title={item.name}
                        price={item.price}
                        tags={item.description}
                        ingredients={item.ingredients}
                        nutritionalInfo={item.nutritional_info}
                        seasonalAvailability={item.seasonal_availability}
                      />
                    ))}
                </React.Fragment>
              ))}
          </div>
        </div>
        
        <div className="seasonal_menu">
       
        <div className="app_specialMenu-menu_cocktails flex_center">
          <p className="app__specialMenu-menu_heading">Seasonal Menu</p>
          <div className="app__specialMenu_menu_items">
          <p className="app__specialMenu-menu_subheading">{menuData?.seasonal_menu?.name}</p>
            {menuData.seasonal_menu &&
              menuData.seasonal_menu.items.map((cocktail, index) => (
                <div key={cocktail.name + index} className="menu-item">
                  <MenuItem
                    title={cocktail.name}
                    price={cocktail.price}
                    tags={cocktail.description}
                  />
                  
                </div>
                
              ))}
              <div className='chocolate_image'>
              <img src={images.chocolate} alt="chocolate" />
              </div>
          </div>
        </div>
      </div>


      </div>

    </div>
    
  );
};

export default SpecialMenu;
