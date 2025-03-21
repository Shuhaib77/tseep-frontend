import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchDataById } from "../../../redux/questionsSlice";
import { useNavigate } from "react-router-dom";

function Sidbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, dataById } = useSelector((state) => state.qpoolData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(fetchDataById(id)).then((res) => {
      if (res.payload && !Array.isArray(res.payload)) {
        navigate(`/test/${id}`);
      } else {
        console.log("Invalid ID or Data Not Found");
      }
    });
  };

  return (
    <div className="w-[280px] h-[86vh] shadow-md">
      <div className="flex flex-col justify-between h-full pt-20 p-2">
        <div className="grid grid-cols-4 gap-x-2 p-2 gap-y-5">
          {data?.map((item, i) => (
            <div key={item._id}>
              <div
                className="w-[60px] h-[40px] rounded border grid place-content-center hover:bg-gray-400 cursor-pointer"
                onClick={() => handleClick(item._id)}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidbar;
