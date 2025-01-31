import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-red-400 bg-[url(trafficlight.jpeg)] bg-cover bg-no-repeat bg-center">
      <img src="logo.png" className="w-30 pl-10 pt-10" alt="logoimage" />
      <div className="bg-white  py-4 px-4 pb-7">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link
          className=" flex w-full items-center justify-center text-white py-3 mt-5 bg-black rounded"
          to={"/login"}
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
