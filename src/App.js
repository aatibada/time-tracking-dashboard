// Import UseState
import { useState, useEffect } from "react";

// Import data
import data from "./data.json";

// Import images
import profileImg from "./images/image-jeremy.png";
import ellipsisIcon from "./images/icon-ellipsis.svg";

function App() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");

  useEffect(() => {
    let selected;
    switch (selectedTimeframe) {
      case "daily":
        document.querySelector("#daily").style.color = "white";
        break;
      case "weekly":
        document.querySelector("#weekly").style.color = "white";
        break;
      case "monthly":
        document.querySelector("#monthly").style.color = "white";
    }
    return () => {
      document.querySelector("#daily").style.color = "#7078C9";
      document.querySelector("#weekly").style.color = "#7078C9";
      document.querySelector("#monthly").style.color = "#7078C9";
    }
  }, [selectedTimeframe]);

  function handleClick(event) {
    const selected = event.target.innerHTML;

    switch (selected) {
      case "Daily":
        setSelectedTimeframe("daily");
        break;
      case "Weekly": 
        setSelectedTimeframe("weekly");
        break;
      case "Monthly":
        setSelectedTimeframe("monthly");
    }
  }

  return (
    <div className="App">
      <main>
        <section className="profile-card">
          <div className="profile">
            <img src={profileImg} alt="Picture of Jeremy" />
            <h1>
              <span>Report for</span> Jeremy Robson
            </h1>
          </div>
          <nav>
            <ul>
              <li id="daily" onClick={handleClick}>Daily</li>
              <li id="weekly" onClick={handleClick}>Weekly</li>
              <li id="monthly" onClick={handleClick}>Monthly</li>
            </ul>
          </nav>
        </section>
        {data.map((category) => {
          return (
            <Card
              key={category.title}
              title={category.title}
              timeframes={category.timeframes}
              selectedTimeframe={selectedTimeframe}
            />
          );
        })}
      </main>
    </div>
  );
};

function Card({ title, timeframes, selectedTimeframe }) {
  const id = title.replace(" ", "");

  function currentTime() {
    switch (selectedTimeframe) {
      case "daily":
        return timeframes.daily.current;
      case "weekly":
        return timeframes.weekly.current;
      case "monthly":
        return timeframes.monthly.current;
    }
  };

  function previousTime() {
    switch (selectedTimeframe) {
      case "daily":
        return `Yesterday - ${timeframes.daily.previous}hrs`;
      case "weekly": 
        return `Last Week - ${timeframes.weekly.previous}hrs`;
      case "monthly":
        return `Last Month - ${timeframes.monthly.previous}hrs`;
    }
  };

  return (
    <section id={id} className="task-folder">
      <span></span>
      <div className="card">
        <div className="heading">
          <h2>{title}</h2>
          <img src={ellipsisIcon} alt="Ellipsis icon" id="ellipsis"/>
        </div>
        <div className="time">
          <p className="current">{currentTime()}hrs</p>
          <p className="previous">{previousTime()}</p>
        </div>
      </div>
    </section>
  );
};

export default App;
