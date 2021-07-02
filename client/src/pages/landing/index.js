import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-4xl text-gray-800 mb-3 mt-5 font-semibold">
          the<span className="text-blue-700">Better</span>Todo.
        </h1>
        <div className="text-gray-600">
          <p className="mb-10 text-gray-400 font-light">A better todo app</p>
          <p className="text-lg">Built With :</p>
          <p className="text-sm">Frontend - React, TailwindCSS</p>
          <p className="text-sm">Backend - NodeJS, Express, MongoDB</p>
          <p className="text-lg mt-5">Features : </p>
          <ul>
            <li className="text-sm">User Authentication</li>
            <li className="text-sm">Todos Management</li>
            <li className="text-sm">Reminders for Todos</li>
          </ul>
        </div>

        <div className="flex flex-row gap-4 mt-5">
          <button className="text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-blue-700 rounded hover:bg-blue-600 transition duration-300">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="text-sm px-6 py-1 mt-4 text-white focus:outline-none bg-blue-700 rounded hover:bg-blue-600 transition duration-300">
            <Link to="/signin">Sign In</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
