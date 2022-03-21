import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const signUp = async () => {
    if (data.userName === "" || data.email === "" || data.password === "") {
      return alert("All fields are required!");
    }
    setIsLoading(true);
    const response: any = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result, "dddddd");
    if (result.responseCode === "00") {
      setIsLoading(false);
      alert("Created Successfully");
      router.push("/");
    } else {
      setIsLoading(false);
      alert(result.message);
    }
  };
  return (
    <>
      <p className="text-3xl font-bold text-red-600 text-center mt-20 mb-10">
        Sign Up
      </p>
      <div className="w-full flex flex-col justify-center items-center text-center">
        <input
          type="text"
          name="userName"
          value={data.userName}
          onChange={(e) => handleChange(e)}
          placeholder="User Name"
          className="border-solid border-2 border-black-400 m-5 w-1/2 p-4 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
          className="border-solid border-2 border-black-400 m-5 w-1/2 p-4 rounded-md"
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          className="border-solid border-2 border-black-400 m-5 w-1/2 p-4 rounded-md"
        />
        <input
          type="button"
          onClick={() => signUp()}
          value={isLoading ? "Processing..." : "Sign Up"}
          className="m-5 border-none bg-red-700 cursor-pointer text-white p-4 font-bold rounded-md"
        />
        <p>
          Already have an account?{" "}
          <Link href="/">
            <span className="text-red-400 hover:text-red-600 cursor-pointer">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </>
  );
}
