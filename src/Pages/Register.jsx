import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice"; 
import "../style.css";

function Register() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [rpass, setRpass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (event) => {
    event.preventDefault();
    if (!username || !pass || !rpass) {
      alert("Please enter your username and password.");
      return;
    }
    if (pass !== rpass) {
      alert("Passwords do not match.");
      return;
    }
    dispatch(register({ username, password: pass })); 
    navigate("/login"); 
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <section className="_social_registration_wrapper _layout_main_wrapper">
        <div className="_social_registration_wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="_social_registration_right">
                  <div className="_social_registration_right_image">
                    <img src="assets/images/registration.png" alt="Registration" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="_social_registration_content">
                  <p className="_social_registration_content_para">Get Started Now</p>
                  <h4 className="_social_registration_content_title">Registration</h4>
                  <button type="button" className="_social_registration_content_btn">
                    <img src="assets/images/google.svg" alt="Google" className="_google_img" />
                    <span>Register with Google</span>
                  </button>
                  <div className="_social_registration_content_bottom_txt"> <span>Or</span> </div>
                  <form className="_social_registration_form" onSubmit={handleRegister}>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="_social_registration_form_input">
                          <label className="_social_registration_label">Username</label>
                          <input
                            type="text"
                            className="form-control _social_registration_input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="_social_registration_form_input">
                          <label className="_social_registration_label">Password</label>
                          <input
                            type="password"
                            className="form-control _social_registration_input"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="_social_registration_form_input">
                          <label className="_social_registration_label">Repeat Password</label>
                          <input
                            type="password"
                            className="form-control _social_registration_input"
                            value={rpass}
                            onChange={(e) => setRpass(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-check _social_registration_form_check">
                          <input className="form-check-input" type="checkbox" required />
                          <label className="form-check-label">I agree to terms & conditions</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="_social_registration_form_btn">
                          <button type="submit" className="_social_registration_form_btn_link _btn1">Register</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="_social_registration_bottom_txt">
                        <p>Already have an account? 
                          <button onClick={handleLogin} className="login-link">Login Now</button>
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
    </>
  );
}

export default Register;
