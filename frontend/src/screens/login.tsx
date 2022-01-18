import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { provider } from "../firebase";
import { useAppSelector } from "../state/hooks";
import { getAuthData, loginUser } from "../state/reducers/authSlice";
import { updateError } from "../state/reducers/userSlice";
import "./login.css";

const Login = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { email, error } = useAppSelector(getAuthData);

  if (error.code === "auth/user-not-found") {
    dispatch(updateError("wrong email, please try again"));
  } else if (error.code === "auth/wrong-password") {
    dispatch(updateError("Wrong password, please try again"));
  } else if (error.code === "auth/invalid-email") {
    dispatch(updateError("Please provide a valid email"));
  } else if (error.code === "auth/internal-error") {
    dispatch(updateError("Please provide a valid password"));
  } else if (error.code === "auth/network-request-failed") {
    dispatch(updateError("Failed to login, please try again"));
  } else if (
    error.code === "storage/object-not-found" ||
    error.code === "auth/popup-closed-by-user"
  ) {
    dispatch(updateError(""));
  }

  useEffect(() => {
    if (email) {
      navigate("/");
    }
    dispatch(updateError(""));
  }, [email]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateError(""));
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    } catch (err) {
      dispatch(updateError("failed to login, please try again"));
    }
  };

  const LoginGoogle = () => {
    dispatch(
      loginUser({
        email: "",
        password: "",
        provider: provider,
      })
    );
  };
  return (
    <div>
      <SideBar />
      <TopBar />
      <div className="registerContainer">
        <p></p>
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
          <div className="loginButtons">
            <button type="submit" className="loginButton">
              Login
            </button>
            <button
              type="button"
              className="loginButton google"
              onClick={LoginGoogle}
            >
              Login with Google
            </button>
          </div>

          <p className="linktoForgot">
            <Link to="/reset-password" className="linkto">
              Forgot password?
            </Link>
          </p>
          <p className="loginQuestion">
            Don't have an account?{" "}
            <Link to="/register" className="linkto">
              SignUp
            </Link>
          </p>
        </form>{" "}
        {error && <p className="errorMessage">{error.message}</p>}
      </div>
    </div>
  );
};

export default Login;
