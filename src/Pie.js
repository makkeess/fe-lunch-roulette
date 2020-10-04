import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

import Button from "react-bootstrap/Button";
import Jumbotron from 'react-bootstrap/Jumbotron'

const defaultLabelStyle = {
  fontSize: "4px",
  fontFamily: "sans-serif",
};

const randomColorHex = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const mappingFunction = (restaurants) =>
  restaurants.map((restaurant) => {
    return {
      title: restaurant.name,
      value: 1,
      color: randomColorHex(),
      rating: restaurant.rating,
      vicinity: restaurant.vicinity,
    };
  });

const Pie = () => {
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [transitionTime, setTransitionTime] = useState(500);
  const [aTimeout, setATimeout] = useState(500);
  const [running, setRunning] = useState(false);
  const [countDown, setCountDown] = useState(100);
  const [slowingDown, setSlowingDown] = useState(false);

  const resetPie = () => {
    setRunning(false);
    setTransitionTime(500);
    setTimeout(500);
    setCountDown(100);
    setSlowingDown(200);
  };

  useEffect(() => {
    console.log(running);
    if (!running) {
      console.log(running);
      return;
    }
    if (slowingDown) {
      setCountDown(countDown - 1);
      console.log(countDown);
      if (countDown % 2 === 0) {
        console.log("counting down");
        setTransitionTime(transitionTime + 2);
        setATimeout(aTimeout + 2);
      }
      if (countDown === 0) {
        setRunning(false);
      }
    }

    const calculateNewCurrent = () => {
      if (current < pieData.length - 1) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
    };

    setTimeout(() => calculateNewCurrent(), aTimeout);
  }, [pieData, current, running]);

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/9df29200-8880-4694-81c4-6570a29bd5bf")
      .then((resp) => {
        setPieData(mappingFunction(resp.data));
        setIsLoading(false);
        setRunning(true);
      });
  }, []);

  const stopThePie = () => {
    console.log("Stopping...");
    setSlowingDown(true);
    setATimeout(20);
    setTransitionTime(20);
  };

  return (
    <div className="">
      {isLoading === true ? (
        <div>laddar</div>
      ) : (
        <div>
          <Jumbotron fluid>
              <p>Namn: {pieData[current].title}</p>
              <p>Betyg: {pieData[current].rating}</p>
              <p>
                Adress: {pieData[current].vicinity
                  ? pieData[current].vicinity
                  : "Unknown address"}
              </p>
          </Jumbotron>
          <PieChart
            data={pieData}
            radius={PieChart.defaultProps.radius - 7}
            segmentsShift={(index) => (index === current ? 7 : 0.5)}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              ...defaultLabelStyle,
            }}
            startAngle={-90}
            labelPosition={60}
            segmentsStyle={{ transition: transitionTime / 2 + "ms" }}
            style={{ width: "80wh" }}
          />
          <Button onClick={stopThePie}>Slumpa dagens lunch</Button>
        </div>
      )}
    </div>
  );
};

export default Pie;
