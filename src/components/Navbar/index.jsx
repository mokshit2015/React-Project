import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import storage from "redux-persist/lib/storage";
import {
  logoutAction,
  setUserEventDataFromStorage,
} from "../../actions/login.action";
import { removeLocalStorageData } from "../../utils";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const eventDetails = useSelector((state) => state.login.userEventDetails);

  useEffect(() => {
    if (eventDetails.length === 0) {
      storage.getItem("event_login").then((res) => {
        res = JSON.parse(res);
        if (res?.eventDetails) {
          dispatch(setUserEventDataFromStorage([...res.eventDetails]));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("event_login")) {
      setIsLogin(true);
    }
  }, [params]);

  const handleLogout = () => {
    removeLocalStorageData();
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <nav className="bg-transparent border-gray-200 lg:px-48 sm:px-4 py-2.5 dark:bg-gray-900 shadow-md mb-6">
      <div className="container flex flex-wrap items-center md:justify-between xs:justify-center mx-auto">
        <Link to="/" className="flex items-center pl-1 md:pl-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-roboto-mono">
            Event
          </span>
        </Link>
        <div className="flex">
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-row p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="flex items-center leading-7 py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-roboto-mono transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center leading-7 justify-between w-full py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-roboto-mono"
                  to={"/event"}
                >
                  Event Display{" "}
                </Link>
              </li>

              {isLogin && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="border-2 h-7 flex justify-center items-center w-14  rounded-xl bg-danger-700 px-9 pt-4 pb-4 text-sm font-bold uppercase leading-normal text-white "
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
