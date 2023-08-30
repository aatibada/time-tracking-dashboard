// Import UseState
import { useState, useEffect } from "react";

// Import data
import data from "./data.json";

// Import image
import profileImg from "./images/image-jeremy.png";

function App() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");

  useEffect(() => {
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
        if (timeframes.daily.current !== 1) {
          return `${timeframes.daily.current}hrs`;
        } else {
          return `${timeframes.daily.current}hr`;
        }
      case "weekly":
        return`${timeframes.weekly.current}hrs`;
      case "monthly":
        return`${timeframes.monthly.current}hrs`;
    }
  };

  function previousTime() {
    switch (selectedTimeframe) {
      case "daily":
        if (timeframes.daily.previous !== 1) {
          return `Yesterday - ${timeframes.daily.previous}hrs`;
        } else {
          return `Yesterday - ${timeframes.daily.previous}hr`;
        }
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
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill="#BBC0FF"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div className="time">
          <p className="current">{currentTime()}</p>
          <p className="previous">{previousTime()}</p>
        </div>
      </div>
    </section>
  );
};

export default App;
