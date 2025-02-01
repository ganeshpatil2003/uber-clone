import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CaptainSignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    capacity: 0,
    plate: "",
    color: "",
    vehicle: "",
  });
  const handelOnChange = (e) => {
    const name = e.target.name;
    setData({ ...data, [name]: e.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault(true);
    console.log(data);
    setData({
      email: "",
      password: "",
      username: "",
      capacity: 0,
      plate: "",
      color: "",
      vehicle: "",
    });
  };
  return (
    <div className="flex h-screen flex-col justify-between ">
      <div>
        <div className=" pl-5 pt-10">
          <img src="logo.png" className="max-w-20 block " alt="logoimage" />
          <span className="block">
            <FaArrowRight size={30} />
          </span>
        </div>

        <form action="" className="py-5 px-5 pb-0" onSubmit={handelSubmit}>
          <h3 className="mt-3 mb-1">What's the captain's name?</h3>
          <input
            name="username"
            value={data.username}
            onChange={handelOnChange}
            type="text"
            className="bg-[#eeeeee] rounded w-full py-2 px-2"
            required
            placeholder="example1234"
          />
          <h3 className="mt-3 mb-1">What's Captain email?</h3>
          <input
            name="email"
            value={data.email}
            onChange={handelOnChange}
            type="email"
            className="bg-[#eeeeee] rounded w-full py-2 px-2"
            required
            placeholder="email@example.com"
          />
          <h3 className="mt-3 mb-1">Enter Captains password</h3>
          <input
            name="password"
            value={data.password}
            onChange={handelOnChange}
            type="current-password"
            className="bg-[#eeeeee] rounded w-full py-2 px-2"
            required
            placeholder="password"
          />
          <div>
            <div className="flex gap-2">
              <div>
                <h3 className="mt-3 mb-1">Vehicle color</h3>
                <input
                  name="color"
                  value={data.color}
                  onChange={handelOnChange}
                  type="text"
                  className="bg-[#eeeeee] rounded w-full py-2 px-2"
                  required
                  placeholder="color exp:red pink etc."
                />
              </div>
              <div>
                <h3 className="mt-3 mb-1">Vehicle type</h3>
                <input
                  name="vehicle"
                  value={data.vehicle}
                  onChange={handelOnChange}
                  type="text"
                  className="bg-[#eeeeee] rounded w-full py-2 px-2"
                  required
                  placeholder="exp : auto car motorcycle"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <h3 className="mt-3 mb-1">No of persons</h3>
                <input
                  name="capacity"
                  value={data.capacity}
                  onChange={handelOnChange}
                  type="tel"
                  className="bg-[#eeeeee] rounded w-full py-2 px-2"
                  required
                  placeholder="exp : 4"
                />
              </div>
              <div>
                <h3 className="mt-3 mb-1">Number plate no</h3>
                <input
                  name="plate"
                  value={data.plate}
                  onChange={handelOnChange}
                  type="text"
                  className="bg-[#eeeeee] rounded w-full py-2 px-2"
                  required
                  placeholder="password"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-center text-white py-2 bg-black rounded mt-4 "
          >
            Create an Account
          </button>
        </form>
        <Link
          to={"/captain-login"}
          className="block text-blue-800 text-sm text-center mt-1 "
        >
          Already have a account? Log in Captain
        </Link>
      </div>
      <div>
        <div className="px-5 py-2 mb-7 text-sm text-center underline underline-offset-1 text-blue-600">
          Terms and policies
        </div>
      </div>
    </div>
  );
};

export default CaptainSignUp;
