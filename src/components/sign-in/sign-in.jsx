import React, {PureComponent, createRef} from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import history from "../../history.js";
import PropTypes from "prop-types";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleBlurLoginForm = this._handleBlurLoginForm.bind(this);

    this.state = {
      isValid: true,
    };
  }

  _handleBlurLoginForm(evt) {
    evt.preventDefault();
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(evt.target.value) === false) {
      this.setState({
        isValid: false,
      });
    } else {
      this.setState({
        isValid: true,
      });
    }
  }

  _handleSubmit(evt) {
    const {onSubmit} = this.props;
    evt.preventDefault();
    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
    history.push(AppRoute.ROOT);
  }

  render() {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link
              className="logo__link"
              to={AppRoute.ROOT}
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <form action="" className="sign-in__form" onSubmit={this._handleSubmit}>
            {this.state.isValid ||
              <div className="sign-in__message">
                <p>Please enter a valid email address</p>
              </div>
            }
            <div className="sign-in__fields">
              <div className={this.state.isValid ? `sign-in__message` : `sign-in__field sign-in__field--error`} >
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" onBlur={this._handleBlurLoginForm} ref={this.loginRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={this.passwordRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>
        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignIn;
