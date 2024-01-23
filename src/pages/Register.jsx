import React, { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import LoginSketch from "../components/LoginSketch";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            userName: formData.userName,
          },
        },
      });
      alert("check your email for verification link");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div class="max-w-sm rounded-xl text-white text-xl z-10">

        <div class="text-6xl text-start font-kanit">Make Your Own Gen Art</div>

        <form onSubmit={handleSubmit} class="flex flex-col font-noto text-xl">

          {/* Username */}
          <label htmlFor="userName" class="my-4">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            id="userName"
            class="input"
            onChange={handleChange}
          ></input>

          {/* Email */}
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
          ></input>

          {/* Password */}
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

          {/* register button */}
          <div class="flex justify-center">
            <button
              type="submit"
              class="my-6 p-2 w-1/4 border rounded-xl bg-light-black login"
            >
              Register
            </button>
          </div>

        </form>

        {/* Login */}
        <div class="font-noto text-xl">
          Already have an account?<span> </span>
          <button>
            <Link to="/" class="underline">
              Login
            </Link>
          </button>
        </div>
      </div>

      <LoginSketch />
    </div>
  );
};

export default Register;
