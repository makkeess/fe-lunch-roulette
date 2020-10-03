import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

const defaultLabelStyle = {
  fontSize: "4px",
  fontFamily: "sans-serif"
};

const randomColorHex = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const mappingFunction = (restaurants) =>
  restaurants.map((restaurant) => {
    return { title: restaurant.name, value: 1, color: randomColorHex() };
  });

const Pie = () => {
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [transitionTime, setTransitionTime] = useState(500);

  useEffect(() => {
    const calculateNewCurrent = () => {
      if (current < pieData.length - 1) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
    };

    var interval = setTimeout(() => calculateNewCurrent(), transitionTime);

    return () => clearInterval(interval);//clearTimeout
  }, [pieData, current]);

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/9df29200-8880-4694-81c4-6570a29bd5bf")
      .then((resp) => {
        setPieData(mappingFunction(resp.data));
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="">
      {isLoading === true ? (
        <div>laddar</div>
      ) : (
        <PieChart
          data={pieData}
          radius={PieChart.defaultProps.radius - 7}
          segmentsShift={(index) => (index === current ? 7 : 0.5)}
          label={({ dataEntry}) => dataEntry.title}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          startAngle = {-90}
          labelPosition = {120}
          segmentsStyle = {{transition : (transitionTime /2) + "ms" }}
        />
      )}
    </div>
  );
};

export default Pie;
