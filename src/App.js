// Import UseState
import { useState } from "react";

// Import data
import data from "./data.json";

// Import images
import profileImg from "./images/image-jeremy.png";
import ellipsisIcon from "./images/icon-ellipsis.svg";

function App() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");

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
        <section className="profile-card card">
          <div className="profile">
            <img src={profileImg} alt="Picture of Jeremy" />
            <h1>Report for Jeremy Robson</h1>
          </div>
          <nav>
            <ul>
              <li onClick={handleClick}>Daily</li>
              <li onClick={handleClick}>Weekly</li>
              <li onClick={handleClick}>Monthly</li>
            </ul>
          </nav>
        </section>
        <section className="cards">
          {data.map((category) => {
            switch (selectedTimeframe) {
              case "daily":
                return (
                  <Card
                    key={category.title}
                    title={category.title}
                    timeframe={category.timeframes.daily}
                  />
                );
              case "weekly":
                return (
                  <Card
                    key={category.title}
                    title={category.title}
                    timeframe={category.timeframes.weekly}
                  />
                );
              case "monthly":
                return (
                  <Card
                    key={category.title}
                    title={category.title}
                    timeframe={category.timeframes.monthly}
                  />
                );
            }
          })}
        </section>
      </main>
    </div>
  );
};

function Card(props) {

  return (
    <section className="task-folder">
      <span className={props.title}>
        {/* <img src={workIcon} alt="Suitcase icon" /> */}
      </span>
      <div className="card">
        <div className="header">
          <h2>{props.title}</h2>
          <img src={ellipsisIcon} alt="Ellipsis icon" />
        </div>
        <div className="time">
          <p className="current">{props.timeframe.current}hrs</p>
          <p className="previous">{props.timeframe.previous}hrs</p>
        </div>
      </div>
    </section>
  );
};

export default App;
