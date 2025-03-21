import React from "react";
import Header from "./Header";
import { useFormik } from "formik";
import axios from "axios";

function Auth({ heading }) {
  const formik = useFormik({
    initialValues:
      heading === "Register"
        ? {
            name: "",
            email: "",
            password: "",
            phone: "",
            status: "",
            countryCode: "",
          }
        : { phone: "", password: "", countryCode: "+1" },
    onSubmit: async (values) => {
      try {
    
        if (heading === "Register") {
       await axios.post(
            "http://localhost:6001/api/register",
            values
          );
        } else {
         const res=await axios.post("http://localhost:6001/api/login", values);
         localStorage.setItem("token",res.data.token)
         localStorage.setItem("id",res.data.data._id)
         console.log(res.data.token);

         
        }
        alert("Registered successfully");
      } catch (error) {
        console.error("Error:", error);
        alert("Registration failed");
      }
    },
  });

  const { handleBlur, handleChange, handleSubmit, values } = formik;

  const countryCodes = [
    { code: "+1", name: "USA" },
    { code: "+91", name: "India" },
    { code: "+44", name: "UK" },
    { code: "+61", name: "Australia" },
    { code: "+81", name: "Japan" },
  ];

  return (
    <>
      <Header />

      <div className="grid grid-cols-1">
        <h1 className="text-center h-1/3 font-bold text-4xl underline decoration-amber-600 decoration-5">
          {heading}
        </h1>
        <div className="flex justify-center items-center h-[76vh] w-full">
          <div className="w-[400px] p-[20px] shadow-2xl">
            <form className="grid grid-cols-1 gap-y-5" onSubmit={handleSubmit}>
              {heading === "Register" && (
                <div className="flex flex-col gap-y-5">
                  <label htmlFor="name" className="text-start">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="fullname"
                    className="p-[10px] border"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    name="name"
                  />
                  <label htmlFor="email" className="text-start">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="p-[10px] border"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                  />
                </div>
              )}
              <div>
                <label htmlFor="phone">Mobile Number</label>
                <div className="flex gap-x-2 mt-5">
                  <select
                    name="countryCode"
                    className="w-1/3 border rounded p-2 pr-8 focus:ring focus:ring-blue-300 bg-white text-gray-700 shadow-sm focus:outline-none appearance-none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.countryCode}
                  >
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code} {item.name}
                      </option>
                    ))}
                  </select>
                  <span className="relative right-8 top-2 text-gray-500 pointer-events-none w-0.5">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                  <input
                    type="text"
                    name="phone"
                    className="p-2 w-full border rounded focus:ring focus:ring-blue-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </div>
              </div>
              {heading === "Register" && (
                <div>
                  <label htmlFor="status" className="text-start">
                    Current Status
                  </label>
                  <div className="flex items-center gap-x-3">
                    <input
                      type="radio"
                      name="status"
                      value="Employee"
                      className="p-[10px] border"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.status === "Employee"}
                    />
                    <label htmlFor="status">Employee</label>
                    <input
                      type="radio"
                      name="status"
                      value="Student"
                      className="p-[10px] border"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.status === "Student"}
                    />
                    <label htmlFor="status">Student</label>
                  </div>
                </div>
              )}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="p-[10px] border"
                placeholder="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <button
                type="submit"
                className="p-2 bg-blue-900 text-white rounded"
              >
                {heading}
              </button>
              {console.log(values)}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
