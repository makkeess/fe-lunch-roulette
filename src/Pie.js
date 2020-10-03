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
  const [timeout, setATimeout] = useState(transitionTime);

  useEffect(() => {
    const calculateNewCurrent = () => {
      if (current < pieData.length - 1) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
    };

    var timeout = setTimeout(() => calculateNewCurrent(), transitionTime);
    setATimeout(timeout);

    return () => clearTimeout(timeout);
  }, [pieData, current]);

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/9df29200-8880-4694-81c4-6570a29bd5bf")
      .then((resp) => {
        setPieData(mappingFunction(resp.data));
        setIsLoading(false);
      });
  }, []);

  const stopThePie = () => {
    clearTimeout(timeout);
  }

  return (
    <div className="">
      {isLoading === true ? (
        <div>laddar</div>
      ) : (
        <div>
        <PieChart
          data={pieData}
          radius={PieChart.defaultProps.radius - 7}
          segmentsShift={(index) => (index === current ? 7 : 0.5)}
          label={({ dataEntry}) => dataEntry.title}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          startAngle = {-90}
          labelPosition = {60}
          segmentsStyle = {{transition : (transitionTime /2) + "ms" }}
          style = {{width:"80wh"}}
        />
        <Button onClick={stopThePie()}>Slumpa dagens lunch</Button>
        </div>
      )}
    </div>
  );
};

export default Pie;
