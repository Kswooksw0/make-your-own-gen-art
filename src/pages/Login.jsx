import React, { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import LoginSketch from "../components/LoginSketch";

const Login = ({ setUser }) => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      setUser(data.user);
      navigate("/homepage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">

        <div
          class="max-w-sm rounded-xl text-white text-xl z-10"
        >
          <div class="text-6xl text-start">Make Your Own Gen Art</div>

          <form onSubmit={handleSubmit} class="flex flex-col font-noto text-xl">

            {/* email */}
            <label htmlFor="email" class="my-4">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              class="input"
              onChange={handleChange}
              autocomplete="false"
            ></input>

            {/* password */}
            <label htmlFor="password" class="my-4">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              class="input"
              onChange={handleChange}
            ></input>
            
            {/* login button */}
            <div class="flex justify-center">
              <button
                type="submit"
                class="my-6 p-2 w-1/4 border rounded-xl bg-light-black login"
               
              >
                Login
              </button>
            </div>
          </form>

          {/* Register */}
          <div class="font-noto text-xl">
            Don't have an account?<span> </span>
            <button>
              <Link to="/register" class="underline">
                Register
              </Link>
            </button>
          </div>

        </div>

        <LoginSketch />

      </div>
    </>
  );
};

export default Login;
