import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import Register from "./Register";
import "../style.css";

function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const reg = () => {
    if (!username || !pass) {
      alert("Please enter your username and password.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
      alert("Username already exists.");
      return;
    }
    users[username] = { password: pass, friends:[],posts:[] };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
  };

  const li = () => {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username].password === pass) {
      localStorage.setItem("liu", username);
      navigate("/Feed");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <section className="_social_login_wrapper _layout_main_wrapper">
        <div className="_shape_one">
          <img src="assets/images/shape1.svg" alt="" className="_shape_img" />
          <img src="assets/images/dark_shape.svg" alt="" className="_dark_shape" />
        </div>
        <div className="_shape_two">
          <img src="assets/images/shape2.svg" alt="" className="_shape_img" />
          <img src="assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
        </div>
        <div className="_shape_three">
          <img src="assets/images/shape3.svg" alt="" className="_shape_img" />
          <img src="assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
        </div>
        <div className="_social_login_wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="_social_login_left">
                  <div className="_social_login_left_image">
                    <img src="assets/images/login.png" alt="Image" className="_left_img" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="_social_login_content">
                  <div className="_social_login_left_logo _mar_b28">
                    <img src="assets/images/logo.svg" alt="Image" className="_left_logo" />
                  </div>
                  <p className="_social_login_content_para _mar_b8">Welcome back</p>
                  <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
                  <button type="button" className="_social_login_content_btn _mar_b40">
                    <img src="assets/images/google.svg" alt="Image" className="_google_img" />{" "}
                    <span>Or sign-in with Google</span>
                  </button>
                  <div className="_social_login_content_bottom_txt _mar_b40">
                    <span>Or</span>
                  </div>
                  <form className="_social_login_form">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                          <label className="_social_login_label _mar_b8">Username</label>
                          <input
                            type="text"
                            className="form-control _social_login_input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                          <label className="_social_login_label _mar_b8">Password</label>
                          <input
                            type="password"
                            className="form-control _social_login_input"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="form-check _social_login_form_check">
                          <input
                            className="form-check-input _social_login_form_check_input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label className="form-check-label _social_login_form_check_label" htmlFor="flexRadioDefault2">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="_social_login_form_left">
                          <p className="_social_login_form_left_para">Forgot password?</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                        <div className="_social_login_form_btn _mar_t40 _mar_b60">
                          <button type="button" className="_social_login_form_btn_link _btn1" onClick={li}>
                            Login now
                          </button>
                        </div>
                        <div className="_social_login_form_btn _mar_t10">
                          <button type="button" className="_social_login_form_btn_link _btn2" onClick={reg}>
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_bottom_txt">
                      <p>
                        Don't have an account?{" "}
                        <a href="#0" onClick={() => navigate("/")}>Create New Account</a>
                      </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
