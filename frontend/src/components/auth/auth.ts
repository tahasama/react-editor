import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
// import { getUser } from "../../state/reducers/userSlice";

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    // dispatch(getUser(user));
  });
  return unsubscribe;
}, []);
