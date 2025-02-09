import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLogInUserMutation } from "../store/apis/userApi";

const UserLogIn = () => {

  const navigate = useNavigate();
  const [logInUser, { data: registerData, isLoading, isError, isSuccess ,error}] =
    useLogInUserMutation();
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    if(isError){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success(registerData.message);
      navigate('/home');
    }
  }, [isError,isSuccess]);


  const handelOnChange = (e) => {
    const name = e.target.name;
    setData({ ...data, [name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault(true);
    const result = await logInUser(data);
    if(result?.data?.statuscode === 200){
      setData({ email: "", password: "" });
    }
    
  };
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
            name="password"
            value={data.password}
            onChange={handelOnChange}
            type="current-password"
            className="bg-[#eeeeee] rounded w-full py-2 px-2"
            required
            placeholder="password"
          />
          <button
          disabled = {isLoading}
            type="submit"
            className="w-full text-center text-white py-2 bg-black rounded mt-4 "
          >
           { isLoading ? <div className="flex justify-center gap-2 items-center"><LoadingSpinner/>Log in</div> : "Log in"}
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
