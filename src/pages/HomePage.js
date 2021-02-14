import React from "react";
import "../styles/HomePage.css";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();

  return (
    <div className="homepage">
      <div className="homepage__hero">
        <div className="alert alert-success alert-dismissible" role="alert">
          <h3 className="mb-1">Thoka.io Team</h3>
          <p>
            This is a work in progress pre-alpha. Our
            website is currently under construction. Sign up and we'll notify
            you when we launch. Happy Valentine's Day!
          </p>
          <div className="btn-list">
            <button
              onClick={() => history.push("/signup")}
              className="btn btn-success"
            >
              Okay
            </button>
          </div>
          <a className="btn-close" data-bs-dismiss="alert" aria-label="close" />
        </div>
      </div>
      <div className="homepage__footer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#206BC4"
            fill-opacity="1"
            d="M0,96L48,85.3C96,75,192,53,288,85.3C384,117,480,203,576,224C672,245,768,203,864,160C960,117,1056,75,1152,48C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#206BC4"
          fill-opacity="1"
          d="M0,288L48,282.7C96,277,192,267,288,218.7C384,171,480,85,576,80C672,75,768,149,864,181.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg> */}
      </div>
    </div>
  );
}

export default HomePage;
