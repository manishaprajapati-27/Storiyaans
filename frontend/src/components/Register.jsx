import React, { useState } from "react";
import Hero1 from "../assets/images/hero/1.jpg";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          fullName,
          username,
          email,
          password,
        }
      );
      if (response.status === 201) {
        setsuccessMessage(
          "Register successful! Please check your account to verify your account."
        );
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "An error occurred during registration. Please try again."
        );
      }
    }
  };
  return (
    <section className="login register">
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
                <h2 className="heading">Create Your Account</h2>
                <p className="mb-2 text-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <form className="form" onSubmit={handleRegister}>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="far fa-envelope-open"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="far fa-key"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="far fa-key"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="form-check rem d-flex justify-content-between">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <p
                      className="form-check-label text-light-alt"
                      htmlFor="flexCheckDefault"
                    >
                      I Agree with <a href="#">Terms & Conditions</a>
                    </p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button className="button mb-2">Sign In</button>
                  <p>
                    Already have an account?{" "}
                    <a href="./register.html">Sign in here</a>
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

export default Register;
