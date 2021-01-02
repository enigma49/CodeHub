import React from "react";
import {Link} from 'react-router-dom';
const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Codehub</h1>
          <p className="lead">
            A comunity to help developers, to share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary btn-raised" >
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light btn-raised">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;