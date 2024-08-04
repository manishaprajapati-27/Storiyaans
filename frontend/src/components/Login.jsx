import React from "react";
import Hero1 from "../assets/images/hero/1.jpg";

const Login = () => {
  return (
    <section className="login">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="image">
              <img src={Hero1} alt="Login" />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-12">
            <div className="card">
              <div className="text">
                <h2 className="heading">Welcome Again !</h2>
                <p className="mb-2 text-light">Please log in to your account</p>
              </div>
              <form className="form">
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="far fa-envelope-open"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Mail"
                    aria-label="Enter Your Mail"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="far fa-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="form-check rem">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label text-light-alt"
                      htmlFor="flexCheckDefault"
                    >
                      Remember Me
                    </label>
                  </div>
                  <p>
                    <a href="./forgot.html">Forgot Password?</a>
                  </p>
                </div>
                <div className="text-center mt-4">
                  <button className="button mb-2">Sign In</button>
                  <p>
                    Don't have an account yet?{" "}
                    <a href="./register.html">Sign up here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
