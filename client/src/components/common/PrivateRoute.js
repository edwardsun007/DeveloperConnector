import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...restProps }) => (
  // if we are authenticated then render the component with passed in props
  // otherwise redirect to login
  <Route
    {...restProps}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
