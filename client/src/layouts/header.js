import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useStoreContext from "../store";

function Header() {
  const { state } = useStoreContext();
  const isUserAuthenticated = state.isAuthenticated;
  return (
    <div className="mt-4 mx-4">
      <nav className="flex flex-row justify-between items-center px-2">
        <div>
          <p className="text-lg font-semibold">
            the<span className="text-blue-700">Better</span>Todo.
          </p>
        </div>
        <ul className="flex flex-row space-x-4 text-sm md:text-base mr-10">
          {isUserAuthenticated ? (
            <Fragment>
              <li>
                <Link to="/home">
                  <button className="hover:text-blue-500 focus:outline-none transition duration-300">
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/user">
                  <button className="hover:text-blue-500 transition duration-300 focus:outline-none">
                    User
                  </button>
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link to="/">
                  <button className="hover:text-blue-500 focus:outline-none transition duration-300">
                    Go Back
                  </button>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
