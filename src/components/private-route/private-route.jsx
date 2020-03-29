import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../const.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getUserFetchingStatus} from "../../reducer/user/selectors.js";

class PrivateRoute extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {render, path, exact, authorizationStatus, userFetching, handleMoreButtonClick} = this.props;

    if (userFetching === false) {
      return (
        <Route
          path={path}
          exact={exact}
          {...this.props}
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
    return handleMoreButtonClick();
  // return (
  //   <Route
  //     path={path}
  //     exact={exact}
  //     {...props}
  //     render={() => {
  //       return (<Redirect to={AppRoute.SIGN_IN} />
  //       );
  //     }}
  //   />
  // );
  }
}

// const PrivateRoute = (props) => {
//   const {render, path, exact, authorizationStatus, userFetching} = props;

//   if (userFetching === false) {
//     return (
//       <Route
//         path={path}
//         exact={exact}
//         {...props}
//         render={(prop) => {
//           return (
//             authorizationStatus === AuthorizationStatus.AUTH
//               ? render(prop)
//               : <Redirect to={AppRoute.SIGN_IN} />
//           );
//         }}
//       />
//     );
//   }
//   handleMoreButtonClick();
//   // return (
//   //   <Route
//   //     path={path}
//   //     exact={exact}
//   //     {...props}
//   //     render={() => {
//   //       return (<Redirect to={AppRoute.SIGN_IN} />
//   //       );
//   //     }}
//   //   />
//   // );
// };

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  userFetching: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.any.isRequired,
  ]),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userFetching: getUserFetchingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleMoreButtonClick() {
    dispatch(UserOperation.checkAuth());
  },
});


export {PrivateRoute};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
