import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import storage from "redux-persist/lib/storage";
import { addEventAction } from "./actions/event.action";
import { loginAction } from "./actions/login.action";
import Navbar from "./components/Navbar";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    storage.getItem("event_details").then((res) => {
      res = JSON.parse(res);
      if (res) {
        dispatch(addEventAction(res));
      }
    });
  }, []);

  useEffect(() => {
    if (!userLoggedIn) {
      storage.getItem("event_login").then((res) => {
        res = JSON.parse(res);
        if (res?.login) {
          dispatch(loginAction(res.userData));
        } else {
          navigate("/login");
        }
      });
    }
  }, [userLoggedIn]);

  return (
    <React.Fragment>
      {userLoggedIn ? (
        <>
          <Navbar />
          {props.children}
        </>
      ) : null}
    </React.Fragment>
  );
};
export default ProtectedRoute;
