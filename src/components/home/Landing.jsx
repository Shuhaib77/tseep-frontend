import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-[86vh]">
        <div className="text-center">
          <h1 className="text-8xl font-medium ">
            Welcome to{" "}
            <span className="underline decoration-amber-600 decoration-5">
              TSEEP Mastery Box
            </span>
          </h1>
          <h1 className="text-gray-400 text-center text-3xl">
            Unlock Your Potentiol with AI inspired tool
          </h1>

          <hr className="mt-48" />
          <div className="flex justify-between mt-20 w-full">
            <div className="w-1/2">
              <input type="checkbox" />
              <label htmlFor="" className="text-2xl font-light ml-7">
                I confirm that I have read and accept the terms and conditions
                and privacy policy
              </label>
            </div>
            <div className="w-1/2 text-end">
              <button
                className="w-[130px] rounded bg-blue-950 pt-3 pb-3 text-white "
                onClick={() => {
                  navigate("/register");
                }}
              >
                Get Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
