import React from "react";

import Slice from "./Slice";
import { useEffect, useState } from "react";
import axios from 'axios';
import pieChart from 'react-minimal-pie-chart';

const Pie = () => {
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = () => {
    axios.get('https://run.mocky.io/v3/a98eda33-75e2-492f-8818-514cd2698afe').then(resp => {
      setPieData(resp.data);
      setIsLoading(false);
    })
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const mapingFunction = restaurants.map(restaurant => {
    return {title: restaurant.name, value: 1, color: 'blue' };
  })
  

  return <div className = "pie">
    {isLoading === true ? <div>laddar</div> : restaurants.map((restaurant) =>
    <Slice key={restaurant.name} data = {restaurant} />
    )}
  </div>;
};

export default Pie;
