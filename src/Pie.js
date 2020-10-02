import React from "react";

import Slice from "./Slice";
import { useEffect, useState } from "react";
import axios from 'axios';

const Pie = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(restaurants);
    axios.get('https://run.mocky.io/v3/f11eea3e-d1da-4bdd-8be6-2f1ad3c517d4').then(resp => {
      setRestaurants(resp.data);
      console.log(restaurants);
      setIsLoading(false);
    })
  });
  return <div>
    {isLoading === true ? <div>laddar</div> : restaurants.map(restaurant => {
     return <Slice data = {restaurant} />
    })}
  </div>;
};

export default Pie;
