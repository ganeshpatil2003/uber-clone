import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../store/apis/userApi";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
const UserSignUp = () => {
  const navigate = useNavigate();
  const [
    registerUser,
    { data: registerUserData, isLoading, isSuccess, isError, error },
  ] = useRegisterUserMutation();
  const [data, setData] = useState({ email: "", password: "", username: "" });
  useEffect(() => {
    if (isSuccess) {
      toast.success(registerUserData.message);
      navigate("/login");
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);

  const handelOnChange = (e) => {
    const name = e.target.name;
    setData({ ...data, [name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault(true);
    await registerUser(data);
    if (isSuccess) {
      setData({ email: "", password: "", username: "" });
    }
  };
  return (
    <div className="flex h-screen flex-col justify-between ">
      <div>
        <img src="logo.png" className="w-20 pl-5 pt-10" alt="logoimage" />
        <form action="" className="py-5 px-5 pb-0" onSubmit={handelSubmit}>
          <h3 className="mt-3 mb-1">What's your Username?</h3>
          <input
            name="username"
            value={data.username}
            onChange={handelOnChange}
            type="text"
            className="bg-[#eeeeee] rounded w-full py-2 px-2"
            required
            placeholder="example1234"
          />
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
            disabled={isLoading}
            type="submit"
            className="w-full text-center text-white py-2 bg-black rounded mt-4 "
          >
            {isLoading ? (
              <div className="flex justify-between items-center gap-2">
                <LoadingSpinner />
                Create an account
              </div>
            ) : (
              "Create an account"
            )}
          </button>
        </form>
        <Link
          to={"/login"}
          className="block text-blue-800 text-sm text-center mt-1 "
        >
          Already an account? Log in
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

export default UserSignUp;
