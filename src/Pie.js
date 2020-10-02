import React from "react";

import Slice from "./Slice";
import { useEffect, useState } from "react";
import axios from 'axios';

const Pie = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = () => {
    axios.get('https://run.mocky.io/v3/1d73500f-8ebf-4edb-816c-f1da0919d6c0').then(resp => {
      setRestaurants(resp.data);
      setIsLoading(false);
    })
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return <div className = "pie">
    {isLoading === true ? <div>laddar</div> : restaurants.map((restaurant) =>
    <Slice key={restaurant.name} data = {restaurant} />
    )}
  </div>;
};

export default Pie;
