import React from "react";
import "../styles/HomePage.css";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();

  return (
    <div className="homepage">
      <div className="content">
        <div className="container-xl">
          <div className="page-header">
            <div className="row align-items-center">
              <h3>Thoka.io is an online workplace collaboration solution. Want to know more? Sign up.</h3>
              <div
                className="alert alert-success alert-dismissible"
                role="alert"
              >
                <h3 className="mb-1">Thoka.io Team</h3>
                <p>
                  This is a work in progress pre-alpha. Our website is currently
                  under construction. Sign up and we'll notify you when we
                  launch.
                </p>
                <div className="btn-list">
                  <button
                    onClick={() => history.push("/signup")}
                    className="btn btn-success"
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="homepage__hero">
            <div className="alert alert-success alert-dismissible" role="alert">
              <h3 className="mb-1">Thoka.io Team</h3>
              <p>
                This is a work in progress pre-alpha. Our website is currently
                under construction. Sign up and we'll notify you when we launch.
                We wish you a happy Valentine's Day!
              </p>
              <div className="btn-list">
                <button
                  onClick={() => history.push("/signup")}
                  className="btn btn-success"
                >
                  Okay
                </button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="container-xl">
          <div className="homepage__footer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#206BC4"
                fill-opacity="1"
                d="M0,96L48,85.3C96,75,192,53,288,85.3C384,117,480,203,576,224C672,245,768,203,864,160C960,117,1056,75,1152,48C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
