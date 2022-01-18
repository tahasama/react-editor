import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { useAppSelector } from "../state/hooks";
import { getAuthData, resetPassword } from "../state/reducers/authSlice";
import { getUserData, updateError } from "../state/reducers/userSlice";

const ResetPassword = () => {
  const emailRef = useRef<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector(getAuthData);

  useEffect(() => {
    if (error.code === "auth/missing-email") {
      dispatch(updateError("please add an email."));
    }
    if (error.code === "auth/user-not-found") {
      dispatch(updateError("Wrong email, please try again"));
    } else if (error.code === "storage/object-not-found") {
      dispatch(updateError(""));
    }
    return () => {
      dispatch(updateError(""));
    };
  }, [error.code]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateError(""));
      dispatch(resetPassword(emailRef.current.value));

      {
        !error && navigate(-1);
      }
    } catch (err) {
      dispatch(updateError("failed to reset password, please try again"));
    }
  };
  return (
    <div>
      <SideBar />
      <TopBar />
      <div className="registerContainer">
        <form className="logingForm reset" onSubmit={handleSubmit}>
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

          <button type="submit" className="loginButton">
            Reset
          </button>
          <p className="linktoForgot">
            <Link to="/reset-password" className="linkto">
              Login
            </Link>
          </p>
          <p className="loginQuestion">
            Don't have an account?{" "}
            <Link to="/register" className="linkto">
              SignUp
            </Link>
          </p>
          {error && <p className="errorMessage">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
