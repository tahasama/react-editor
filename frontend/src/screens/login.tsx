import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { updateSaved } from "../state";
import { useAppSelector } from "../state/hooks";
import {
  getUserData,
  loginUser,
  updateError,
} from "../state/reducers/userSlice";
import "./login.css";

const Login = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { error, email } = useAppSelector(getUserData);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location.pathname);
  console.log("navigate", navigate);
  console.log("navigate", email);

  useEffect(() => {
    if (error.code === "auth/user-not-found") {
      dispatch(updateError("wrong email, please try again"));
    }
    if (error.code === "auth/wrong-password") {
      dispatch(updateError("Wrong password, please try again"));
    }
    return () => {
      // setErrors("");
      dispatch(updateError(""));
    };
  }, [error.code]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateError(""));
      // setLoading(true);
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
      navigate(-1);
      // setLoading(false);
    } catch (err) {
      dispatch(updateError("failed to login, please try again"));
    }
  };
  return (
    <div>
      <SideBar />
      <TopBar />
      <div className="registerContainer">
        <form className="logingForm" onSubmit={handleSubmit}>
          <div className="labelInputLogin">
            <label htmlFor="email" className="formlabel">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="formInput"
              ref={emailRef}
            />{" "}
          </div>
          <div className="labelInput">
            <label htmlFor="password" className="formlabel">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="formInput"
              ref={passwordRef}
            />{" "}
          </div>
          <button type="submit" className="loginButton">
            Login
          </button>
          <p className="loginQuestion">
            Don't have an account?{" "}
            <Link to="/register" className="linkto">
              SignUp
            </Link>
          </p>
          {error && <p>{error.message}</p>}
          <h6>{email}</h6>
        </form>
      </div>
    </div>
  );
};

export default Login;
