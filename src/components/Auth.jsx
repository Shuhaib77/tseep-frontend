import React from "react";
import Header from "./Header";
import { useFormik } from "formik";
import axios from "axios";
import { registerSchema } from "../utils/registerValidation";
import { loginschema } from "../utils/loginValidation";
import { useNavigate } from "react-router-dom";

function Auth({ heading }) {
  const navigate = useNavigate();
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
    validationSchema: heading === "Register" ? registerSchema : loginschema,
    onSubmit: async (values) => {
      try {
        if (heading === "Register") {
          await axios.post("https://tseep-backend-1.onrender.com/api/register", values);
          alert("Registration succeess");
          navigate("/login");
        } else {
          const res = await axios.post(
            "https://tseep-backend-1.onrender.com/login",
            values
          );
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.data._id);
          navigate("/");
          console.log(res.data.token);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { handleBlur, handleChange, handleSubmit, values, errors } = formik;

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

      <div className="grid grid-cols-1 h-[69vh]">
        <h1 className="text-center h-1/3 font-bold text-4xl underline decoration-amber-600 decoration-5">
          {heading}
        </h1>
        <div className="flex justify-center items-center h-full w-full">
          <div className="w-[400px] h-full p-[10px] grid place-content-center shadow-2xl">
            <form className="grid grid-cols-1 gap-y-3" onSubmit={handleSubmit}>
              {heading === "Register" && (
                <div className="flex flex-col gap-y-3">
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
                  {errors.name && (
                    <span className="text-red-700 text-sm">{errors.name}</span>
                  )}
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
                  {errors.email && (
                    <h1 className="text-red-700">{errors.email}</h1>
                  )}
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
                {errors.phone && (
                  <h1 className="text-red-700">{errors.phone}</h1>
                )}
              </div>
              {errors.countryCode && (
                <span className="text-red-700">{errors.countryCode}</span>
              )}
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
                  {errors.status && (
                    <span className="text-red-700">{errors.status}</span>
                  )}
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
              {errors.password && (
                <span className="text-red-700">{errors.password}</span>
              )}
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
