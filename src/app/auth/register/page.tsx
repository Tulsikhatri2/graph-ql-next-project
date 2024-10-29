"use client"

import { registerUser } from "@/Redux/Slice/authSlice";
import { AppDispatch } from "@/Redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export interface RegisterInfo {
    name: string,
    email: string,
    password: string
}
const page = () => {
    const router = useRouter()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const registerInfo: RegisterInfo = {
            name: name,
            email: email,
            password: password 
        }
        dispatch(registerUser(registerInfo))
    }
  return (
    <div className="w-[100vw] h-[100vh] bg-cyan-950 flex items-center justify-center font-mono">
        <div
          className="w-full sm:w-[60%] md:w-[40%] lg:w-[30%] h-[80%] bg-pink-200 bg-opacity-30 rounded-lg
      flex flex-col items-center justify-center"
        >
          <p className="text-white underline text-lg md:text-xl">Register</p>
              <form
                className="flex flex-col mt-5 w-full items-center"
                onSubmit={handleSubmit}
                method="post"
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  className="bg-white text-neutral-700 text-sm rounded-3xl block p-2.5 w-64 mt-3 mb-2
        focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md"
                />
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="bg-white text-neutral-700 text-sm rounded-3xl block p-2.5 w-64 mt-3 mb-2
        focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="bg-white text-neutral-700 text-sm rounded-3xl block p-2.5 w-64 m-2 
        focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md"
                />
                <button
                  type="submit"
                  className="bg-slate-800 py-2 border border-transparent text-center text-sm
        text-white shadow-md focus:bg-slate-700 hover:shadow-black hover:shadow-sm
        focus:shadow-none active:bg-slate-700 hover:bg-gray-400 hover:text-black rounded-full
        w-[40%] mt-5"
                >
                  Register
                </button>
              </form>
          <p className="mt-16 text-center text-white">
            <span>Already a user?</span>
            <span
              className="text-pink-400 cursor-pointer underline"
              onClick={() => router.push("/auth/login")}
            >
              LOGIN
            </span>
          </p>
        </div>
      </div>
  );
};

export default page;
