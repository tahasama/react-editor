import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import { auth } from "../firebase";
import { useAppSelector } from "../state/hooks";
import {
  // getUser,
  getUserData,
  registerUser,
  updateError,
} from "../state/reducers/userSlice";
import "./register.css";

const Register: React.FC = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  // const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, email } = useAppSelector(getUserData);

  useEffect(() => {
    if (error.code === "auth/weak-password") {
      dispatch(updateError("Password should be at least 6 characters"));
    }
    if (error.code === "auth/email-already-in-use") {
      dispatch(updateError("Email already taken, please add a different one"));
    }
    return () => {
      // setErrors("");
      dispatch(updateError(""));
    };
  }, [error.code]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      dispatch(updateError("Passwords do not match, please try again"));
    } else {
      try {
        dispatch(updateError(""));
        setLoading(true);
        dispatch(
          registerUser({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          })
        );
        navigate("/");
        setLoading(false);
      } catch (err) {
        dispatch(updateError("failed to create account, please try again"));
      }
    }
  };
  return (
    <div>
      <SideBar />
      <TopBar />
      <div className="registerContainer">
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="labelInput">
            <label htmlFor="email" className="formlabel">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="formInput"
              ref={emailRef}
            />
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
            />
          </div>
          <div className="labelInput">
            <label htmlFor="passwordConfirmation" className="formlabel">
              Password Confirmation
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              className="formInput"
              ref={passwordConfirmRef}
            />
          </div>
          <button disabled={loading} type="submit" className="formButton">
            Register
          </button>
          <p className="question">
            Already have an account?{" "}
            <Link to="/login" className="linkto">
              Login
            </Link>
          </p>
          {error && <p>{error.message}</p>}
          <h6>{email}</h6>
        </form>
      </div>
    </div>
  );
};

export default Register;
