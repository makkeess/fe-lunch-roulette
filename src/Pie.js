import React from "react";

import Slice from "./Slice";
import { useEffect, useState } from "react";

const Pie = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  });
  return <div>{isLoading === true ? <div>laddar</div> : <Slice />}</div>;
};

export default Pie;
