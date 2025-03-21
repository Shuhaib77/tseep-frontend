import React, { useState } from "react";
import Header from "../components/Header";
import { Slider } from "@material-tailwind/react";
import Sidbar from "../components/test/Sidbar";
import Questions from "../components/test/Questions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataById } from "../../redux/questionsSlice";

function Test() {
  const { id } = useParams();
  console.log(id,"idsooopoo");
  
  const [open, setOpen] = useState(false);



  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="w-full flex">
        {open && (
          <div>
            <Sidbar id={id} />
          </div>
        )}
        <div className="w-full p-10">
          <Questions ids={id} setOpen={setOpen} open={open} />
        </div>
      </div>
    </div>
  );
}

export default Test;
