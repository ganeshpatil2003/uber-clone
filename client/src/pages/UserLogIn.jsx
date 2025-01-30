import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogIn = () => {
    const [data,setData] = useState({email:"",password:""});
    const handelOnChange = (e) => {
        const name = e.target.name;
        setData({...data,[name]:e.target.value});
    }
    const handelSubmit = (e) => {
        e.preventDefault(true);
        console.log(data);
        setData({email:"",password:""})
    }
  return (
    <div className="flex h-screen flex-col justify-between ">
      <div>
        <img src="logo.png" className="w-20 pl-5 pt-10" alt="logoimage" />
        <form action="" className="py-5 px-5 pb-0" onSubmit={handelSubmit}>
          <h3 className="mt-3 mb-1">What's your email?</h3>
          <input
          name="email"
          value={data.email}
            onChange={handelOnChange}
            type="email"
            className="bg-[#eeeeee] rounded w-full py-2 px-2"
            required
            placeholder="email@example.com"
          />
          <h3 className="mt-3 mb-1">Enter your password</h3>
          <input
          name = 'password'
          value={data.password}
          onChange={handelOnChange}
            type="current-password"
            className="bg-[#eeeeee] rounded w-full py-2 px-2"
            required
            placeholder="password"
          />
          <button type='submit' className="w-full text-center text-white py-2 bg-black rounded mt-4 ">
            Log in
          </button>
        </form>
        <Link
          to={"/signup"}
          className="block text-blue-800 text-sm text-center mt-1 "
        >
          New user? create new account
        </Link>
      </div>
      <div>
        <div className="px-5 py-2 mb-7">
          <Link
            to="/captain-login"
            className="w-full block text-center text-white py-2 bg-green-700 rounded  "
          >
            Sign up as captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogIn;
