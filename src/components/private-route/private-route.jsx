import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getFetchingStatus} from "../../reducer/data/selectors.js";

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus, dataFetching} = props;

  if (dataFetching === false) {
    return (
      <Route
        path={path}
        exact={exact}
        {...props}
        render={(prop) => {
          return (
            authorizationStatus === AuthorizationStatus.AUTH
              ? render(prop)
              : <Redirect to={AppRoute.SIGN_IN} />
          );
        }}
      />
    );
  }
  return null;
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  dataFetching: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.any.isRequired,
  ]),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  dataFetching: getFetchingStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
