import React from "react";
import "../styles/HomePage.css";
import { useHistory } from "react-router-dom";
import hero from "../assets/hero.svg";

function HomePage() {
  const history = useHistory();

  return (
    <div className="homepage">
      <div className="hero__container" style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={hero} alt="Hero" style={{ width: "100%", height: "65vh", background: "#0061FE" }} />
      </div>
      <div className="content">
        {/* <div className="container-xl"> */}

        {/* </div> */}
        {/* <div className="container-xl"> */}
        {/* <div className="homepage__footer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#0061FE"
                fill-opacity="1"
                d="M0,96L48,85.3C96,75,192,53,288,85.3C384,117,480,203,576,224C672,245,768,203,864,160C960,117,1056,75,1152,48C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default HomePage;
