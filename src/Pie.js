import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

const defaultLabelStyle = {
  fontSize: "5px",
  fontFamily: "sans-serif",
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
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/a98eda33-75e2-492f-8818-514cd2698afe")
      .then((resp) => {
        setPieData(mappingFunction(resp.data));
        setIsLoading(false);
      });
      this.interval = setInterval(() => setCurrent(Math.random() * pieData.length), 500);
      return () => clearInterval(this.interval);
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
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      )}
    </div>
  );
};

export default Pie;
