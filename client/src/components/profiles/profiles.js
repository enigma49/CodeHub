import React, { Fragment, useEffect } from "react";
import Proptypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./profileItems";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Share and Connect with
            Developers
          </p>
          <div className="profiles">
            {profiles ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>Profiles Not Found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: Proptypes.func.isRequired,
  profile: Proptypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
