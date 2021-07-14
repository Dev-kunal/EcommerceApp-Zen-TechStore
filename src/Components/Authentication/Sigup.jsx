import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UseAxios } from "../../Utils/UseAxios";
import { useCart } from "../../Context/CartProvider";
import "./auth.css";
export const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });
  const toast = useRef(null);
  const { showToast, toastMessage, dispatch } = useCart();
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevdetails) => {
      return {
        ...prevdetails,
        [name]: value,
      };
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await UseAxios(
        "POST",
        "/user/signup",
        userDetails
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: message },
      });
      if (success) {
        setUserDetails({
          email: "",
          username: "",
          fullname: "",
          password: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login-page">
      <div className="form-container">
        <div className="form-header">
          <h2 style={{ margin: "1rem auto" }}>Sign-Up</h2>
        </div>
        <form
          onSubmit={(event) => handleFormSubmit(event)}
          className="auth-form"
        >
          <div class="input-group">
            <label class="input-label" for="input-email">
              Email
            </label>
            <input
              class="input input-lg"
              type="email"
              id="input-email"
              placeholder="Email"
              required
              name="email"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.email}
            />
          </div>
          <div class="input-group">
            <label class="input-label" for="input-username">
              Username
            </label>
            <input
              class="input input-lg"
              type="text"
              id="input-username"
              placeholder="Username"
              required
              name="username"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.username}
            />
          </div>
          <div class="input-group">
            <label class="input-label" for="input-fullname">
              Full Name
            </label>
            <input
              class="input input-lg"
              type="text"
              id="input-fullname"
              placeholder="full name"
              required
              name="fullname"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.fullname}
            />
          </div>
          <div class="input-group">
            <label class="input-label" for="input-pass">
              Password
            </label>
            <input
              class="input input-lg"
              type="password"
              id="input-pass"
              placeholder="password"
              name="password"
              onChange={(event) => handleInputChange(event)}
              required
              value={userDetails.password}
            />
          </div>

          <button type="submit" className="btn btn-lg">
            Sign-Up
          </button>
          <br />
          <span>
            <small>
              {" "}
              Already a member..? <Link to="/login">Login</Link>
            </small>
          </span>
        </form>
      </div>
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
