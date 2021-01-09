import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import DashboardActions from "./dashboardActions";
import Experience from "./experience";
import Education from "./education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment> 
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.name}
      </p>
      {profile ? (
        <Fragment>
          <DashboardActions />
          <Experience experience = {profile.experience} />
          <Education education = {profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={()=> deleteAccount()}>
              <i className="fas fa-trash"></i>{" "}{" "}
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not set up a profile yet, please add some data</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired,
  deleteAccount: Proptypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
