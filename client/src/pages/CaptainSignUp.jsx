import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CaptainSignUp = () => {
  const [data, setData] = useState({ email: "", password: "" , username : "" });
  const handelOnChange = (e) => {
    const name = e.target.name;
    setData({ ...data, [name]: e.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault(true);
    console.log(data);
    setData({ email: "", password: "",username : "" });
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
  )
}

export default CaptainSignUp