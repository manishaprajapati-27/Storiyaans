import React from "react";

const Login = () => {
  return (
    <section class="section login">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-md-8 col-sm-12 mx-auto">
            <div class="card">
              <div class="text">
                <h2 class="heading">Welcome Again !</h2>
                <p class="mb-3 text-light">Please log in to your account</p>
              </div>
              <div class="form">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="far fa-envelope-open"></i>
                  </span>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter Your Mail"
                    aria-label="Enter Your Mail"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="far fa-key"></i>
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="d-flex justify-content-between">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Remember Me
                    </label>
                  </div>
                  <p>
                    <a href="./forgot.html">Forgot Password ?</a>
                  </p>
                </div>
                <div class="text-center mt-4">
                  <button class="button mb-2">Sign In</button>
                  <p>
                    Don't have an account yet?
                    <a href="./register.html">Sign up here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
